const AchieversStudent = require('../models/student');

// GET all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await AchieversStudent.find();
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
