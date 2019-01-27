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
    res.render('../views/tutors/new.ejs');
});

//Create Route
router.post('/', (req, res) => {

});

//Edit Route
router.get('/:id/edit', (req, res) => {

});

//Update Route
router.put('/:id', (req, res) => {

});

//Show Route
router.get('/:id', (req, res) => {

});

//Delete Route
router.delete('/:id', (req, res) => {

});

/********** EXPORTS **********/
module.exports = router;