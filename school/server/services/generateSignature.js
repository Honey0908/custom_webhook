const crypto = require('crypto');

/**
 * Generates an HMAC SHA256 signature for a given payload and secret.
 * @param {string} payload - The stringified payload to sign.
 * @param {string} secret - The secret key to use for HMAC.
 * @returns {string} The hex-encoded signature.
 */
function generateSignature(payload, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  return hmac.digest('hex');
}

module.exports = { generateSignature };
