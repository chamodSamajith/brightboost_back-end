var mongoose = require('mongoose');
const schema = mongoose.Schema;

const Tutorchema = new schema({
    TutorFName: {
        type: String,
        required: true
    },
    TutorLName: {
        type: String,
        required: true
    },
    TutorAge: {
        type: Number,
        required: true
    },
    TutorAddress: {
        type: String,
        required: true
    },
    TutorEmail: {
        type: String,
        required: true
    },
    TutorPassword: {
        type: String,
        required: true
    },
    TutorPhone: {
        type: Number,
        required: true
    },
    AssignedClasses: {
        type: [Object],
        required: false
    }
})
module.exports = Tutor = mongoose.model('Tutor', Tutorchema)