const mongoose = require('mongoose');
const extras = require('./extras');

const tutorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    rate: {type: Number, required: true},
    paymentInfo: {type: String, required: true},
    location: {type: Number, required: true},
    profilePicture: String,
    description: String,
    subjects: [extras.subjectSchema],
    availability: [extras.availabilitySchema],
    rating: Number,
    feedback: [extras.commentSchema],
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
    memberSince: Date,
    account: String
}, {
    timestamps: true
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;