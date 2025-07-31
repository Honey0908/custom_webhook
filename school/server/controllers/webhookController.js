const crypto = require('crypto');
const AchieversStudent = require('../models/student');
const { generateSignature } = require('../services/generateSignature');
require('dotenv').config();

// Set your webhook secret here (should be stored securely per school)
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

exports.webhookReceiver = async (req, res) => {
  const signature = req.headers['x-signature'];
  const payloadString = JSON.stringify(req.body);
  // Verify HMAC signature
  const expectedSig = generateSignature(payloadString, WEBHOOK_SECRET);

  if (signature !== expectedSig) {
    return res.status(401).send({ error: 'Invalid signature' });
  }

  // Process event
  const { event, data } = req.body;
  if (event === 'student.applied') {
    const newStudent = new AchieversStudent(data);
    const savedStudent = await newStudent.save();
    if (!savedStudent) {
      return res.status(500).send('Failed to save student data');
    }
    return res.status(200).send('Webhook received');
  }
  res.status(400).send('Unknown event');
};
