const {
    pool
} = require('../Config/db');
var dateFormat = require("dateformat");

const getRate = async function (req, res, next) {
    const itemId = req.params.item_id;
    const response = await pool.query("SELECT SUM(rate_value), COUNT(*) FROM item_rates WHERE item_id=$1", [itemId]);
    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                if (response.rows[0].sum != null) {
                    var rateValue = response.rows[0].sum /  response.rows[0].count;
                    res.json({
                        done: true,
                        message: "Done",
                        data:{
                            rate: rateValue
                        },
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
const postRate = async function (req, res, next) {
    var value = req.body.value;
    var itemID = req.body.item_id;
    //format date time
    var date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    const response = await pool.query("INSERT INTO item_rates(item_id, rate_value, date_time)VALUES($1,$2, $3)", [ itemID, value, date]);
    try {
        if (res.status(200)) {
            return response;
        } else {
            return response;
        }
        
    } catch (error) {
        return response;
    }
    
}
module.exports = {
    getRate,
    postRate
}