const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    text:  {
        type: String,
        required: true
    },
    course_id:  {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Note", NoteSchema)