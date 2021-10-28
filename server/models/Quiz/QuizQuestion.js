const mongoose = require('mongoose')

const QuizQuestionSchema = new mongoose.Schema({
    text:  {
        type: String,
        required: true
    },
    quiz_id:  [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Quiz',
        required: true
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("QuizQuestion", QuizQuestionSchema)