/********** REQUIRES **********/
const express = require('express');
const router = express.Router();

const Tutor = require('../models/tutors');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', async (req, res) => {
    try {
        const allTutors = await Tutor.find({});

        res.render('../views/tutors/index.ejs', {
            tutors: allTutors
        })
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

        res.render('../views/tutors/show.ejs', {
            tutor: foundTutor
        });
    } catch (err) {
        res.send(err);
    }
});

//Delete Route
router.delete('/:id', (req, res) => {

});

/********** EXPORTS **********/
module.exports = router;