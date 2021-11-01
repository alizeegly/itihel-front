const router = require('express').Router()
const QuizQuestionOptions = require("../../models/Quizz/QuizQuestionOptions")

/**
 * @method - POST
 * @param - /
 * @description - QuizQuestionOptions create
 */
router.post("/", async (req, res) => {
    const newQuizQuestionOptions = new QuizQuestionOptions(req.body)
    try{
        const savedQuizQuestionOptions = await newQuizQuestionOptions.save()
        res.status(201).json(savedQuizQuestionOptions)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - PUT
 * @param - /:id
 * @description - QuizQuestionOptions update
 */
router.put("/:id", async (req, res) => {
    try{
        const updatedQuizQuestionOptions = await QuizQuestionOptions.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedQuizQuestionOptions)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - DELETE
 * @param - /:id
 * @description - QuizQuestionOptions delete
 */
router.delete("/:id", async (req, res) => {
    try{
        await QuizQuestionOptions.findByIdAndDelete(req.params.id)
        res.status(200).json("The QuizQuestionOptions has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /find/:id
 * @description - QuizQuestionOptions Get One
 */
router.get("/find/:id", async (req, res) => {
    try{
        const quizQuestionOptions = await QuizQuestionOptions.findById(req.params.id)
        res.status(200).json(quizQuestionOptions)
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /
 * @description - QuizQuestionOptions Get All
 */
router.get("/", async (req, res) => {
    try{
        const quizQuestionOptions = await QuizQuestionOptions.find()
        res.status(200).json(quizQuestionOptions)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router