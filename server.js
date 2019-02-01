/********** REQUIRES **********/
require('dotenv').config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const $ = require('jquery');
require('./db/db');

const tutorsRouter = require('./routers/tutors');
const studentsRouter = require('./routers/students');
const authRouter = require('./routers/authentication');

/********** MIDDLEWARE **********/
app.use(session({
    secret: "THIS IS A RANDOM STRING SECRET",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//makes user a global variable
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user;
    next();
});

//Index Route: Home
app.get('/', (req, res) => {
    res.render('index.ejs', {
        message: req.session.message,
        user: req.session.user
    });
});

/********** ROUTERS/CONTROLLERS **********/
app.use('/auth', authRouter);
app.use((req, res, next) => req.session.logged ? next() : res.redirect('/'));
app.use('/tutors', tutorsRouter);
app.use('/students', studentsRouter);

/********** LISTENER **********/
app.listen(3000, () => {
    console.log('Server is listening on port 3000.');
});