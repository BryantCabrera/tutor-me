/********** REQUIRES **********/
require('./db/db');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const tutorsRouter = require('./routers/tutors');
const studentsRouter = require('./routers/students');
const authRouter = require('./routers/authentication');

/********** MIDDLEWARE **********/
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

/********** ROUTERS/CONTROLLERS **********/
app.use('/tutors', tutorsRouter);
app.use('/students', studentsRouter);
app.use('/authentication', authRouter);

//Index Route: Home
app.get('/', (req, res) => {
    res.render('index.ejs');
});

/********** LISTENER **********/
app.listen(3000, () => {
    console.log('Server is listening on port 3000.');
});