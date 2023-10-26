var express = require('express')
var router = express.Router();
const Session = require('../Models/Session')
const Participant = require('../Models/Participants')
const SessionDetails = require('../Models/sessionDetails')
//create Session

router.post('/create', (req, res) => {

    const session = new Session({
        hostUserId: req.body.userId,
        sessionName: req.body.sessionName,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        status: req.body.status,
        maximumParticipants: req.body.maximumParticipants,
        sessionSubject:req.body.subject,
    })
    session.save().then(stu => {
        try {
            createLogs(stu._id,"CREATE",new Date(),"session created by "+req.body.userId)
            res.status(200).send({
                message: 'Session created successfully !',
                data: stu,
                status:200
            })

        } catch (err) {
            res.status(502).send({
                message: 'OOPS ! server error',
                error: err,
                status:201
            })
        }

    })
})


router.get('/all',(req,res)=>{
    Session.find({}, (err, sessions) => {
        if (err) {
            res.status(502).send({
                message: 'OOPS! Server error',
                error: err,
                status:201
            });
        } else {
            res.status(200).send({
                status: 200,
                message: 'Success',
                data:sessions
            });
        }
    });
    
})

router.get('/getbyid/:sessionId', (req, res) => {

    const sessionIdToSearch = req.params.sessionId; // Replace with the actual session ID

    Session.findById(sessionIdToSearch)
        .populate('hostUserId') // Populate the 'hostUserId' reference with tutor data
        .exec((err, session) => {
            if (err) {
                console.error(err);
                // Handle the error, e.g., return an error response
            } else {
                if (session) {
                    // Session found with associated tutor data

                    console.log(session);
                    res.status(200).send({
                        status:200,
                        message: 'success',
                        data: session
                    })

        
                    // Access the associated tutor data via session.hostUserId
                } else {
                    // Session not found
                    console.log('Session not found');
                    res.status(500).send()
                    // Handle the case where the session doesn't exist
                }
            }
        });
})


router.get('/getparticipantcount/:sessionId', (req, res) => {

    const sessionIdToSearch = req.params.sessionId; // Replace with the actual session ID

    Participant.countDocuments({ sessionId: sessionIdToSearch, status: true }, (err, count) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error counting active participants');
        } else {
          // Check if the host has joined by searching for a document with hostId not null
          Participant.findOne({ sessionId: sessionIdToSearch, participantRole: 'host' }, (err, hostParticipant) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error finding host participant');
            } else {
              const isHostJoined = !!hostParticipant; // Will be true if a host participant is found
      
              res.send({ count, isHostJoined,  status:200,
                message: 'success', });
            }
          });
        }
      });
})


router.post('/enroll', (req, res) => {
    const userId = req.body.userId;
    const hostId = req.body.hostId;
    const sessionId = req.body.sessionID;
    // Find all participants with the given userId or hostId
    Participant.updateMany({ $or: [{ userId }, { hostId }],sessionId  }, { status: false }, (err, result) => {
        if (err) {
            // Handle any database error here
            res.status(502).send({
                message: 'OOPS! Server error',
                error: err
            });
        } else {
            // Create a new participant
            const participant = new Participant({
                sessionId: req.body.sessionID,
                userId,
                hostId,
                joinTime: req.body.joinTime,
                status: req.body.status, // You can set this to 'true' if needed
                participantRole: req.body.participantRole
            });
    
            participant.save()
                .then(newParticipant => {
                    createLogs(req.body.sessionID,"ENROLLED",new Date(),userId?"new student enrolled "+userId:'new host enrolled '+hostId)

                    res.status(200).send({
                        status: 200,
                        message: 'Success',
                        data: newParticipant
                    });
                })
                .catch(error => {
                    res.status(502).send({
                        message: 'OOPS! Server error',
                        error
                    });
                });
        }
    });
    
})


router.put('/leave', (req, res) => {
    const userId = req.body.userId;
    const hostId = req.body.hostId;
    const sessionId = req.body.sessionID;
    Participant.updateMany({ $or: [{ userId }, { hostId }],sessionId }, { status: false, exitTime:req.body.exttimestamp }, (err, result) => {
        if (err) {
            // Handle any database error here
            res.status(502).send({
                message: 'OOPS! Server error',
                error: err,
                status:201
            });
        } else {
            createLogs(req.body.sessionID,"LEFT",new Date(),userId?"student left session "+userId:'host left session '+hostId)

            res.status(200).send({
                status: 200,
                message: 'Success',
            });

        }

    })
})



router.get('/session-details/:sessionId', (req, res) => {

    const sessionIdToSearch = req.params.sessionId; // Replace with the actual session ID

    SessionDetails.find({sessionId:sessionIdToSearch})
        .exec((err, session) => {
            if (err) {
                console.error(err);
                // Handle the error, e.g., return an error response
            } else {
                if (session) {
                    // Session found with associated tutor data

                    console.log(session);
                    res.status(200).send({
                        status:200,
                        message: 'success',
                        data: session
                    })

        
                    // Access the associated tutor data via session.hostUserId
                } else {
                    // Session not found
                    console.log('Session not found');
                    res.status(500).send()
                    // Handle the case where the session doesn't exist
                }
            }
        });
})


router.get('/session-attendance/:sessionId', (req, res) => {

    const sessionIdToSearch = req.params.sessionId; 

    getUniqueParticipantCount(sessionIdToSearch, (err, count, participants) => {
        if (err) {
            res.status(502).send({
                message: 'OOPS! Server error',
                error: err,
                status:201
            });
        } else {
            res.status(200).send({
                status: 200,
                message: 'Success',
                data: participants,
                count:count
            });
        }
    });
})

const createLogs=(id,event,time,eventdata)=>{

    const sessionDetails = new SessionDetails({
        sessionId: id,
        eventType: event,
        timestamp: time,
        eventData: eventdata,
    })
    sessionDetails.save().then(stu => {
        try {
            return true
        } catch (err) {
         return false
        }

    })
}

const getUniqueParticipantCount=(sessionId, callback)=> {
    Participant.find({ sessionId }, (err, participants) => {
        if (err) {
            return callback(err);
        }
        
        const uniqueParticipantsMap = new Map();
        
        participants.forEach(participant => {
            if (participant.userId) {
                uniqueParticipantsMap.set(participant.userId.toString(), {
                    userId: participant.userId,
                    participantRole: participant.participantRole,
                });
            }
            
            if (participant.hostId) {
                uniqueParticipantsMap.set(participant.hostId.toString(), {
                    hostId: participant.hostId,
                    participantRole: participant.participantRole,
                });
            }
        });
        
        const uniqueParticipants = Array.from(uniqueParticipantsMap.values());
        const count = uniqueParticipants.length;
        
        return callback(null, count, uniqueParticipants);
    });
}



module.exports = router;