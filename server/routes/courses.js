const router = require('express').Router()
const Course = require("../models/Courses/Course")
const User = require("../models/Users/User")

// CREATE
router.post("/", async (req, res) => {
    const newCourse = new Course(req.body)
    try{
        const savedCourse = await newCourse.save()
        // await User.findOneAndUpdate({ _id: req.user._id }, {$set: {courses: savedCourse._id}}, { new: true })
        res.status(201).json(savedCourse)
    }catch(err){
        res.status(500).json(err)
    }
})

// UPDATE
router.put("/:id", async (req, res) => {
    try{
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedCourse)
    }catch(err){
        res.status(500).json(err)
    }
})

// DELETE
router.delete("/:id", async (req, res) => {
    try{
        await Course.findByIdAndDelete(req.params.id)
        res.status(200).json("The course has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

// GET
router.get("/find/:id", async (req, res) => {
    try{
        const course = await Course.findById(req.params.id)
        res.status(200).json(course)
    } catch(err) {
        res.status(500).json(err)
    }
})

// GET ALL
router.get("/", async (req, res) => {
    try{
        const courses = await Course.find()
        res.status(200).json(courses)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router