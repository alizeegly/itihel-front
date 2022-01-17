const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Course'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Category", CategorySchema, "categories")