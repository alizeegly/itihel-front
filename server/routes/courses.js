const router = require('express').Router()
const Course = require("../models/Courses/Course")
const User = require("../models/Users/User")

/**
 * @method - POST
 * @param - /
 * @description - Course create
 */
router.post("/", async (req, res) => {
    const newCourse = new Course(req.body)
    try{
        const savedCourse = await newCourse.save()
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
 * @param - /:id
 * @description - Course delete
 */
router.delete("/:id", async (req, res) => {
    try{
        await Course.findByIdAndDelete(req.params.id)
        res.status(200).json("The course has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /find/:id
 * @description - Get One
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
 * @description - Get All
 */
router.get("/", async (req, res) => {
    try{
        const courses = await Course.find()
        res.status(200).json(courses)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router