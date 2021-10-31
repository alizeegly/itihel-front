const router = require('express').Router()
const Score = require("../models/Quiz/Score")

/**
 * @method - POST
 * @param - /
 * @description - Score create
 */
router.post("/", async (req, res) => {
    const newScore = new Note(req.body)
    try{
        const savedScore = await newScore.save()
        res.status(201).json(savedScore)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - PUT
 * @param - /:id
 * @description - Score update
 */
router.put("/:id", async (req, res) => {
    try{
        const updatedScore = await Score.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedScore)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - DELETE
 * @param - /:id
 * @description - Score delete
 */
router.delete("/:id", async (req, res) => {
    try{
        await Score.findByIdAndDelete(req.params.id)
        res.status(200).json("The score has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /find/:id
 * @description - Score Get One
 */
router.get("/find/:id", async (req, res) => {
    try{
        const score = await Score.findById(req.params.id)
        res.status(200).json(score)
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /
 * @description - Note Get All
 */
router.get("/", async (req, res) => {
    try{
        const scores = await Score.find()
        res.status(200).json(scores)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router