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
        res.redirect(`/tutors/${createdStudent._id}/edit`);
    } catch (err) {
        res.send(err);
    }
});

//Edit Route
router.get('/:id/edit', async (req, res) => {

});

//Update Route
router.put('/:id', async (req, res) => {

});

//Show Route
router.get('/:id', async (req, res) => {

});

//Delete Route
router.delete('/:id', async (req, res) => {

});

/********** EXPORTS **********/
module.exports = router;