const mongoose = require('mongoose');
const extras = require('./extras');

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    paymentInfo: {type: String, required: true},
    location: {type: Number, required: true},
    age: Number,
    profilePicture: String,
    description: String,
    // subjects: [extras.subjectSchema],
    // availability: [extras.availabilitySchema],
    rating: Number,
    // feedback: [extras.commentSchema],
    tutors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tutor'}],
    memberSince: Date,
    account: String
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;