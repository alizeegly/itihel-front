const router = require('express').Router()
const mongoose = require('mongoose');
const Course = require("../../models/Courses/Course")
const Category = require("../../models/Courses/Category")
const CourseShared = require("../../models/Courses/CourseShared")
const User = require("../../models/Users/User")
const Role = require("../../models/Users/Role")
const auth = require("../../middleware/auth")

/**
 * @method - POST
 * @param - /
 * @description - Course create
 */
router.post("/", auth, async (req, res) => {
    try{
        if(req.session.isAuth){
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
            
            res.redirect("/api/courses")
        } else {
            res.status(500).json({"message": "Error connection"})
        }
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
        if(req.session.isAuth){
            const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedCourse)
        } else {
            res.status(500).json({"message": "Error connection"})
        }
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
        if(req.session.isAuth){
            await Course.findByIdAndDelete(req.params.id)

            await User.findByIdAndUpdate(req.params.user, 
                { $pull: { courses: mongoose.Types.ObjectId(req.params.id)} },
                { new: true }
            )

            await CourseShared.deleteOne({ course_id: req.params.id });

            res.redirect("/api/courses")
        } else {
            res.status(500).json({"message": "Error connection"})
        }
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
        if(req.session.isAuth){
            const course = await Course.findById(req.params.id)
            res.status(200).json(course)
        } else {
            res.status(500).json({"message": "Error connection"})
        }
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
        console.log(req.session)
        if(req.session.isAuth){
            const courses = await Course.find(req.query).populate('owner_id')
            res.status(200).json(courses)
        } else {
            res.status(500).json({"message": "Error connection"})
        }
    } catch(err) {
        console.log(err)
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
        if(req.session.isAuth){
            await Course.find({ $and:[{is_public: true},req.query]})
            .exec(function(err, courses) {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).json(courses)
                }
            })
        } else {
            res.status(500).json({"message": "Error connection"})
        }
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - course
 * @description - Get All categories of one course
 */
 router.get("/:course/categories", auth, async (req, res) => {
    try{
        if(req.session.isAuth){
            await Course.findById(req.params.course)
                .populate("categories")
                .exec(function(err, categories) {
                    if(err) {
                        console.log(err)
                    } else {
                        res.status(200).json(categories)
                    }
                })
        } else {
            res.status(500).json({"message": "Error connection"})
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

/**
 * @method - POST
 * @param - course
 * @description - Add a categorie to a course
 */
 router.post("/:course/categories", auth, async (req, res) => {
    try{
        if(req.session.isAuth){
            const newCategory = await Category.findById(req.body.category)

            Course.findOne({_id: mongoose.Types.ObjectId(req.params.course)}, function(err, course) {
                if (err) return console.log(err)
                course.categories.push(newCategory._id)
                course.save()
                res.redirect("/api/courses/" + req.params.course + "/categories")
            });
        } else {
            res.status(500).json({"message": "Error connection"})
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

/**
 * @method - DELETE
 * @param - course
 * @description - Delete a categorie to a course
 */
 router.put("/:course/categories", auth, async (req, res) => {
    try{
        if(req.session.isAuth){
            await Course.findByIdAndUpdate(req.params.course, 
                { $pull: { categories: mongoose.Types.ObjectId(req.body.category)} },
                { new: true }
            )
            res.redirect("/api/courses/" + req.params.course + "/categories")
        } else {
            res.status(500).json({"message": "Error connection"})
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router