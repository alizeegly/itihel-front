const mongoose = require('mongoose')

const CourseSharedSchema = new mongoose.Schema({
    course:  {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course'
    },
    user:  {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    roles:  [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Role'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("CourseShared", CourseSharedSchema)