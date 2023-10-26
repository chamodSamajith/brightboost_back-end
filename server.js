var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

//DB connection

const dbURL = "mongodb+srv://chamika:Asd123+++@afcluster1-3t6tc.mongodb.net/BrightBoost";

mongoose
    .connect(dbURL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log("mongodb connected"))
    .catch(err => console.log(err));


//utils
app.use(bodyparser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//utils
app.use(bodyparser.json());
app.use(cors());

//Routes

var UserRoute = require('./Routes/StudentRoutes')
var TutorRoute = require('./Routes/TutorRoutes')
var SessionRoute = require('./Routes/SessionRoutes')
var questionsRoutes = require('./Routes/questionRoutes')
var subjectRoutes = require('./Routes/subjectRoutes')
var tutorDetailsRoutes = require('./Routes/TutorDetailsRoutes')
var tutorSheduleRoutes = require('./Routes/TutorSheduleRoutes')

app.use('/api/users', UserRoute);
app.use('/api/tutors', TutorRoute);
app.use('/api/session', SessionRoute);
app.use('/api/questions', questionsRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/tutordetails', tutorDetailsRoutes);
app.use('/api/tutorshedule', tutorSheduleRoutes);

app.listen(3200, () => {
    console.log("server is listening on port 3200")
})