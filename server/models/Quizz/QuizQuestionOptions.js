const mongoose = require('mongoose')

const QuizQuestionOptionsSchema = new mongoose.Schema({
    text:  {
        type: String,
        required: true
    },
    is_correct: {
        type: Boolean, 
        required: true
    },
    quiz_question_id:  {
        type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion', 
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("QuizQuestionOptions", QuizQuestionOptionsSchema)