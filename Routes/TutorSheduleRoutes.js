var express = require('express')
var router = express.Router();
const Tutor = require('../Models/TutorDetails')

//insert tutor shedule
router.post('/create', (req, res) => {

    const tutor = new Tutor({
        TutorNames: req.body.TutorNames,
        SessionSubject: req.body.SessionSubject,
        SessionTimePeriodStart: req.body.SessionTimePeriodStart,
        SessionTimePeriodEnd: req.body.SessionTimePeriodEnd,
        sessionName: req.body.sessionName,
        maximumParticipants: req.body.maximumParticipants,
    })
    tutor.save().then(tut => {
        try {
            res.status(200).send({
                message: 'TutorDetails inserted successfully !',
                data: tut
            })

        } catch (err) {
            res.status(502).send({
                message: 'OOPS ! server error',
                error: err
            })
        }

    })
})