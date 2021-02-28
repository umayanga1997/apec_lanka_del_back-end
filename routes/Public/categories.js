const express = require('express');
const router = express.Router();
const categories_controller = require('../../Controllers/categories_controller');

router.get('/categories/', categories_controller.getCategories);
router.get('/category/:cat_id', categories_controller.getCategory);
router.post('/category/', categories_controller.postCategory);
router.put('/category/:cat_id', categories_controller.putCategory);

module.exports = router;