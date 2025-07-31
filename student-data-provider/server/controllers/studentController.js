const student = require('../models/student');
const { notifySchool } = require('./webhookProviderController');

// Get all students with pagination
exports.getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const students = await student.find().skip(skip).limit(limit);
    const total = await student.countDocuments();

    res.json({
      success: true,
      data: students,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const newStudent = new student(req.body);
    const savedStudent = await newStudent.save();

    // Notify the school via webhook after student is created
    if (savedStudent.schoolId) {
      notifySchool(savedStudent.schoolId, savedStudent);
    }
    res.status(201).json({ success: true, data: savedStudent });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res
        .status(404)
        .json({ success: false, error: 'Student not found' });
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
