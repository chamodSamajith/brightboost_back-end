var express = require('express')
var router = express.Router();
const Tutor = require('../Models/Tutor')


/*
    method : POST
    description : create new Tutor
    params : Body {
        --
    }
*/
router.post('/create', (req, res) => {

    const tutor = new Tutor({
        TutorName: req.body.TutorName,
        TutorSubject: req.body.TutorSubject,
        TutorTime: req.body.TutorTime,
    })
    tutor.save().then(tut => {
        try {
            res.status(200).send({
                message: 'Tutor created successfully !',
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



//get by id
router.get('/getbyid/:tutorId', (req, res) => {

    const sessionIdToSearch = req.params.tutorId; // Replace with the actual session ID

    Session.findById(sessionIdToSearch)
        .populate('tutorId') // Populate the 'hostUserId' reference with tutor data
        .exec((err, session) => {
            if (err) {
                console.error(err);
                // Handle the error, e.g., return an error response
            } else {
                if (session) {
                    // Session found with associated tutor data

                    console.log(session);
                    res.status(200).send({
                        status: 200,
                        message: 'success',
                        data: session
                    })


                    // Access the associated tutor data via session.hostUserId
                } else {
                    // Session not found
                    console.log('Session not found');
                    res.status(500).send()
                    // Handle the case where the session doesn't exist
                }
            }
        });
})//



/*
    method : POST
    description : Tutor login
    params : Body {
        email,password
    }
*/
router.post('/tutorLogin', (req, res) => {
    Tutor.findOne({
        TutorEmail: req.body.TutorEmail,
        TutorPassword: req.body.TutorPassword
    }).then(user => {
        if (user) {
            console.log("found")
            res.send({
                message: 'successfully logged in!',
                data: user,
                messageCode: "1000"
            })
        }
        else {
            console.log(" not found")
            res.send({
                message: 'Invalid user credentials',
                data: user,
                messageCode: "1001"
            })
        }

    })
})

module.exports = router;