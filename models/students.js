const mongoose = require('mongoose');
const Comment = require('./comments');

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    paymentInfo: {type: String, required: true},
    location: {type: Number, required: true},
    age: Number,
    profilePicture: String,
    description: String,
    subjects: [String],
    rating: Number,
    feedback: [Comment.schema],
    tutors: [String],
    memberSince: Date,
    account: student
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;