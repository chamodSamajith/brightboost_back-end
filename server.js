var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

//DB connection

const dbURL = "mongodb+srv://chamika:Asd123+++@afcluster1-3t6tc.mongodb.net/test";

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
app.use('/api/users', UserRoute);
app.use('/api/tutors', TutorRoute);
app.use('/api/session', SessionRoute);

app.listen(3200, () => {
    console.log("server is listening on port 3200")
})