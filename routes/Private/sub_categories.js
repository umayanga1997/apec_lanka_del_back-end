const express = require('express');
const router = express.Router();
const sub_categories_controller = require('../../Controllers/sub_categories_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.post('/api/public/category/sub/', userVerify,sub_categories_controller.postSubCategory);
router.put('/api/public/category/sub/:sub_cat_id',userVerify,sub_categories_controller.putSubCategory);
router.delete('/api/public/category/sub/:sub_cat_id',userVerify,sub_categories_controller.deleteSubCategory);

module.exports = router;