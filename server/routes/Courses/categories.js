const router = require('express').Router()
const Category = require("../../models/Courses/Category")

/**
 * @method - POST
 * @param - /
 * @description - Category create
 */
 router.post("/", async (req, res) => {
    const newCategory = new Category(req.body)
    try{
        if(req.session.isAuth && req.session.isAdmin && req.session.user.pseudo === "SUPER_ADMIN"){
            const savedCategory = await newCategory.save()
            res.status(201).json(savedCategory)
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
 * @description - Category update
 */
 router.put("/:id", async (req, res) => {
    try{
        if(req.session.isAuth && req.session.isAdmin && req.session.user.pseudo === "SUPER_ADMIN"){
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedCategory)
        } else {
            res.status(500).json({"message": "Error connection"})
        }
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
        if(req.session.isAuth && req.session.isAdmin && req.session.user.pseudo === "SUPER_ADMIN"){
            await Category.findByIdAndDelete(req.params.id)
            res.status(200).json("The category has been deleted")
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
 * @description - Get One
 */
router.get("/find/:id", async (req, res) => {
    try{
        if(req.session.isAuth){
            const category = await Category.findById(req.params.id)
            res.status(200).json(category)
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
 * @description - Get All
 */
router.get("/", async (req, res) => {
    try{
        if(req.session.isAuth){
            const categories = await Category.find()
            res.status(200).json(categories)
        } else {
            res.status(500).json({"message": "Error connection"})
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router