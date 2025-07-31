const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/studentController');

// GET /api/students - Get all students
router.get('/students', getAllStudents);

module.exports = router;
