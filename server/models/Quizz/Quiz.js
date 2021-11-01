const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
    title:  {
        type: String,
        required: true
    },
    minutes: {
        type: Number, 
        min: 0, 
        max: 59
    },
    seconds: {
        type: Number, 
        min: 0, 
        max: 59
    },
    course_id:  {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Quiz", QuizSchema)