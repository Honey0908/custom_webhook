const CryptoJS = require('crypto-js');

/**
 * Encrypts a webhook secret using AES and the provided encryption key.
 * @param {string} secret - The webhook secret to encrypt.
 * @param {string} encryptionKey - The key to use for encryption.
 * @returns {string} The encrypted secret (base64 string).
 */
function encryptWebhookSecret(secret, encryptionKey) {
  return CryptoJS.AES.encrypt(secret, encryptionKey).toString();
}

/**
 * Decrypts an encrypted webhook secret using AES and the provided encryption key.
 * @param {string} encryptedSecret - The encrypted secret (base64 string).
 * @param {string} encryptionKey - The key to use for decryption.
 * @returns {string} The original webhook secret.
 */
function decryptWebhookSecret(encryptedSecret, encryptionKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedSecret, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encryptWebhookSecret,
  decryptWebhookSecret,
};
