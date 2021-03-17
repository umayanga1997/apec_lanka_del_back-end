const {pool} = require('../Config/db');
const { v4: uuidv4 } = require('uuid');

const getCategory = async function (req, res, next) {
    const catId = req.params.cat_id;
    const response = await pool.query("SELECT * FROM categories WHERE cat_id=$1", [catId]);
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
                    message: "Categories are not found.",
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
const getCategories = async function (req, res, next) {
    const response = await pool.query("SELECT * FROM categories");

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

const postCategory = async function (req, res, next) {
    var catName = req.body.cat_name;
    var catImage = req.body.cat_image;
    const response = await pool.query("INSERT INTO categories(cat_id, cat_name,cat_image)VALUES($1,$2,$3)", [ uuidv4(),catName, catImage]);
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

const putCategory =async function (req, res, next) {
    var catId = req.params.cat_id;
    var catName = req.body.cat_name;
    var catImage = req.body.cat_image;
    const response = await pool.query("UPDATE categories SET cat_name =$1 ,cat_image=$2 WHERE cat_id=$3", [catName, catImage, catId]);
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

const deleteCategory =async function (req, res, next) {
    var catId = req.params.cat_id;
    const response = await pool.query("DELETE FROM categories WHERE cat_id=$1", [catId]);
    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                res.json({
                    done: true,
                    message: "Data Deleted successfully",
                })
            } else {
                res.json({
                    done: true,
                    message: "Data not found to delete.",
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

module.exports = {
    getCategory,
    getCategories,
    postCategory,
    putCategory,
    deleteCategory
}