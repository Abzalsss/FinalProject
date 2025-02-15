const mongoose = require('mongoose');

const Blog = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            default: "Anonymous",
        }
    }
)

module.exports = mongoose.model('blogs', Blog);