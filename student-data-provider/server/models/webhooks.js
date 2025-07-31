const mongoose = require('mongoose');

const WebhookSchema = new mongoose.Schema({
  schoolId: { type: String, required: true, unique: true },
  webhookUrl: { type: String, required: true },
  schoolName: { type: String, required: true },
  schoolAddress: { type: String },
  webhookSecret: { type: String, required: true },
});

module.exports = mongoose.model('Webhook', WebhookSchema);
