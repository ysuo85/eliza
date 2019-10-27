var express = require('express');
var router = express.Router();
var strftime = require('strftime');
var ElizaBot = require('elizabot');

var eliza = new ElizaBot();
var final = eliza.getFinal();

/* GET home page. */
router.get('/eliza', function(req, res, next) {
	res.render('index', { name: false, date: false });
});

router.post('/eliza', function(req, res, next) {
	var now = strftime('%B %d, %Y %H:%M:%S');
	var reqName = req.body.name;
	res.render('chat', {
		name: reqName,
		date: now
	});
});

router.post('/DOCTOR', function(req, res, next) {
	var input = req.body.human;
	var reply = eliza.transform(input);
	if(eliza.quit){
		res.send({"eliza": final});
	}
	else{
		res.send({"eliza": reply});
	}
});

module.exports = router;
