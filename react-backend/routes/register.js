var express = require('express');
var router = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
var randtoken = require('rand-token');
require('dotenv/config');


/* GET users listing. */


router.post(process.env.URL_REGISTER, function(req, res){

	const user = {id:2};
	const token = jwt.sign( user , process.env.SECRET_KEY);
	const refreshToken = randtoken.uid(256);
	console.log(refreshToken);
	res.json(
		[{token: token,
		  refreshToken: refreshToken
	}]);
});




// const token = jwt.sign( {req.user}, 'SECRET_KEY');
// res.json([
// {}])
// }


// router.get('/api/protected', function(req, res, next){
	
// };
module.exports = router;
