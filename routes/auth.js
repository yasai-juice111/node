var express = require('express');
var router = express.Router();

/**
 * 認証
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/', function(req, res, next) {
	var redirectUrl = '/top';
	if (mode == "local") {
  		res.redirect(redirectUrl);
		return;
	}
	redirectUrl = casso.authUrl+
					"?response_type=code&client_id="+casso.clientId+
					"&redirect_uri="+casso.callbackUrl+
					"&scope=openid%20email%20profile";
	console.log(redirectUrl);
  	res.redirect(redirectUrl);
});

router.get('/callback', function(req, res, next) {

console.log(req);
console.log('sugino');
process.exit();
		// body...
	// };
	// var redirectUrl = '/top';
	// if (mode == "local") {
 //  		res.redirect(redirectUrl);
	// 	return;
	// }
	redirectUrl = casso.authUrl+
					"?response_type=code&client_id="+casso.clientId+
					"&redirect_uri="+casso.callbackUrl+
					"&scope=openid%20email%20profile";
	console.log(redirectUrl);
  	res.redirect(redirectUrl);
});

module.exports = router;
