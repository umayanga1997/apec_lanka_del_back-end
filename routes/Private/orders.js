const express = require('express');
const router = express.Router();
const orders_controller = require('../../Controllers/orders_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');
const mobileVerify = require('../../Controllers/Tokens/userMobileVerifyToken');

router.get('/api/v1/details/any/orders/',userVerify, orders_controller.getOrders);
router.get('/api/v1/details/any/order/:or_id',userVerify, orders_controller.getOrderByID);
router.get('/api/v1/details/user/orders/',userVerify, orders_controller.getOrdersByUserID);
router.post('/api/v1/details/any/order/',userVerify,mobileVerify, orders_controller.postOrder);
router.put('/api/v1/details/any/order/:or_id',userVerify,mobileVerify, orders_controller.putOrder);
router.put('/api/v1/details/any/order/items/rates/:order_id',userVerify,mobileVerify, orders_controller.putOrderItemsRates);

module.exports = router;