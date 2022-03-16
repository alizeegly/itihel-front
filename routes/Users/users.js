const express = require("express");
const crypto = require("crypto")
const {
    check,
    validationResult
} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const router = express.Router();
const cookieParser = require('cookie-parser');

const User = require("../../models/Users/User");
const nodemailer = require('nodemailer');


/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post("/signup",
    [
        check("pseudo", "Please enter a Pseudo").not().isEmpty(),
        check("first_name", "Please enter a first name").not().isEmpty(),
        check("last_name", "Please enter a last name").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            first_name,
            last_name,
            pseudo,
            email,
            password,
            profile_picture
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                first_name,
                last_name,
                pseudo,
                email,
                password,
                profile_picture
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    req.session.isAuth = true
                    req.session.user = user
                    req.session.token = token
        
                    console.log(req.session)

                    res.status(200).json({
                        token
                    });
                }
            );
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

/**
 * @method - POST
 * @param - /login
 * @description - User SignIn
 */
router.post("/login",
    [
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            email,
            pseudo,
            password
        } = req.body;
        try {
            let user
            if(email){
                user = await User.findOne({email});
            } else if(pseudo){
                user = await User.findOne({pseudo});
            }
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });

            const payload = {
                user: {
                    id: user.id
                }
            };

            await User.updateOne(user, {
                last_connection: Date.now()
            });

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    req.session.isAuth = true
                    req.session.user = user
                    req.session.token = token

                    if(user.pseudo == "SUPER_ADMIN"){
                        req.session.isAdmin = true
                    } else {
                        req.session.isAdmin = false
                    }
                    
                    console.log("Connected as", req.session.user.pseudo)
                    // console.log(req.session)

                    res.status(200).json(
                        req.session
                    );
                }
            );

        } catch (e) {
            console.error(e);
            console.log("Server Error")
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

/**
 * @method - GET
 * @param - /logout
 * @description - User Logout
 */
 router.get("/logout", async (req, res) => {
    res.clearCookie()
    console.log("------------------------------------------------")
    console.log(req.session)
    req.session.isAuth = false
    req.session.user = null
    req.session.token = ""
    req.session.isAdmin = false
    req.session.destroy((err) => {
        console.log(logout)
        if(err) {
            return console.log(err);
        }
        res.status(500).json({
            message: "Logout"
        });
    });
})

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /me
 */
router.get("/me", 
async (req, res) => {
    try {
       console.log(req.session.user)
        const user = await User.findById(req.user.id)
        .populate('courses');
        res.json(user);
    } catch (e) {
        res.send({
            message: "Error in Fetching user"
        });
    }
});

/**
 * @method - GET
 * @description - Get User by Id
 * @param - /:id
 */
router.get("/find/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
});

/**
 * @method - PUT
 * @param - /:id
 * @description - User update
 */
 router.put("/:id", async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - DELETE
 * @param - /:id
 * @description - User delete
 */
router.delete("/:id", async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("The user has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /:id
 * @description - User's courses
 */
 router.get("/:id/courses/hhhhhhhhhh", async (req, res) => {
    try{
        await User.findById(req.params.id)
            .populate({
                path : 'courses',
                // populate : {
                //     path : 'categories'
                // }
            })
            .exec(function(err, users) {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).json(users)
                }
            })
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /:id
 * @description - User's public courses
 */
 router.get("/:id/courses/public", async (req, res) => {
    try{
        await User.findById(req.params.id)
            .populate({
                path: 'courses',
                match: {
                    is_public: true
                }
            })
            .exec(function(err, users) {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).json(users)
                }
            })
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /:id
 * @description - User's private courses
 */
 router.get("/:id/courses/private", async (req, res) => {
    try{
        await User.findById(req.params.id)
            .populate({
                path: 'courses',
                match: {
                is_public: false
                }
            })
            .exec(function(err, users) {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).json(users)
                }
            })
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /
 * @description - Get All
 */
 router.get("/", async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - PUT
 * @param - /:id
 * @description - User update
 */
 router.put("/:id/reset-password", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const updatedUser = await User.findByIdAndUpdate({ _id: req.params.id }, {
            password: password
        })
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/forgotPassword', (req, res) => {
    console.log("")
    if (req.body.email === '') {
        console.log("email required")
        res.status(400).send('email required');
    }
    User.findOne({email: req.body.email.email}).then((user) => {
        if (!user) {
            console.log('email not in database');
            res.status(200).send('email not in db');
        } else {
            console.log("=>" + user.email)
            const token = crypto.randomBytes(20).toString('hex');
            console.log("token : " + token)
            user.update({
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 3600000,
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "itihel.iim@gmail.com",
                    pass: "waitrxsfmvockhfm",
                },
            });

            const mailOptions = {
                from: 'itihel.iim@gmail.com',
                to: user.email,
                subject: 'Link To Reset Password',
                text:
                    'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                    + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                    + `http://localhost:3000/reset?token=${token}&user_id=${user._id}\n\n`
                    + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            };

            console.log('sending mail');
            console.log('...');

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('there was an error: ', err);
                } else {
                    console.log('here is the res: ', response);
                    res.status(200).json('recovery email sent');
                }
            });
        }
    });
})




module.exports = router;