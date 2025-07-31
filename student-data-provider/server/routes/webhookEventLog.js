const express = require('express');
const router = express.Router();
const {
  getWebhookEvents,
} = require('../controllers/webhookEventLogController');

// GET /api/webhook-events?schoolId=xxx
router.get('/webhook-events', getWebhookEvents);

module.exports = router;
