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
    AvailableDateTIme: {
        type: String,
        required: true
    }
})
module.exports = Tutor = mongoose.model('TutorDetails', TutorDetailschema)