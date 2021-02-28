const express = require('express');
const router = express.Router();
const sub_categories_controller = require('../../Controllers/sub_categories_controller');

router.get('/categories/sub/',sub_categories_controller.getSubCategories);
router.get('/category/sub/:sub_cat_id',sub_categories_controller.getSubCategory);
router.post('/category/sub/', sub_categories_controller.postSubCategory);
router.put('/category/sub/:sub_cat_id',sub_categories_controller.putSubCategory);

module.exports = router;