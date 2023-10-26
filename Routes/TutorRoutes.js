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
        TutorFName: req.body.TutorFName,
        TutorLName: req.body.TutorLName,
        TutorAge: req.body.TutorAge,
        TutorAddress: req.body.TutorAddress,
        TutorEmail: req.body.TutorEmail,
        TutorPassword: req.body.TutorPassword,
        TutorPhone: req.body.TutorPhone
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

// get all tutors
router.get('/', async (req, res) => {
    try {
        const Tutors = await Tutor.find();
        res.json(Tutors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;