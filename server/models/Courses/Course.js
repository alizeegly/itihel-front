const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    text:  {
        type: String,
        default: ""
    },
    is_public: {
        type: Boolean,
        default: false
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    profile_picture: {
        type: String,
        default: ""
    },
    categories:  [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Role',
        required: true
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Course", CourseSchema)