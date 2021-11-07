const router = require('express').Router()
const mongoose = require('mongoose');
const Course = require("../../models/Courses/Course")
const CourseShared = require("../../models/Courses/CourseShared")
const User = require("../../models/Users/User")
const Role = require("../../models/Users/Role")
const auth = require("../../middleware/auth");

/**
 * @method - POST
 * @param - /
 * @description - Course create
 */
router.post("/", auth, async (req, res) => {
    try{
        const newCourse = new Course(req.body)
        newCourse.save()
        
        User.findOne({_id: mongoose.Types.ObjectId(req.body.owner_id)}, function(err, user) {
            if (err) return console.log(err)
            user.courses.push(newCourse._id)
            user.save()
        });

        const role_admin = await Role.findById("618702283f5059816c261d99")
        const newCourseShared = new CourseShared({
            course_id: newCourse._id,
            user_id: newCourse.owner_id,
            roles: [role_admin._id]
        })
        newCourseShared.save()
        
        res.redirect("/api/courses");
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - PUT
 * @param - /:id
 * @description - Course update
 */
router.put("/:id", auth, async (req, res) => {
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
router.delete("/:id/:user", auth, async (req, res) => {
    try{
        await Course.findByIdAndDelete(req.params.id)

        await User.findByIdAndUpdate(req.params.user, 
            { $pull: { courses: mongoose.Types.ObjectId(req.params.id)} },
            { new: true }
        )

        await CourseShared.deleteOne({ course_id: req.params.id });

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
router.get("/find/:id", auth, async (req, res) => {
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
router.get("/", auth, async (req, res) => {
    try{
        const courses = await Course.find(req.query).populate('owner_id')
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
 router.get("/public", auth, async (req, res) => {
    try{
        await Course.find({ $and:[{is_public: true},req.query]})
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