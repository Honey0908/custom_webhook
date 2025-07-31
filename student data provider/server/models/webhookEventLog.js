const mongoose = require('mongoose');

const WebhookEventLogSchema = new mongoose.Schema({
  schoolId: { type: String, required: true },
  webhookUrl: { type: String, required: true },
  event: { type: String, required: true },
  payload: { type: mongoose.Schema.Types.Mixed, required: true },
  status: { type: String, enum: ['success', 'failed'], required: true },
  attempt: { type: Number, required: true },
  error: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WebhookEventLog', WebhookEventLogSchema);
