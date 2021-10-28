const router = require('express').Router()
const User = require("../models/Users/User")

// CREATE
router.post("/", async (req, res) => {
    const newUser = new User(req.body)
    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

// UPDATE
router.put("/:id", async (req, res) => {
    if(req.user.id === req.params.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedUser)
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You can update only your account")
    }
})

// DELETE
router.delete("/:id", async (req, res) => {
    if(req.user.id === req.params.id){
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You can delete only your account")
    }
})

// GET
router.get("/find/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})

// GET ALL
router.get("/", async (req, res) => {
    const query = req.query.new
    try{
        const users = query ? await User.find().sort({_id:-1}).limit(10) : await User.find()
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router