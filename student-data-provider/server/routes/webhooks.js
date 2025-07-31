const express = require('express');
const router = express.Router();

const webhookProviderController = require('../controllers/webhookProviderController');

router.post('/registerWebhook', webhookProviderController.registerWebhook);

module.exports = router;
