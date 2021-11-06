const router = require('express').Router()
const Course = require("../../models/Courses/Course")
const CourseShared = require("../../models/Courses/CourseShared")
const User = require("../../models/Users/User")

/**
 * @method - POST
 * @param - /
 * @description - Partage du cours à un user
 */
router.post("/", async (req, res) => {
    const newCourse = new CourseShared(req.body)
    try{
        const savedCourse = await newCourse.save()
        res.status(201).json(savedCourse)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - POST
 * @param - /:course
 * @description - Get all partage d'un cours
 */
 router.get("/course/:course", async (req, res) => {
    try{
        await CourseShared
            .find({course_id: req.params.course})
            .populate('roles')
            .populate('course_id')
            .populate('user_id')
            .exec(function(err, courses) {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).json(courses)
                }
            })
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - POST
 * @param - /:cours
 * @description - Get all partage d'un user
 */
 router.get("/user/:user", async (req, res) => {
    try{
        await CourseShared
            .find({user_id: req.params.user})
            .populate('roles')
            .populate('course_id')
            .populate('user_id')
            .exec(function(err, courses) {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).json(courses)
                }
            })
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - DELETE
 * @param - /:id
 * @description - User ne participe plus au cours
 */
 router.delete("/:id", async (req, res) => {
    try{
        await CourseShared.findByIdAndDelete(req.params.id)
        res.status(200).json("The course shared has been deleted with this user")
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - PUT
 * @param - /:id
 * @description - Update des roles d'un user sur le cours
 */
//  router.put("/:user/:course", async (req, res) => {
//     try{
//         const updatedRole = await CourseShared.findOneAndUpdate(
//             { course_id: mongoose.Types.ObjectId(course), user_id: mongoose.Types.ObjectId(user) }, function (err, course) {
//                 var role = course.roles.id(req.body.role);
//                 subDoc = req.body;
//                 post.save(function (err) {
//                     if (err) return res.status(500).send(err);
//                     res.send(post);
//                 });
//             });
//         res.status(200).json(updatedRole)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })


module.exports = router