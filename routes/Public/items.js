const express = require('express');
const router = express.Router();
const items_controller = require('../../Controllers/items_controller');

router.get('/api/public/items/', items_controller.getItems);
router.get('/api/public/item/:item_id', items_controller.getItemByItemID);
router.get('/api/public/items/sub/:subCatId', items_controller.getItemBySubCatID);
router.get('/api/public/items/sub/:subCatId/:city', items_controller.getItemBySubCatIDWithCity)
router.get('/api/public/items/:city', items_controller.getItemsByCity);
router.post('/api/public/item/', items_controller.postItem);
router.put('/api/public/item/:item_id', items_controller.putItem);

module.exports = router;