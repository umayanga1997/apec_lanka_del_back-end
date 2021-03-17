const express = require('express');
const router = express.Router();
const categories_controller = require('../../Controllers/categories_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.get('/api/public/categories/', categories_controller.getCategories);
router.get('/api/public/category/:cat_id', categories_controller.getCategory);

module.exports = router;