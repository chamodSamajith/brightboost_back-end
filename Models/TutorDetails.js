var mongoose = require('mongoose');
const schema = mongoose.Schema;

const TutorDetailschema = new schema({
    TutorName: {
        type: String,
        required: true
    },
    TutorSubjects: {
        type: [String],
        required: true
    },
    AvailableDateTimeFrom: {
        type: String,
        required: true
    },
    AvailableDateTimeTo: {
        type: String,
        required: true
    }
})
module.exports = Tutor = mongoose.model('TutorDetails', TutorDetailschema)