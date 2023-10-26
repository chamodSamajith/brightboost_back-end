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

//get all tutor schedules
router.get('/getAll', (req, res) => {
    Tutor.find()
        .then(schedules => {
            res.status(200).send({
                message: 'Tutor Schedules retrieved successfully!',
                data: schedules
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error while retrieving tutor schedules',
                error: err
            });
        });
});

// get a tutor schedule by ID
router.get('/getById/:id', (req, res) => {
    const scheduleId = req.params.id;

    Tutor.findById(scheduleId)
        .then(schedule => {
            if (!schedule) {
                return res.status(404).send({
                    message: 'Tutor Schedule not found'
                });
            }
            res.status(200).send({
                message: 'Tutor Schedule retrieved successfully!',
                data: schedule
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error while retrieving tutor schedule',
                error: err
            });
        });
});

// Update a tutor schedule by ID
router.put('/update/:id', (req, res) => {
    const scheduleId = req.params.id;

    Tutor.findByIdAndUpdate(scheduleId, req.body, { new: true })
        .then(updatedSchedule => {
            if (!updatedSchedule) {
                return res.status(404).send({
                    message: 'Tutor Schedule not found'
                });
            }
            res.status(200).send({
                message: 'Tutor Schedule updated successfully!',
                data: updatedSchedule
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error while updating tutor schedule',
                error: err
            });
        });
});

// Delete a tutor schedule by ID
router.delete('/delete/:id', (req, res) => {
    const scheduleId = req.params.id;

    Tutor.findByIdAndRemove(scheduleId)
        .then(deletedSchedule => {
            if (!deletedSchedule) {
                return res.status(404).send({
                    message: 'Tutor Schedule not found'
                });
            }
            res.status(200).send({
                message: 'Tutor Schedule deleted successfully!',
                data: deletedSchedule
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error while deleting tutor schedule',
                error: err
            });
        });
});