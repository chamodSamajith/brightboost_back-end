const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    comment: String,
    subjectId: String,
    tutorId: String,
    studentId: String,
    sessionId: String,
    status:String
});

module.exports = Question = mongoose.model('question', questionSchema)