const express = require('express');
const router = express.Router();
const profile_controller = require('../../Controllers/user_profile_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.get('/profile', userVerify, profile_controller.getUserProfileDetails);
router.get('/profiles',userVerify, profile_controller.getUsersProfileDetails);
router.put('/profile', userVerify, profile_controller.putUserProfileDetails);

module.exports = router;