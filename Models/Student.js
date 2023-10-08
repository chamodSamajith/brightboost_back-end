var mongoose = require('mongoose');
const schema = mongoose.Schema;

const studentSchema = new schema({
    StudentFName: {
        type: String,
        required: true
    },
    StudentLName: {
        type: String,
        required: true
    },
    StudentAge: {
        type: Number,
        required: true
    },
    StudentAddress: {
        type: String,
        required: true
    },
    StudentEmail: {
        type: String,
        required: true
    },
    StudentPassword: {
        type: String,
        required: true
    },
    StudentPhone: {
        type: Number,
        required: true
    },
    AssignedClasses: {
        type: [Object],
        required: false
    }
})
module.exports = Student = mongoose.model('Students', studentSchema)