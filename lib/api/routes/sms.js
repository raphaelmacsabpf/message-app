const express = require('express');
const router = express.Router();
const smsController = require('../controllers/sms');

router.post('/', smsController.post.bind(smsController));

module.exports = router;