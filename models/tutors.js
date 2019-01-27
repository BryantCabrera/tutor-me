const mongoose = require('mongoose');
const Comment = require('./comments');

const tutorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
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
    students: [String],
    memberSince: Date,
    account: tutor
}, {
    timestamps: true
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;