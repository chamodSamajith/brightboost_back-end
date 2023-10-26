var express = require('express');
var subjectRouter = express.Router();
const Subject = require('../Models/Subject');

// get all subjects
subjectRouter.get('/', async (req, res) => {
    try {
        const Subjects = await Subject.find();
        res.json(Subjects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// save subjects
subjectRouter.post('/', async (req, res) => {
    try {
        const { subjectName } = req.body;

        const subjectObj = new Subject({ subjectName });
        const savedSubject = await subjectObj.save();
        res.json(savedSubject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// update subjects
subjectRouter.put('/:subjectId', async (req, res) => {
    try {
        const subjectId = req.params.subjectId;
        const { subjectName } = req.body;

        const updatedSubject = await Subject.findByIdAndUpdate(subjectId, { subjectName }, { new: true });

        if (!updatedSubject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.json(updatedSubject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete subjects
subjectRouter.delete('/:subjectId', async (req, res) => {
    try {
        const subjectId = req.params.subjectId;

        const deletedSubject = await Subject.findByIdAndRemove(subjectId);

        if (!deletedSubject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.json(deletedSubject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = subjectRouter;
