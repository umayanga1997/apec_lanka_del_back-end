const express = require('express');
const router = express.Router();
const sub_categories_controller = require('../../Controllers/sub_categories_controller');

router.get('/api/public/categories/sub/',sub_categories_controller.getSubCategories);
router.get('/api/public/category/sub/:sub_cat_id',sub_categories_controller.getSubCategory);
router.post('/api/public/category/sub/', sub_categories_controller.postSubCategory);
router.put('/api/public/category/sub/:sub_cat_id',sub_categories_controller.putSubCategory);

module.exports = router;