var express = require('express');
var router = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
var randtoken = require('rand-token');
var mongoose = require('mongoose');
require('dotenv/config');

const User = require('../models/user');


/* GET users listing. */
router.post(process.env.URL_LOGIN, function(req, res) {
	if(!req.body || req.body.length === 0) {
	    console.log('request body not found');
	    return res.sendStatus(400);
  }

	const user = {id:1, firstName: "Jimmy", lastName:"Muller"};
	const token = jwt.sign( user , process.env.SECRET_KEY);
	const refreshToken = randtoken.uid(256);
	console.log(refreshToken);
	res.json(
		[{token: token,
		  refreshToken: refreshToken
	}]);

});



  // res.json([
  // {'id': 1, "username":"jimmy"},
  // {'id': 2, "username":"kandace"}
  // ]);
// const token = jwt.sign( {req.user}, 'SECRET_KEY');
// res.json([
// {}])
// }


// router.get('/api/protected', function(req, res, next){
	
// };
module.exports = router;
