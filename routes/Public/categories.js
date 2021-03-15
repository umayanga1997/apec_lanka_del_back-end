const express = require('express');
const router = express.Router();
const categories_controller = require('../../Controllers/categories_controller');

router.get('/api/public/categories/', categories_controller.getCategories);
router.get('/api/public/category/:cat_id', categories_controller.getCategory);
router.post('/api/public/category/', categories_controller.postCategory);
router.put('/api/public/category/:cat_id', categories_controller.putCategory);

module.exports = router;