const express = require('express');
const router = express.Router();
const auth_controller = require('../../Controllers/auth_controller');
// const userVerify = require('../../Controllers/Tokens/userLoginVerifyToken');
const mobileVerify = require('../../Controllers/Tokens/userMobileVerifyToken');

//mobile number verifycation (firstly send otp and after otp verifycation)
router.get('/auth/mob/:mobile_no', auth_controller.userMobileOTP);
router.post('/auth/verify/otp/', auth_controller.otpVerification);
//check is user registered or not
router.get('/auth/check/',mobileVerify, auth_controller.userAuth);
//reg or login api
router.post('/register/',mobileVerify, auth_controller.userRegister);
router.post('/login/', mobileVerify, auth_controller.userLogin);

module.exports = router;