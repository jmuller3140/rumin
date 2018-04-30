var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');

const Entry = require('../models/entry');


require('dotenv/config');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post(process.env.URL_SAVE, function(req, res){
	//Entry.remove({}).exec();
	if(!req.body || req.body.length === 0) {
	    console.log('request body not found');
	    return res.sendStatus(400);
  }

  const entry = new Entry({
  	_id: mongoose.Types.ObjectId(),
  	date: moment(),
  	entry: req.body.data
  });
  entry.save().then(result => {
  	console.log(result);
  	res.json({success: "Your text saved successfully"});
  })
  .catch(err => console.log(err));

	console.log(req.body);
	
});



module.exports = router;
