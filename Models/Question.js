const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    comment: String,
    subjectId: String,
    tutorId: String,
    studentId: String,
});

const Question = mongoose.model('questions', questionSchema);

module.exports = Question;
