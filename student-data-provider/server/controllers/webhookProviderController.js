const express = require('express');
const router = express.Router();

const webhook = require('../models/webhooks');
const WebhookEventLog = require('../models/webhookEventLog');

const axios = require('axios');
const crypto = require('crypto');

const { generateSignature } = require('../services/generateSignature');
const {
  encryptWebhookSecret,
  decryptWebhookSecret,
} = require('../services/webhookSecret');

// -----------------------------
// @desc    Register webhook from school app
// @route   POST /webhook/register
// @access  Public (called by school apps)
// -----------------------------
const registerWebhook = async (req, res) => {
  const { schoolId, webhookUrl, schoolName } = req.body;

  try {
    // Step 1: Validate required input fields
    if (!schoolId || !webhookUrl || !schoolName) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing fields' });
    }

    // Step 2: Generate a random 32-byte secret for HMAC signing
    const webhookSecret = crypto.randomBytes(32).toString('hex');

    // Step 3: Encrypt the secret using AES (or your method) before storing
    const encryptionKey = process.env.WEBHOOK_ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error('Encryption key missing in env');
    }
    const encryptedSecret = encryptWebhookSecret(webhookSecret, encryptionKey);

    // Step 4: Save the webhook config to DB
    const school = await webhook.create({
      schoolId,
      webhookUrl,
      schoolName,
      webhookSecret: encryptedSecret,
    });

    // Step 5: Return response, exposing the *plain* secret once
    const schoolData = school.toObject();
    delete schoolData.webhookSecret; // Don't expose encrypted version

    res.json({
      success: true,
      message: 'Webhook registered. Please store this secret securely.',
      data: {
        ...schoolData,
        webhookSecret, // Plain secret shown once only
      },
    });
  } catch (err) {
    console.error('Webhook registration failed:', err);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

// -----------------------------
// @desc    Log webhook attempt with full metadata
// @usedBy  postWithRetryAndLog()
// -----------------------------
async function logWebhookEvent({
  schoolId,
  webhookUrl,
  event,
  payload,
  status,
  attempt,
  error,
}) {
  await WebhookEventLog.create({
    schoolId,
    webhookUrl,
    event,
    payload,
    status,
    attempt,
    error,
    timestamp: new Date(),
  });
}

// -----------------------------
// @desc    Retry sending webhook with exponential backoff
// @params  payload: (required for HMAC)
// @logs    each attempt with success/failure to DB
// -----------------------------
async function postWithRetryAndLog({
  url,
  schoolId,
  event,
  payload,
  headers,
  maxRetries = 5,
}) {
  let attempt = 0;
  let success = false;
  let lastError = null;

  // Loop until maxRetries or until successful
  while (attempt < maxRetries && !success) {
    try {
      // ✅ Attempt to send the webhook POST request
      await axios.post(url, payload, { headers });
      success = true;

      // Log the successful attempt
      await logWebhookEvent({
        schoolId,
        webhookUrl: url,
        event,
        payload,
        status: 'success',
        attempt: attempt + 1,
      });

      console.log(`✅ Webhook sent to ${schoolId} on attempt ${attempt + 1}`);
    } catch (err) {
      lastError = err;
      attempt++;

      // ❌ Log the failed attempt
      await logWebhookEvent({
        schoolId,
        webhookUrl: url,
        event,
        payload,
        status: 'failed',
        attempt,
        error: err.message,
      });

      console.error(
        `❌ Failed to notify ${schoolId} (attempt ${attempt}):`,
        err.message
      );

      // ⏱ Exponential Backoff Delay:
      // We increase the delay after each failure using 2^attempt * 1000ms
      // So delays will be: 2s, 4s, 8s, 16s... up to maxRetries
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`🔁 Retrying in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // 🚨 If all attempts failed, log it for manual intervention
  if (!success) {
    console.error(
      `🚨 All ${maxRetries} attempts to notify ${schoolId} failed.`
    );
    // You can trigger alert, send Slack/email, or push to retry queue here
  }
}

// -----------------------------
// @desc    Trigger webhook for student.applied event
// @usage   Called after student submits form
// -----------------------------
const notifySchool = async (schoolId, studentData) => {
  const savedWebhook = await webhook.findOne({ schoolId });

  if (!savedWebhook) {
    console.log(`ℹ️ No webhook configured for school: ${schoolId}`);
    return;
  }

  // Step 1: Decrypt the stored secret for HMAC signature generation
  const encryptionKey = process.env.WEBHOOK_ENCRYPTION_KEY;
  const originalSecret = decryptWebhookSecret(
    savedWebhook.webhookSecret,
    encryptionKey
  );

  // Step 2: Prepare event payload
  const payload = { event: 'student.applied', data: studentData };
  const payloadString = JSON.stringify(payload);

  // Step 3: Generate HMAC signature (for verification by receiver)
  const signature = generateSignature(payloadString, originalSecret);

  // Step 4: Send webhook with retries + logging
  await postWithRetryAndLog({
    url: savedWebhook.webhookUrl,
    schoolId,
    event: 'student.applied',
    payload, // for DB logging
    headers: {
      'Content-Type': 'application/json',
      'X-Signature': signature,
    },
    maxRetries: 5,
  });
};

module.exports = {
  registerWebhook,
  notifySchool,
};
