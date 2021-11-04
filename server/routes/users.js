const express = require("express");
const {
    check,
    validationResult
} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();

const User = require("../models/Users/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post("/signup",
    [
        check("pseudo", "Please Enter a valid Pseudo")
        .not()
        .isEmpty(),
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
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
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
                    res.status(200).json({
                        token
                    });
                }
            );

        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /me
 */
router.get("/me", 
auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
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
 router.put("/:id", auth, async (req, res) => {
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
router.delete("/:id", auth, async (req, res) => {
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
 router.get("/:id/courses", auth, async (req, res) => {
    try{
        // mongoose.Types.ObjectId(req.params.id)
        await User.find()
            .populate("courses")
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
 router.get("/:id/courses/public", auth, async (req, res) => {
    try{
        await User.find()
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
 router.get("/:id/courses/private", auth, async (req, res) => {
    try{
        await User.find()
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
 * @param - /logout
 * @description - User Logout
 */
//  router.get("/logout", auth, async (req, res) => {
//     console.log(req)
//     req.logout()
//     req.session = null
//     res.redirect('/')
// })

module.exports = router;