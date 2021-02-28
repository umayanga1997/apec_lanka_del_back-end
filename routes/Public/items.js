const express = require('express');
const router = express.Router();
const items_controller = require('../../Controllers/items_controller');

router.get('/items/', items_controller.getItems);
router.get('/item/:item_id', items_controller.getItemByItemID);
router.get('/items/sub/:subCatId', items_controller.getItemBySubCatID);
router.get('/items/sub/:subCatId/:city', items_controller.getItemBySubCatIDWithCity)
router.get('/items/:city', items_controller.getItemsByCity);
router.post('/item/', items_controller.postItem);
router.put('/item/:item_id', items_controller.putItem);

module.exports = router;