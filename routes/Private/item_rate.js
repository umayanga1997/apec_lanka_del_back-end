const express = require('express');
const router = express.Router();
const item_rate_controller = require('../../Controllers/item_rate_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.post('/api/public/item/rate/',userVerify, item_rate_controller.postRate);
router.delete('/api/public/item/rate/',userVerify, item_rate_controller.deleteRate);

module.exports = router;