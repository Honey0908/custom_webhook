const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController.js');

router.get('/students', studentController.getAllStudents);
router.post('/students', studentController.createStudent);
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
