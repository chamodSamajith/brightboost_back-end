var express = require('express');
var questionRouter = express.Router();
const Question = require('../Models/Question');
const Subject = require('../Models/Subject')

// Get questions count by subject
questionRouter.get('/questions-count-by-subject', async (req, res) => {
    try {
        const subjects = await Subject.find({});

        const questionsCountBySubject = await Promise.all(
            subjects.map(async (subject) => {
                const count = await Question.countDocuments({ subjectId: subject._id });
                return {
                    subjectName: subject.subjectName,
                    questionCount: count,
                };
            })
        );

        res.json(questionsCountBySubject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

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

// Update the route to get questions by email
questionRouter.get('/:email', async (req, res) => {
    const { email } = req.params; // Get the email parameter from the URL
  
    try {
      // Find questions that match the email
      const questions = await Question.find({ studentId: email });
  
      if (questions.length === 0) {
        // If no questions match the email, return a 404 status
        return res.status(404).json({ message: 'No questions found for the specified email.' });
      }
  
      // If questions are found, return them as JSON
      res.json({ questions, email: email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// save questions
questionRouter.post('/create', async (req, res) => {
    try {
        // const { question, subjectId, tutorId, studentId, sessionId } = req.body;

        const que = new Question({
            question: req.body.question,
            subjectId: req.body.subjectId,
            tutorId: req.body.tutorId,
            studentId: req.body.studentId,
            sessionId: req.body.sessionId,
            answer:req.body.answer,
            status:req.body.status
        })
        
        que.save().then(tut => {
            try {
                res.status(200).send({
                    message: 'Questtion created successfully !',
                    data: tut,
                    messageCode : 1000
                })
    
            } catch (err) {
                res.status(502).send({
                    message: 'OOPS ! server error',
                    error: err
                })
            }
    
        })
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// update questions
questionRouter.put('/:questionId', async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const {  answer, comment, subjectId, tutorId, studentId, sessionId } = req.body;

        const updatedQuestion = await Question.findByIdAndUpdate(questionId, { answer }, { new: true });

        if (!updatedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
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
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json(deletedQuestion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = questionRouter;
