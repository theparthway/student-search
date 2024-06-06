const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/search', async (req, res) => {
    const { name, room } = req.query;
    let students;

    if (name) {
        // Use a case-insensitive regular expression to find students with partial name match
        const nameRegex = new RegExp(name, 'i');
        students = await Student.find({ name: nameRegex });
    } else if (room) {
        // Find students by room number
        students = await Student.find({ roomNumber: room });
    } else {
        return res.status(400).json({ message: 'Name or room query parameter is required' });
    }

    if (students.length > 0) {
        res.json(students);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

router.post('/add-student', async (req, res) => {
    const { name, rollNumber, roomNumber } = req.body;
    const newStudent = new Student({ name, rollNumber, roomNumber });
    try {
        await newStudent.save();
        res.status(201).json({ message: 'Student added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding student', error });
    }
});

module.exports = router;
