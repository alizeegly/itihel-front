const bcrypt = require("bcryptjs");
const User = require("../models/Users/User"); // User model
const Joi = require('@hapi/joi');
const { registerSchema, loginSchema } = require('../utils/userValidations')

exports.isAuth = (req,res,next) => {
    const sessUser = req.session.user;
    if(sessUser) {
        next();
    } else {
        err = res.status(401).json("You Need to Be Logged in to do this. Access Denied ")
        return err;
    }
};


exports.registerUser = (req, res) => {
    const { first_name, last_name, pseudo, email, password } = req.body;
  
    const result = registerSchema.validate({ first_name, last_name, pseudo, email, password});

    if(!result.error) {
        // Check for existing user
        User.findOne({ email: email }).then((user) => {
            if (user) return res.status(400).json("User already exists");
    
            //New User created
            const newUser = new User({
                first_name,
                last_name,
                pseudo,
                email,
                password
            });
    
            //Password hashing
            bcrypt.genSalt(12, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
    
                newUser.password = hash;
                // Save user
                newUser
                    .save()
                    .then(
                        res.json("Successfully Registered")
                    )
                    .catch((err) => console.log(err));
                })
            );
        });
    } else {
        res.status(422).json(result.error.details[0].message);
    }
  
  };