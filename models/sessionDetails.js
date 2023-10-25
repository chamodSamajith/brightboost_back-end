var mongoose = require('mongoose');
const schema = mongoose.Schema;

const sessionDetailSchema = new schema({
    sessionId: { 
        type: schema.Types.ObjectId, 
        ref: 'Session', 
        required: true 
    },
    eventType: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: String, 
        required: true 
    },
    eventData: String, // You can adjust the type based on event data format
    otherFields: String // Add more fields as necessary
  });
module.exports = SessionDetail  = mongoose.model('SessionDetails', sessionDetailSchema)