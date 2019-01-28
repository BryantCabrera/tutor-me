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
        if (req.body.account === 'Tutor') {
            createdUser = await Tutor.create(newUser);
        } else if (req.body.account === 'Student') {
            createdUser = await Student.create(newUser);
        }
        // const createdUser = await (newUser.account).create(userDbEntry);
        console.log(createdUser + ' this is the created user');

        //create a session
        req.session.username = createdUser.username;
        req.session.logged = true;

        //redirect to appropriate index
        console.log(`/${(createdUser.account).toLowerCase()}s/${createdUser._id}/edit`);
        res.redirect(`/${(createdUser.account).toLowerCase()}s/${createdUser._id}/edit`);
    } catch (err) {
        res.send(err);
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        //find the logged in user
        let loggedUser;

        if (req.body.account === 'Tutor') {
            loggedUser = await Tutor.findOne({email: req.body.email});
        } else if (req.body.account === 'Student') {
            loggedUser = await Student.findOne({email: req.body.email});
        }

        //if the email address entered is an existing user in the database, check the password.  If not, redirect to splash page and give error message
        if (loggedUser) {
            //if passwords match, redirect to appropriate page, else, redirect to splash page and give error message
            if(bcrypt.compareSync(req.body.password, loggedUser.password)) {
                req.session.message = '';
                req.session.username = loggedUser.email;
                req.session.logged = true;
            } else {
                req.session.message = 'Your password does not match.';
            res.redirect('/');
            }
        } else {
            req.session.message = 'Your username does not exist.';
            res.redirect('/');
        }

    } catch (err) {
        res.send(err);
    }
});

//logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => err ? res.send(err) : res.redirect('/'));
});

module.exports = router;