const express = require('express');
const router = express.Router();

const item_rate_controller = require('../../Controllers/item_rate_controller');

router.get('/api/public/item/rate/:item_id', item_rate_controller.getRate);
router.post('/api/public/item/rate/', item_rate_controller.postRate);

module.exports = router;