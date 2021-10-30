const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    note_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Note'
    },
    shared_with: [
        {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    ]
    
}, {
    timestamps: true
})

module.exports = mongoose.model("Course", CourseSchema)