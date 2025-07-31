const webhook = require('../models/webhooks');

// Get all schools
exports.getAllSchools = async (req, res) => {
  try {
    const schools = (await webhook.find()).map((school) => ({
      schoolId: school.schoolId,
      name: school.schoolName,
    }));
    res.json({
      success: true,
      data: schools,
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
