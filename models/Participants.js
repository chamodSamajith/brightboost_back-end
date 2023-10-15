var mongoose = require('mongoose');
const schema = mongoose.Schema;

const participantSchema = new Schema({
    sessionId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Session', 
        required: true 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
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
    otherFields: String 
  });
module.exports = Participant = mongoose.model('Participants', participantSchema)