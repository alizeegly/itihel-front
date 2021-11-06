const router = require('express').Router()
const mongoose = require('mongoose');
const Course = require("../../models/Courses/Course")
const User = require("../../models/Users/User")
var ObjectId = require('mongodb').ObjectId;

/**
 * @method - POST
 * @param - /
 * @description - Course create
 */
router.post("/", async (req, res) => {
    const newCourse = new Course(req.body)
    try{
        const savedCourse = await newCourse.save()
        User.findById(req.body.owner_id, function(err, user) {
            if (err) return res.send(err);
            user.courses.push(newCourse._id);
            user.save(function(err) {
              if (err) return res.send(err);
            });
        });
        res.status(201).json(savedCourse)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - PUT
 * @param - /:id
 * @description - Course update
 */
router.put("/:id", async (req, res) => {
    try{
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedCourse)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - DELETE
 * @param - id, user
 * @description - Course delete et delete dans user
 */
router.delete("/:id/:user", async (req, res) => {
    try{
        await Course.findByIdAndDelete(req.params.id)

        await User.findByIdAndUpdate(req.params.user, 
            { $pull: { courses: mongoose.Types.ObjectId(req.params.id)} },
            { new: true }
        )
        res.redirect("/api/courses");
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /find/:id
 * @description - Get One Course
 */
router.get("/find/:id", async (req, res) => {
    try{
        const course = await Course.findById(req.params.id)
        res.status(200).json(course)
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /
 * @description - Get All courses of all Users
 */
router.get("/", async (req, res) => {
    try{
        const courses = await Course.find()
        res.status(200).json(courses)
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /:id
 * @description - Get all public courses
 */
 router.get("/public", async (req, res) => {
    try{
        await Course.find({ is_public: true })
        .exec(function(err, courses) {
            if(err) {
                console.log(err)
            } else {
                res.status(200).json(courses)
            }
        })
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router