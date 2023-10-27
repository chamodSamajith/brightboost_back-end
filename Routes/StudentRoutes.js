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
                data: stu,
                messageCode : 1000
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

// get all students
router.get('/', async (req, res) => {
    try {
        const Students = await Student.find();
        res.json(Students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/*
    method : GET
    description : get all Students
  
*/
router.get('/all', (req, res) => {
    // Use the `find` method to fetch all students
    Student.find().then(studentlist => {
        // Send the response inside the promise block
        res.send(studentlist);
        
        // This console.log will display the data you just sent
        console.log(studentlist);
    }).catch(err => {
        // Handle any errors that might occur during the database query
        console.error(err);
        res.status(500).send("An error occurred while fetching student data.");
    });
});

module.exports = router;