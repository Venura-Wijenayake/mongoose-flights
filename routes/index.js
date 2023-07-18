var express = require('express');
var router = express.Router();

/* GET home page (index view). */
router.get('/', function(req, res, next) {
	res.redirect('/flights');
});

module.exports = router;