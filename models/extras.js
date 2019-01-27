const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String
}, {
    timestamps: true
});

const subjectSchema = new mongoose.Schema({
    content: String
});

const tutorSchema = new mongoose.Schema({
    content: String
}, {
    timestamps: true
}); 

const availabilitySchema = new mongoose.Schema({
    content: Date
}, {
    timestamps: true
}); 


module.exports = [commentSchema, subjectSchema, tutorSchema, availabilitySchema];