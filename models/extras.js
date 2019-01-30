const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String
}, {
    timestamps: true
});

const subjectSchema = new mongoose.Schema({
    content: String
});

const availabilitySchema = new mongoose.Schema({
    content: Date
}, {
    timestamps: true
}); 


module.exports = {commentSchema, subjectSchema, availabilitySchema};