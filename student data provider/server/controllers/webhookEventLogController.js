const WebhookEventLog = require('../models/webhookEventLog');

// Get webhook event logs (optionally filtered by schoolId)
exports.getWebhookEvents = async (req, res) => {
  try {
    const { schoolId } = req.query;
    const query = schoolId ? { schoolId } : {};
    const events = await WebhookEventLog.find(query).sort({ timestamp: -1 });
    res.json({ success: true, data: events });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch webhook events' });
  }
};
