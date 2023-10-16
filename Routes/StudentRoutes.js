var express = require('express')
var router = express.Router();
const Student = require('../Models/Student')


/*
    method : POST
    description : create new student
    params : Body {
        --
    }
*/
router.post('/create', (req, res) => {

    const student = new Student({
        StudentFName: req.body.StudentFName,
        StudentLName: req.body.StudentLName,
        StudentAge: req.body.StudentAge,
        StudentAddress: req.body.StudentAddress,
        StudentPhone: req.body.StudentPhone,
        StudentEmail: req.body.StudentEmail,
        StudentPassword: req.body.StudentPassword
    })
    student.save().then(stu => {
        try {
            res.status(200).send({
                message: 'Student created successfully !',
                data: stu
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
    description : Student login
    params : Body {
        email,password
    }
*/
router.post('/studentLogin', (req, res) => {
    Student.findOne({
        StudentEmail: req.body.StudentEmail,
        StudentPassword: req.body.StudentPassword
    }).then(user => {
        if (user) {
            console.log("found")
            res.send({
                message: 'successfully logged in ',
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