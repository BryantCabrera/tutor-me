/********** REQUIRES **********/
const express = require('express');
const router = express.Router();

const Tutor = require('../models/tutors');
const Student = require('../models/students');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', async (req, res) => {
    try {
        const allTutors = await Tutor.find({});

        res.render('../views/tutors/index.ejs', {
            tutors: allTutors
        });
    } catch (err) {
        res.send(err);
    }
});

//New Route
router.get('/new', (req, res) => {
    try {
        res.render('../views/tutors/new.ejs');
    } catch (err) {
        res.send(err);
    }  
});

//Create Route
router.post('/', async (req, res) => {
    try {
        const createdTutor = await Tutor.create(req.body);
        res.redirect(`/tutors/${createdTutor._id}/edit`);
    } catch (err) {
        res.send(err);
    }
});

//Edit Route
router.get('/:id/edit', async (req, res) => {
    try {
        const foundTutor = await Tutor.findById(req.params.id);
        res.render('../views/tutors/edit.ejs', {
            tutor: foundTutor
        });
    } catch (err) {
        res.send(err);
    }
});

//Update Route
router.put('/:id', async (req, res) => {
    try {
        const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.redirect(`/tutors/${updatedTutor._id}`);
    } catch (err) {
        res.send(err);
    }
});

//Show Route
router.get('/:id', async (req, res) => {
    try {
        const foundTutor = await Tutor.findById(req.params.id);
        const foundTutorStudents = await Student.find({ _id: {$in: foundTutor.students} });

        res.render('../views/tutors/show.ejs', {
            tutor: foundTutor,
            students: foundTutorStudents
        });
    } catch (err) {
        res.send(err);
    }
});

//Delete Route
router.delete('/:id', async (req, res) => {
    try {
        const deletedTutor = await Tutor.findByIdAndRemove(req.params.id);

        //deletes references to deletedTutor in corresponding Students
        const students = await Student.find({'tutors': req.params.id});
        console.log(students.tutors);
        students.forEach(async student => {
            await student.tutors.remove(deletedTutor._id);
            await student.save();  
        });
        console.log(students);

        //alternate way
        //deletes references to deletedTutor in corresponding Students
        // const deletedTutorStudents = await Student.find({ _id: {$in: deletedTutor.students} });

        // deletedTutorStudents.forEach(student => {
        //     student.tutors.forEach(async (tutor, index) => {
        //     if (tutor === `${deletedTutor._id}`) {
        //         student.splice(index, 1);
        //         console.log(tutor);
        //         console.log(deletedTutor._id);
        //     }

        //     await student.save();
        // }
        // )});

        res.redirect('/auth/logout');
    } catch (err) {
        res.send(err);
    }
});

/********** EXPORTS **********/
module.exports = router;