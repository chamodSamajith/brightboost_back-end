var mongoose = require('mongoose');
const schema = mongoose.Schema;

const Tutorchema = new schema({
    TutorName: {
        type: String,
        required: true
    },
    TutorSubject: {
        type: String,
        required: true
    },
    TutorTime: {
        type: String,
        required: true
    },
})
module.exports = Tutor = mongoose.model('Tutor', Tutorchema)