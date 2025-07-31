const express = require('express');
const { webhookReceiver } = require('../controllers/webhookController');
const router = express.Router();

// GET /api/students - Get all students
router.post('/webhook', webhookReceiver);

module.exports = router;
