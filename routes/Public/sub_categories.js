const express = require('express');
const router = express.Router();
const sub_categories_controller = require('../../Controllers/sub_categories_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.get('/api/public/categories/sub/',sub_categories_controller.getSubCategories);
router.get('/api/public/category/sub/:sub_cat_id',sub_categories_controller.getSubCategory);

module.exports = router;