var mongoose = require('mongoose');
const schema = mongoose.Schema;

const sessionSchema = new schema({
    hostUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sessionName: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    maximumParticipants: {
        type: Number,
        required: true
    }
})
module.exports = Session = mongoose.model('Sessions', sessionSchema)