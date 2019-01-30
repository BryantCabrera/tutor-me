const express = require('express');
const router  = express.Router();
const Tutor = require('../models/tutors');
const Student = require('../models/students');
const bcrypt = require('bcryptjs');

//registration
router.post('/registration/:accountType', async (req, res) => {
    req.body.account = `${req.params.accountType}`;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    //enter person into database
    let newUser = {};
    newUser = req.body;
    newUser.password = hashedPassword;
    newUser.memberSince = new Date();

    if (req.body.account === 'Tutor') {
        newUser.account = 'Tutor';
    } else if (req.body.account === 'Student') {
        newUser.account = 'Tutor';
    }
    
    // console.log(newUser);

    try {
        //create user
        let createdUser;
        if (req.params.accountType === 'Tutor') {
            createdUser = await Tutor.create(newUser);
        } else if (req.params.accountType === 'Student') {
            createdUser = await Student.create(newUser);
        }
        // const createdUser = await (newUser.account).create(userDbEntry);
        // console.log(createdUser + ' this is the created user');

        //create a session
        req.session.user = createdUser; //reassigns global variable from server.js
        req.session.username = createdUser.username;
        req.session.logged = true;

        //redirect to appropriate index
        res.redirect(`/${(req.params.accountType).toLowerCase()}s/${createdUser._id}/edit`);
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
                req.session.user = loggedUser; //reassigns global variable from server.js
                req.session.message = '';
                req.session.email = loggedUser.email;
                req.session.logged = true;

                res.redirect(`/${(loggedUser.account).toLowerCase()}s/${loggedUser._id}`);
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
router.get('/logout', (req, res) => {
    req.session.destroy((err) => err ? res.send(err) : res.redirect('/'));
});

module.exports = router;