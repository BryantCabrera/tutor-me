const mongoose = require('mongoose');
const Comment = require('./comments');
const Student = require('./students');

const tutorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    rate: {type: Number, required: true},
    paymentInfo: {type: String, required: true},
    location: {type: Number, required: true},
    profilePicture: String,
    description: String,
    subjects: [String],
    availability: [Date],
    rating: Number,
    feedback: [Comment.schema],
    students: [Student.schema],
    memberSince: Date
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;