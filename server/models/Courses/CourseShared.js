const mongoose = require('mongoose')

const CourseSharedSchema = new mongoose.Schema({
    course_id:  {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course'
    },
    user_id:  {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    roles:  [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Role'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("CourseShared", CourseSharedSchema)