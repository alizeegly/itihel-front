const router = require('express').Router()
const QuizQuestion = require("../../models/Quizz/QuizQuestion")

/**
 * @method - POST
 * @param - /
 * @description - QuizQuestion create
 */
router.post("/", async (req, res) => {
    const newQuizQuestion = new QuizQuestion(req.body)
    try{
        const savedQuizQuestion = await newQuizQuestion.save()
        res.status(201).json(savedQuizQuestion)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - PUT
 * @param - /:id
 * @description - QuizQuestion update
 */
router.put("/:id", async (req, res) => {
    try{
        const updatedQuizQuestion = await QuizQuestion.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedQuizQuestion)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - DELETE
 * @param - /:id
 * @description - QuizQuestion delete
 */
router.delete("/:id", async (req, res) => {
    try{
        await QuizQuestion.findByIdAndDelete(req.params.id)
        res.status(200).json("The QuizQuestion has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /find/:id
 * @description - QuizQuestion Get One
 */
router.get("/find/:id", async (req, res) => {
    try{
        const quizQuestion = await QuizQuestion.findById(req.params.id)
        res.status(200).json(quizQuestion)
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /
 * @description - QuizQuestion Get All
 */
router.get("/", async (req, res) => {
    try{
        const quizQuestions = await QuizQuestion.find()
        res.status(200).json(quizQuestions)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router