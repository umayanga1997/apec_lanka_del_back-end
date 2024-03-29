const express = require('express');
const router = express.Router();
const item_rate_controller = require('../../Controllers/item_rate_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.get('/api/public/item/rate/:item_id', item_rate_controller.getRate);

module.exports = router;