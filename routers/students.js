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
            tutor: foundStudent
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

        res.render('../views/students/show.ejs', {
            student: foundStudent
        });
    } catch (err) {
        res.send(err);
    }
});

//Delete Route
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndRemove(req.params.id);
        
        //deletes references to deletedStudent in corresponding Students
        const deletedStudentTutors = await Tutor.find({ _id: {$in: deletedTutor.students} });

        deletedStudentTutors.forEach(tutor => {
            tutor.students.forEach( (student, index) => {
            if (student === deletedStudent._id) {
                tutor.splice(index, 1);
            }

            await tutor.save();
        }
        )});


        res.redirect('/auth/logout');
    } catch (err) {
        res.send(err);
    }
});

/********** EXPORTS **********/
module.exports = router;