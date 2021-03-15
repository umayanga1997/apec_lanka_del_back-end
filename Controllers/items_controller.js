const {
    pool
} = require('../Config/db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const rateControle = require('../Controllers/item_rate_controller');
const algoliaController = require('../Controllers/algolia');

const getItems = async function (req, res, next) {
              res.json({
                done: false,
                message: "Has some issue(s) with status, Try again.",
                data: []
            })
    // const response = await pool.query("select  items.* , CAST(avg(CASE when ir.rate_value != 0 then  ir.rate_value else 0 end) as decimal(2,1)) as rate from items full outer join  item_rates ir on items.item_id = ir.item_id group by items.item_count");
   
    // try {
    //     if (res.status(200)) {
    //         if (response.rowCount != 0 && response.rowCount != null) {
    //             await algoliaController.pushItemsToAlgolia("all_Cities");
    //             res.json({
    //                 done: true,
    //                 message: "Done",
    //                 data: response.rows,
    //             })
    //         } else {
    //             res.json({
    //                 done: true,
    //                 message: "Data not found.",
    //                 data: [],
    //             })
    //         }

    //     } else {
    //         res.json({
    //             done: false,
    //             message: "Has some issue(s) with status, Try again.",
    //             data: []
    //         })
    //     }
    // } catch (error) {
    //     res.json({
    //         done: false,
    //         message: "Has some issue(s) with another, Try again.",
    //         data: [],
    //     });
    // }
}

const getItemByItemID = async function (req, res, next) {
    const itemId = req.params.item_id;
    const response = await pool.query("select  items.* , CAST(avg(CASE when ir.rate_value != 0 then  ir.rate_value else 0 end) as decimal(2,1)) as rate from items full outer join  item_rates ir on items.item_id = ir.item_id where items.item_id=$1 group by items.item_count;", [itemId]);

    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                await algoliaController.pushItemsToAlgolia("all_Cities");
                res.json({
                    done: true,
                    message: "Done",
                    data: response.rows,
                })
            } else {
                res.json({
                    done: true,
                    message: "Data not found.",
                    data: [],
                })
            }

        } else {
            res.json({
                done: false,
                message: "Has some issue(s) with status, Try again.",
                data: []
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
            data: [],
        });
    }
}

const getItemBySubCatID = async function (req, res, next) {

    const subCatID = req.params.subCatId;
    const response = await pool.query("select  items.* , CAST(avg(CASE when ir.rate_value != 0 then  ir.rate_value else 0 end) as decimal(2,1)) as rate from items full outer join  item_rates ir on items.item_id = ir.item_id where items.sub_category_id =$1 group by items.item_count;", [subCatID]);

    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                await algoliaController.pushItemsToAlgolia("all_Cities");
                res.json({
                    done: true,
                    message: "Done",
                    data: response.rows,
                })
            } else {
                res.json({
                    done: true,
                    message: "Data not found.",
                    data: [],
                })
            }

        } else {
            res.json({
                done: false,
                message: "Has some issue(s) with status, Try again.",
                data: []
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
            data: [],
        });
    }
}
const getItemBySubCatIDWithCity = async function(req, res, next){
    
    const city = req.params.city;
    const subCatID = req.params.subCatId;
    const response = await pool.query("select  items.* , CAST(avg(CASE when ir.rate_value != 0 then  ir.rate_value else 0 end) as decimal(2,1)) as rate from items full outer join  item_rates ir on items.item_id = ir.item_id where items.sub_category_id =$1 and items.partner_id in (select partner_id from partners_locations where city=$2) group by items.item_count;", [subCatID, city]);

    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                await algoliaController.pushItemsToAlgolia(city);
                res.json({
                    done: true,
                    message: "Done",
                    data: response.rows,
                })
            } else {
                res.json({
                    done: true,
                    message: "Data not found.",
                    data: [],
                })
            }

        } else {
            res.json({
                done: false,
                message: "Has some issue(s) with status, Try again.",
                data: []
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
            data: [],
        });
    }
} 
const getItemsByCity =async  function(req, res, next){
    const city = req.params.city;
    const response = await pool.query("select  items.* , CAST(avg(CASE when ir.rate_value != 0 then  ir.rate_value else 0 end) as decimal(2,1)) as rate from items full outer join  item_rates ir on items.item_id = ir.item_id where items.partner_id in (select partner_id from partners_locations where city=$2) group by items.item_count;", [city]);

    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                res.json({
                    done: true,
                    message: "Done",
                    data: response.rows,
                })
            } else {
                res.json({
                    done: true,
                    message: "Data not found.",
                    data: [],
                })
            }

        } else {
            res.json({
                done: false,
                message: "Has some issue(s) with status, Try again.",
                data: []
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
            data: [],
        });
    }
}
const postItem = async function (req, res, nect) {
    const itemName = req.body.item_name;
    const unitQty = req.body.unit_qty;
    const unit = req.body.unit;
    const priceBuy = req.body.price_buy;
    const priceSale = req.body.price_sale;
    const priceSaleWithDiscount = req.body.price_sale_with_discount;
    const maxQty = req.body.max_qty;
    const partnerId = req.body.partner_id;
    const partnerName = req.body.partner_name;
    const imageUrl = req.body.image_url;
    const description = req.body.description;
    const packageSize = req.body.package_size;

    const response = await pool.query("INSERT INTO items(item_id,item_name, unit_qty, unit, price_buy, price_sale,price_sale_with_discount, max_qty, partner_id, partner_name, image_url, description, package_size) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11, $12,$13)",
        [uuidv4(), itemName, unitQty, unit, priceBuy, priceSale, priceSaleWithDiscount, maxQty, partnerId, partnerName, imageUrl, description, packageSize]);

    try {
        if (res.status(200)) {
            
            res.json({
                done: true,
                message: "Data Inserted successfully",
            })
        } else {
            res.json({
                done: false,
                message: "Has some issue(s) with status, Try again.",
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
        });
    }
}
const putItem = async function (req, res, next) {
    const itemId = req.params.item_id;
    const itemName = req.body.item_name;
    const unitQty = req.body.unit_qty;
    const unit = req.body.unit;
    const priceBuy = req.body.price_buy;
    const priceSale = req.body.price_sale;
    const priceSaleWithDiscount = req.body.price_sale_with_discount;
    const maxQty = req.body.max_qty;
    const partnerId = req.body.partner_id;
    const partnerName = req.body.partner_name;
    const imageUrl = req.body.image_url;
    const description = req.body.description;
    const packageSize = req.body.package_size;

    const response = await pool.query("UPDATE items SET item_name =$1, unit_qty=$2, unit=$3, price_buy=$4, price_sale=$5,price_sale_with_discount=$6, max_qty=$7, partner_id=$8, partner_name=$9, image_url=$10 ,description=$11, package_size=$12 WHERE item_id=$13",
        [itemName, unitQty, unit, priceBuy, priceSale, priceSaleWithDiscount, maxQty, partnerId, partnerName, imageUrl,description, packageSize, itemId]);

    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                res.json({
                    done: true,
                    message: "Data Updated successfully",
                })
            } else {
                res.json({
                    done: true,
                    message: "Data not found to update.",
                   
                })
            }
        } else {
            res.json({
                done: false,
                message: "Has some issue(s) with status, Try again.",
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
        });
    }
}
module.exports = {
    getItems,
    getItemByItemID,
    getItemBySubCatID,
    getItemBySubCatIDWithCity,
    getItemsByCity,
    postItem,
    putItem,
}