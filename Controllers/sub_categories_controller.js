const {pool} = require('../Config/db');
const { v4: uuidv4 } = require('uuid');

const getSubCategory =async function (req, res, next) {
    const subCatId = req.params.sub_cat_id;
    const response = await pool.query("SELECT * FROM sub_categories WHERE sub_cat_id=$1", [subCatId]);
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

const getSubCategories =async function (req, res, next) {
    const response = await pool.query("SELECT * FROM sub_categories");

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

const postSubCategory =async function (req, res, next) {
    var subCatName = req.body.sub_cat_name; 
    var catId = req.body.cat_id;

    const response = await pool.query("INSERT INTO sub_categories(sub_cat_id, sub_cat_name,cat_id)VALUES($1,$2,$3)", [ uuidv4(),subCatName, catId]);
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
const putSubCategory = async function (req, res, next) {
    var subCatId = req.params.sub_cat_id;
    var subCatName = req.body.sub_cat_name;
    var catId = req.body.cat_id;
    const response = await pool.query("UPDATE sub_categories SET sub_cat_name =$1 ,cat_id=$2 WHERE sub_cat_id=$3", [subCatName, catId, subCatId]);
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
                    data: [],
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

const deleteSubCategory =async function (req, res, next) {
    var subCatId = req.params.sub_cat_id;
    
    const response = await pool.query("DELETE FROM sub_categories WHERE sub_cat_id=$1", [subCatId]);
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
                    data: [],
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

module.exports={
    getSubCategories,
    getSubCategory,
    postSubCategory,
    putSubCategory,
    deleteSubCategory,
}