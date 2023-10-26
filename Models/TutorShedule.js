var mongoose = require('mongoose');
const schema = mongoose.Schema;

const TutorSheduleschema = new schema({
    TutorNames: {
        type: [String],
        required: true
    },
    SessionSubject: {
        type: String,
        required: true
    },
    SessionTimePeriod: {
        type: String,
        required: true
    },
    sessionName: {
        type: String,
        required: true
    },
    maximumParticipants: {
        type: String,
        required: true
    }
})
module.exports = Tutor = mongoose.model('TutorDetails', TutorSheduleschema)