const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;