var express = require('express')
var router = express.Router();
const Tutor = require('../Models/TutorDetails')

//insert
router.post('/create', (req, res) => {

    const tutor = new Tutor({
        TutorName: req.body.TutorName,
        TutorSubjects: req.body.TutorSubjects,
        AvailableDateTimeFrom: req.body.AvailableDateTimeFrom,
        AvailableDateTimeTo: req.body.AvailableDateTimeTo,
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

// Update a tutor by ID
router.put('/update/:id', (req, res) => {
    const tutorId = req.params.id;
    const updatedData = {
        TutorName: req.body.TutorName,
        TutorSubjects: req.body.TutorSubjects,
        AvailableDateTIme: req.body.AvailableDateTIme
    };

    Tutor.findByIdAndUpdate(tutorId, updatedData, { new: true })
        .then(updatedTutor => {
            if (!updatedTutor) {
                return res.status(404).send({
                    message: 'Tutor not found'
                });
            }
            res.status(200).send({
                message: 'TutorDetails updated successfully!',
                data: updatedTutor
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error while updating tutor details',
                error: err
            });
        });
});

// Delete a tutor by ID
router.delete('/delete/:id', (req, res) => {
    const tutorId = req.params.id;

    Tutor.findByIdAndRemove(tutorId)
        .then(deletedTutor => {
            if (!deletedTutor) {
                return res.status(404).send({
                    message: 'Tutor not found'
                });
            }
            res.status(200).send({
                message: 'TutorDetails deleted successfully!',
                data: deletedTutor
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error while deleting tutor details',
                error: err
            });
        });
});


module.exports = router;