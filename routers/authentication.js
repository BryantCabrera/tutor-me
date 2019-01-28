const express = require('express');
const router  = express.Router();
const Tutor = require('../models/tutors');
const Student = require('../models/students');
const bcrypt = require('bcryptjs');

//registration
router.post('/registration', async (req, res) => {
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    //enter person into database
    let newUser = {};
    newUser = req.body;
    newUser.password = hashedPassword;

    if (req.body.account === 'Tutor') {
        newUser.account = 'Tutor';
    } else if (req.body.account === 'Student') {
        newUser.account = 'Tutor';
    }
    
    console.log(newUser);

    try {
        //create user
        let createdUser;
        if (req.body.account === 'tutor') {
            createdUser = await Tutor.create(newUser);
        } else if (req.body.account === 'student') {
            createdUser = await Student.create(newUser);
        }
        // const createdUser = await (newUser.account).create(userDbEntry);

        //create a session
        req.session.username = createdUser.username;
        req.session.logged = true;

        //redirect to appropriate index
        res.redirect(`/${(createdUser.account).toLowerCase()}s`)
    } catch (err) {
        res.send(err);
    }
});

//login
router.post('/login', (req, res) => {

});

//logout
router.post('/logout', (req, res) => {

});

module.exports = router;