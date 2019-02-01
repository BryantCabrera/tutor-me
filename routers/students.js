/********** REQUIRES **********/
const express = require('express');
const router = express.Router();

const Student = require('../models/students');
const Tutor = require('../models/tutors');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', async (req, res) => {
    try {
        const allStudents = await Student.find({});

        res.render('../views/students/index.ejs', {
            students: allStudents
        });
    } catch (err) {
        res.send(err);
    }
});

//New Route
router.get('/new', (req, res) => {
    try {
        res.render('../views/students/new.ejs');
    } catch (err) {
        res.send(err);
    }  
});

//Create Route
router.post('/', async (req, res) => {
    try {
        const createdStudent = await Student.create(req.body);
        res.redirect(`/students/${createdStudent._id}/edit`);
    } catch (err) {
        res.send(err);
    }
});

//Edit Route
router.get('/:id/edit', async (req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.id);
        res.render('../views/students/edit.ejs', {
            student: foundStudent
        });
    } catch (err) {
        res.send(err);
    }
});

//Update Route
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.redirect(`/students/${updatedStudent._id}`);
    } catch (err) {
        res.send(err);
    }
});

//Show Route
router.get('/:id', async (req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.id);
        const foundStudentTutors = await Tutor.find({ _id: {$in: foundStudent.tutors} });

        res.render('../views/students/show.ejs', {
            student: foundStudent,
            tutors: foundStudentTutors
        });
    } catch (err) {
        res.send(err);
    }
});

//Delete Route
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndRemove(req.params.id);

        const tutors = await Tutor.find({'students': req.params.id});
        console.log(tutors.students + 'this is the tutor\'s students');
        tutors.forEach(async tutor => {
            await tutor.students.remove(deletedStudent._id);
            await tutor.save();  
        });

        res.redirect('/auth/logout');
    } catch (err) {
        res.send(err);
    }
});

//When a Tutor adds a comment onto Student's Page
router.post('/:id/comments', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        const tutor = await Tutor.findById(req.session.user._id);

        req.body.poster = `${req.session.user._id}`;
        req.body.postee = `${req.params.id}`;

        // student.rating = (student.rating + req.body.rating)/(student.feedback.length + 1);

        student.feedback.push(req.body);
        tutor.comments.push(req.body);

        await student.save();
        await tutor.save();

        res.redirect(`/students/${req.params.id}/#feedback`)
    } catch (err) {
        res.send(err);
    } 
});

//Add Tutor Route
router.post('/:studentId/:tutorId', async (req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.tutorId);
        const student = await Student.findById(req.params.studentId);

        tutor.students.push(student._id);
        student.tutors.push(tutor._id);

        tutor.save();
        student.save();

        res.redirect(`/students/${req.params.studentId}`);
    } catch (err) {
        res.send(err);
    }
    
});

/********** EXPORTS **********/
module.exports = router;