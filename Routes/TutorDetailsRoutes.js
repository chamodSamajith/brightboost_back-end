var express = require('express')
var router = express.Router();
const Tutor = require('../Models/TutorDetails')

//insert
router.post('/create', (req, res) => {

    const tutor = new Tutor({
        TutorName: req.body.TutorName,
        TutorSubjects: req.body.TutorSubjects,
        AvailableDateTIme: req.body.AvailableDateTIme,
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

//get all records
router.get('/getAll', (req, res) => {
    Tutor.find()
        .then(tutors => {
            res.status(200).send({
                message: 'TutorDetails retrieved successfully!',
                data: tutors
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error while retrieving tutor details',
                error: err
            });
        });
});


module.exports = router;