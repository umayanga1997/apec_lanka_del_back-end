const {
    pool
} = require('../Config/db');
const jwt = require('jsonwebtoken');
var dateFormat = require("dateformat");
const axios = require('axios');
const {
    v4: uuidv4
} = require('uuid');
// const fetch = require('node-fetch');

const userMobile = async function (req, res, next) {
    //set sent parameter data
    const phone_no = req.params.mobile_no;
    //genarate otp number
    var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    //make message
    var message = `Hi, Your OTP code is ${otp} by apec.lk`;

    //format date time
    var date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

    //insert otp code and more details to database
    const response = await pool.query("INSERT INTO otp_s(phone_no, otp_code, date_time)VALUES($1,$2,$3)", [phone_no, otp, date]);
    try {
        if (res.status(200)) {
            //sent otp code to currect mobile number
            // Make a request for a user with a given ID
            axios.get(`http://textit.biz/sendmsg/index.php?id=${process.env.OTP_ID}&pw=${process.env.OTP_PASSWORD}&to=${phone_no}&text=${message}&from=Apec.lk Delivery`)
                .then(function (response) {
                    // handle success
                    // console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });

            res.json({
                done: true,
                message: "Data Inserted successfully",
            });
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

const otpVerification = async function (req, res, next) {
    const getOtp = req.body.otp;
    const getMobileNo = req.body.mobile_no;

    const response = await pool.query("SELECT * FROM otp_s WHERE otp_code=$1  AND phone_no=$2", [getOtp, getMobileNo]);
    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                //generate token for mobile number
                const token = jwt.sign({
                    _mobile_no: getMobileNo,
                }, process.env.TOKEN_SECRET, );

                //format date time
                var date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
                //store token in database
                const tokenResponse = await pool.query("INSERT INTO mobile_no_token(token, created_date)VALUES($1, $2)", [token, date]);

                if (res.status(200)) {
                    if (tokenResponse.rowCount != 0 && tokenResponse.rowCount != null) {
                        //set token to header
                        res.header("mobile-token", token);
                        //set responce to body
                        res.json({
                            done: true,
                            message: "Otp has been veryfied",
                            data: [],
                        });
                    } else {
                        res.json({
                            done: false,
                            message: "Otp not veryfied",
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

            } else {
                res.json({
                    done: false,
                    message: "The Otp Code is Wrong.",
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
        });
    }
}

const userAuth = async function (req, res, next) {
    //the value is get from the verified token requeast 
    const token_data = req.mobileToken;

    const response = await pool.query("SELECT * FROM users WHERE phone_no=$1", [token_data._mobile_no]);

    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                res.json({
                    done: true,
                    message: "Registered",
                    data: {
                        registered: true,
                    },
                })
            } else {
                res.json({
                    done: true,
                    message: "Not-Register",
                    data: {
                        registered: false,
                    },
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

const userRegister = async function (req, res, next) {
    const userName = req.body.user_name;
    //the value is get from the verified token requeast 
    const token_data = req.mobileToken;
    //format date time
    var date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

    const response = await pool.query("INSERT INTO users(user_id, user_name, phone_no, reg_date)VALUES($1,$2,$3,$4)", [uuidv4(), userName, token_data._mobile_no, date]);
    try {
        if (res.status(200)) {
            const response = await pool.query("SELECT * FROM users WHERE phone_no=$1", [token_data._mobile_no]);
            //create and assign a token
            const token = jwt.sign({
                _id: response.rows[0],
            }, process.env.TOKEN_SECRET, );
            res.header("auth-token", token);
            if (res.status(200)) {
                res.json({
                    done: true,
                    message: "Your successfully Registered with Login.",
                    data: response.rows
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

const userLogin = async function (req, res, next) {
    //the value is get from the verified token requeast 
    const token_data = req.mobileToken;
    const response = await pool.query("SELECT * FROM users WHERE phone_no=$1", [token_data._mobile_no]);

    try {
        //create and assign a token
        const token = jwt.sign({
            _id: response.rows[0],
        }, process.env.TOKEN_SECRET, );
        res.header("auth-token", token);
        if (res.status(200)) {
            res.json({
                done: true,
                message: "Your successfully Login.",
                data: response.rows
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

module.exports = {
    userMobile,
    otpVerification,
    userAuth,
    userLogin,
    userRegister
}