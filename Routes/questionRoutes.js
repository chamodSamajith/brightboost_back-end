var express = require('express');
var questionRouter = express.Router();
const Question = require('../Models/Question');

// get all questions
questionRouter.get('/', async (req, res) => {
    try {
        const Questions = await Question.find();
        res.json(Questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// save questions
questionRouter.post('/', async (req, res) => {
    try {
        const { question, answer, comment, subjectId, tutorId, studentId } = req.body;

        const questionObj = new Question({ question, answer, comment, subjectId, tutorId, studentId });
        const savedQuestion = await questionObj.save();
        res.json(savedQuestion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// update questions
questionRouter.put('/:questionId', async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const { question, answer, comment, subjectId, tutorId, studentId } = req.body;

        const updatedQuestion = await Question.findByIdAndUpdate(questionId, { question, answer, comment, subjectId, tutorId, studentId }, { new: true });

        if (!updatedQuestion) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedQuestion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete questions
questionRouter.delete('/:questionId', async (req, res) => {
    try {
        const questionId = req.params.questionId;

        const deletedQuestion = await Question.findByIdAndRemove(questionId);

        if (!deletedQuestion) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(deletedQuestion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = questionRouter;
