var express = require('express');
var router = express.Router();

router.get('/view/', function (req, res, next) {
 res.render('index', {title:"Hello World"});
})

module.exports = router;