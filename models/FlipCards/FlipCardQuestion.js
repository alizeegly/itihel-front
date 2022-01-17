const mongoose = require('mongoose')

const QuizQuestionSchema = new mongoose.Schema({
    question:  {
        type: String,
        required: true
    },
    answer:  {
        type: String,
        required: true
    },
    flip_card_id:  {
        type: mongoose.Schema.Types.ObjectId, ref: 'FlipCard',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("QuizQuestion", QuizQuestionSchema)