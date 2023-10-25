var mongoose = require('mongoose');
const schema = mongoose.Schema;

const participantSchema = new schema({
    sessionId: { 
        type: schema.Types.ObjectId, 
        ref: 'Session', 
        required: true 
    },
    userId: { 
        type: schema.Types.ObjectId, 
        ref: 'Students', 
    },
    hostId: { 
        type: schema.Types.ObjectId, 
        ref: 'Tutor', 
    },
    joinTime: { 
        type: String, 
        required: true 
    },
    exitTime: String,
    participantRole: { 
        type: String, 
        enum: ['host', 'co-host', 'attendee'], 
        required: true 
    },
    otherFields: String,
    status: {
        type: Boolean,
        required: true
    }, 
  });
module.exports = Participant = mongoose.model('Participants', participantSchema)