const router = require('express').Router()
const Category = require("../../models/Courses/Category")
const auth = require("../../middleware/auth")

/**
 * @method - POST
 * @param - /
 * @description - Category create
 */
 router.post("/", async (req, res) => {
    const newCategory = new Category(req.body)
    try{
        const savedCategory = await newCategory.save()
        res.status(201).json(savedCategory)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - PUT
 * @param - /:id
 * @description - Category update
 */
 router.put("/:id", async (req, res) => {
    try{
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedCategory)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - DELETE
 * @param - /:id
 * @description - Category delete
 */
router.delete("/:id", async (req, res) => {
    try{
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json("The category has been deleted")
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
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
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
        console.log(req.headers)
        const categories = await Category.find().populate('courses')
        res.status(200).json(categories)
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - course
 * @description - Get All course of one category
 */
 router.get("/:category/courses", async (req, res) => {
    try{
        await Category.findById(req.params.category)
            .populate("courses")
            .exec(function(err, courses) {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).json(courses)
                }
            })
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router