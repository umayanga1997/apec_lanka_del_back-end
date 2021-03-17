const express = require('express');
const router = express.Router();
const categories_controller = require('../../Controllers/categories_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.post('/api/public/category/',userVerify, categories_controller.postCategory);
router.put('/api/public/category/:cat_id',userVerify, categories_controller.putCategory);
router.delete('/api/public/category/:cat_id',userVerify, categories_controller.deleteCategory);

module.exports = router;