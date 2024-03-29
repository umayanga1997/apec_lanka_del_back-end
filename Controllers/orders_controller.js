const {
    pool
} = require('../Config/db');
const {
    v4: uuidv4
} = require('uuid');
var dateFormat = require("dateformat");
const {
    postRate
} = require('./item_rate_controller');
const date = require('date-and-time');

const getOrders = async function (req, res, next) {
    var orders = [];
    // const userId = req.userVerify._id;
    const responseOrder = await pool.query("SELECT * FROM orders order by order_count desc");

    try {
        if (res.status(200)) {
            if (responseOrder.rowCount != 0 && responseOrder.rowCount != null) {

                let promise = new Promise(async (resolve, reject) => {

                    for (const count in responseOrder.rows) {
                        var items = [];
                        const orderID = responseOrder.rows[count]['order_id'];
                        const responseItem = await pool.query("SELECT * FROM ordered_items WHERE order_id=$1", [orderID]);
                        if (res.status(200)) {
                            if (responseItem.rowCount != 0 && responseItem.rowCount != null) {
                                for (const countItem in responseItem.rows) {
                                    items.push(responseItem.rows[countItem]);
                                }
                                orders.push({
                                    order_no: responseOrder.rows[count]['order_count'],
                                    order_id: orderID,
                                    user_id: responseOrder.rows[count]['user_id'],
                                    user_mobile: responseOrder.rows[count]['user_mobile'],
                                    payment_method: responseOrder.rows[count]['payment_method'],
                                    delivery_address_lat: responseOrder.rows[count]['delivery_address_lat'],
                                    delivery_address_lng: responseOrder.rows[count]['delivery_address_lng'],
                                    delivery_address: responseOrder.rows[count]['delivery_address'],
                                    sub_total: responseOrder.rows[count]['sub_total'],
                                    delivery_fee: responseOrder.rows[count]['delivery_fee'],
                                    conv_fee: responseOrder.rows[count]['conv_fee'],
                                    service_charge: responseOrder.rows[count]['service_charge'],
                                    discount: responseOrder.rows[count]['discount'],
                                    net_total: responseOrder.rows[count]['net_total'],
                                    order_placed_date_time: responseOrder.rows[count]['order_placed_date_time'],
                                    schedule_date: responseOrder.rows[count]['schedule_date'],
                                    status: responseOrder.rows[count]['status'],
                                    items: items,
                                }, );

                            }
                            // else {
                            //     reject({
                            //         done: false,
                            //         message: `No items found in ${orderID}`,
                            //     });
                            // }
                        } else {
                            reject({
                                done: false,
                                message: "Has some issue(s) with status, Try again.",
                            });
                        }

                    }
                    resolve('Done');
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Fetched Successfully.",
                        data: orders
                    });
                }).catch((error) => {
                    res.json(error);
                });

            } else {
                res.json({
                    done: false,
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
const getOrderByID = async function (req, res, next) {
    // const userId = req.userVerify._id;
    const orderID = req.params.or_id;
    var orders = [];
    // const userId = req.userVerify._id;
    const responseOrder = await pool.query("SELECT * FROM orders WHERE order_id= $1 order by order_count desc", [orderID]);

    try {
        if (res.status(200)) {
            if (responseOrder.rowCount != 0 && responseOrder.rowCount != null) {
                let promise = new Promise(async (resolve, reject) => {
                    for (const count in responseOrder.rows) {
                        var items = [];
                        const orderID = responseOrder.rows[count]['order_id'];
                        const responseItem = await pool.query("SELECT * FROM ordered_items WHERE order_id=$1", [orderID]);
                        if (res.status(200)) {
                            if (responseItem.rowCount != 0 && responseItem.rowCount != null) {
                                for (const countItem in responseItem.rows) {
                                    items.push(responseItem.rows[countItem]);
                                }
                                orders.push({
                                    order_no: responseOrder.rows[count]['order_count'],
                                    order_id: orderID,
                                    user_id: responseOrder.rows[count]['user_id'],
                                    user_mobile: responseOrder.rows[count]['user_mobile'],
                                    payment_method: responseOrder.rows[count]['payment_method'],
                                    delivery_address_lat: responseOrder.rows[count]['delivery_address_lat'],
                                    delivery_address_lng: responseOrder.rows[count]['delivery_address_lng'],
                                    delivery_address: responseOrder.rows[count]['delivery_address'],
                                    sub_total: responseOrder.rows[count]['sub_total'],
                                    delivery_fee: responseOrder.rows[count]['delivery_fee'],
                                    conv_fee: responseOrder.rows[count]['conv_fee'],
                                    service_charge: responseOrder.rows[count]['service_charge'],
                                    discount: responseOrder.rows[count]['discount'],
                                    net_total: responseOrder.rows[count]['net_total'],
                                    order_placed_date_time: responseOrder.rows[count]['order_placed_date_time'],
                                    schedule_date: responseOrder.rows[count]['schedule_date'],
                                    status: responseOrder.rows[count]['status'],
                                    items: items,
                                }, )

                            }
                            // else {
                            //     reject({
                            //         done: false,
                            //         message: `No items found in ${orderID}`,
                            //     });
                            // }
                        } else {
                            reject({
                                done: false,
                                message: "Has some issue(s) with status, Try again.",
                            });
                        }

                    }
                    resolve("Done");
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Fetched Successfully.",
                        data: orders
                    });
                }).catch((error) => {
                    res.json(error);
                });
            } else {
                res.json({
                    done: false,
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
const getOrdersByUserID = async function (req, res, next) {
    const userId = req.userVerify._id.user_id;

    var orders = [];
    // const userId = req.userVerify._id;
    const responseOrder = await pool.query("SELECT * FROM orders WHERE user_id= $1 order by order_count desc", [userId]);

    try {

        if (res.status(200)) {
            if (responseOrder.rowCount != 0 && responseOrder.rowCount != null) {
                let promise = new Promise(async (resolve, reject) => {
                    for (var count in responseOrder.rows) {
                        var items = [];
                        const orderID = responseOrder.rows[count]['order_id'];
                        const responseItem = await pool.query("SELECT * FROM ordered_items WHERE order_id=$1", [orderID]);
                        if (res.status(200)) {
                            if (responseItem.rowCount != 0 && responseItem.rowCount != null) {
                                for (var countItem in responseItem.rows) {
                                    items.push(responseItem.rows[countItem]);
                                }
                                orders.push({
                                    order_no: responseOrder.rows[count]['order_count'],
                                    order_id: orderID,
                                    user_id: responseOrder.rows[count]['user_id'],
                                    user_mobile: responseOrder.rows[count]['user_mobile'],
                                    payment_method: responseOrder.rows[count]['payment_method'],
                                    delivery_address_lat: responseOrder.rows[count]['delivery_address_lat'],
                                    delivery_address_lng: responseOrder.rows[count]['delivery_address_lng'],
                                    delivery_address: responseOrder.rows[count]['delivery_address'],
                                    sub_total: responseOrder.rows[count]['sub_total'],
                                    delivery_fee: responseOrder.rows[count]['delivery_fee'],
                                    conv_fee: responseOrder.rows[count]['conv_fee'],
                                    service_charge: responseOrder.rows[count]['service_charge'],
                                    discount: responseOrder.rows[count]['discount'],
                                    net_total: responseOrder.rows[count]['net_total'],
                                    order_placed_date_time: responseOrder.rows[count]['order_placed_date_time'],
                                    schedule_date: responseOrder.rows[count]['schedule_date'],
                                    status: responseOrder.rows[count]['status'],
                                    items: items,
                                }, );

                            }
                            // else {
                            //     reject({
                            //         done: false,
                            //         message: `No items found in ${orderID}`,
                            //     });
                            // }
                        } else {
                            reject({
                                done: false,
                                message: "Has some issue(s) with status, Try again.",
                            });
                        }
                    }
                    resolve("Done");
                })

                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Fetched Successfully.",
                        data: orders
                    });
                }).catch((error) => {
                    res.json(error);
                });
            } else {
                res.json({
                    done: false,
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
    //end the response process
    // res.end();
}
const postOrder = async function (req, res, next) {
    const orderID = uuidv4();
    const userId = req.userVerify._id.user_id;
    const userMobile = req.mobileToken._mobile_no;
    //format date time
    var datePlaced = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    var city = req.body.city;
    var paymentMethod = req.body.payment_method;
    var lat = req.body.delivery_address_lat;
    var lng = req.body.delivery_address_lng;
    var address_txt = req.body.delivery_address;
    var subTotal = req.body.sub_total;
    var deliveryFee = req.body.delivery_fee;
    var convFee = req.body.conv_fee;
    var serviceCharge = req.body.service_charge;
    var discount = req.body.discount;
    var netTotal = req.body.net_total;
    // var placedDateTime = date;
    var scheduleDate = req.body.schedule_date;
    var status = req.body.status;
    var items = req.body.items;

    const promise = new Promise(async (resolve, reject) => {
        for (const count in items) {

            const responceOfPartnerStatus = await pool.query("SELECT * FROM partners WHERE partner_id=$1", [items[count].partner_id]);
            if (res.status(200)) {
                if (responceOfPartnerStatus.rowCount != 0 && responceOfPartnerStatus.rowCount != null) {
                    if (!responceOfPartnerStatus.rows[0].status) {
                        reject({
                            done: false,
                            message: `${items[count].partner_name} Shop is offline, We can't deliver items from this shop now.`,
                        });
                    } else {
                        const locationStatus = await pool.query("SELECT * FROM partners_locations WHERE city=$1", [city]);

                        if (res.status(200)) {
                            if (locationStatus.rowCount == 0 || locationStatus.rowCount == null) {
                                reject({
                                    done: false,
                                    message: `${items[count].partner_name} Shop is not supported in this city, We can't deliver items from this shop.`,
                                });
                            }
                        } else {
                            reject({
                                done: false,
                                message: "Has some issue(s) with status, Try again.",
                            });
                        }
                    }

                } else {
                    reject({
                        done: false,
                        message: "Data not found.",
                    });
                }
            } else {
                reject({
                    done: false,
                    message: "Has some issue(s) with status, Try again.",
                });
            }
        }
        resolve("All Done");
    });

    await promise.then(async (result) => {

        const responseOrder = await pool.query("INSERT INTO orders(order_id, user_id, user_mobile_no, payment_method, delivery_address_lat, delivery_address_lng, delivery_address, sub_total, delivery_fee, conv_fee, service_charge, net_total, order_placed_date_time, schedule_date, status, discount)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
            [orderID, userId, userMobile, paymentMethod, lat, lng, address_txt, subTotal, deliveryFee, convFee, serviceCharge, netTotal, datePlaced, scheduleDate, status, discount]);
        try {
            if (res.status(200)) {
                if (responseOrder.rowCount != 0 && responseOrder.rowCount != null) {
                    var responseItems;
                    for (var count in items) {
                        responseItems = await pool.query("INSERT INTO ordered_items(item_id, item_name, unit_qty, unit, price_buy, price_sale, price_sale_with_discount, ordered_qty, partner_id, partner_name, image_url, order_id)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
                            [items[count].item_id, items[count].item_name, items[count].unit_qty, items[count].unit, items[count].price_buy, items[count].price_sale, items[count].price_sale_with_discount, items[count].ordered_qty, items[count].partner_id, items[count].partner_name, items[count].image_url, orderID]);
                    };
                    if (responseItems.rowCount != 0 && responseItems.rowCount != null) {
                        if (res.status(200)) {
                            res.json({
                                done: true,
                                message: "Order Placed successfully",
                            })
                        } else {
                            res.json({
                                done: false,
                                message: "Has some issue(s) with status, Try again.",
                            })
                        }
                    } else {
                        res.json({
                            done: false,
                            message: "Order Placed unsuccessfully",
                        })
                    }
                } else {
                    res.json({
                        done: false,
                        message: "Data not found to post.",
                    })
                }

            } else {
                res.json({
                    done: false,
                    message: "Has some issue(s) with status, Try again.",
                })
            }
        } catch (error) {
            console.log("Has some issue(s) with another, Try again." + error, );
            res.json({
                done: false,
                message: "Has some issue(s) with another, Try again." + error,
            });
        }
    }).catch((error) => {
        res.json(error)
    });

}
const putOrder = async function (req, res, next) {
    // const userId = req.userVerify._id;
    // const userMobile = req.mobileToken._mobile_no;
    const orderId = req.params.or_id;
    var status = req.body.status;
    const response = await pool.query("UPDATE orders SET status=$1 WHERE order_id=$2", [status, orderId]);
    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                res.json({
                    done: true,
                    message: "Data Updated successfully",
                })
            } else {
                res.json({
                    done: false,
                    message: "Data not found to update.",
                    // data: [],
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

const putOrderItemsRates = async function (req, res, next) {
    const rates = req.body.body;
    const orderID = req.params.order_id;

    try {
        var retRes = false;
        let promise = new Promise(async (resolve, reject) => {

            for (var count in rates) {
                const itemId = rates[count]["item_id"];
                var response = await pool.query("UPDATE ordered_items SET is_rated=$1 WHERE item_id=$2 AND order_id=$3", [true, itemId, orderID]);

                if (res.status(200)) {
                    if (response.rowCount != 0 && response.rowCount != null) {
                        req.body = {
                            "item_id": itemId,
                            "value": rates[count]["rate"]
                        };

                        retRes = await postRate(req, res, next);

                        if (retRes.rowCount == null || retRes.rowCount == 0) {
                            reject({
                                done: false,
                                message: "Data not found.",
                            });
                        }
                    } else {
                        reject({
                            done: false,
                            message: "Data not found.",
                        })
                    }
                } else {
                    reject({
                        done: false,
                        message: "Has some issue(s) with status, Try again.",
                    });
                }
            };
            resolve(retRes);
        });

        await promise.then((result) => {
            res.json({
                done: true,
                message: "Data Inserted successfully",
            })
        }).catch((error) => {
            res.json(error)
        });

    } catch (error) {
        // res.json({
        //     done: false,
        //     message: "Has some issue(s) with another, Try again.",
        // });
    }


}

module.exports = {
    getOrders,
    getOrdersByUserID,
    getOrderByID,
    postOrder,
    putOrder,
    putOrderItemsRates
}