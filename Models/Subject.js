const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName: String
});

const Subject = mongoose.model('subjects', subjectSchema);

module.exports = Subject;
