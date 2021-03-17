const express = require('express');
const router = express.Router();
const items_controller = require('../../Controllers/items_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.post('/api/public/item/',userVerify, items_controller.postItem);
router.put('/api/public/item/:item_id',userVerify, items_controller.putItem);
router.delete('/api/public/item/:item_id',userVerify, items_controller.deleteItem);

module.exports = router;