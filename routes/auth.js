var http = require('superagent');
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
    var code = req.param('code');

    http.post(casso.oauthTokenUrl)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send([
        {"grant_type" : "authorization_code"},
        {"code" : code},
        {"client_id" : casso.clientId},
        {"client_secret" : casso.clientSecret},
        {"redirect_uri" : casso.callbackUrl}
    ])
    .end(function(res){
        console.log('//////////');
        console.log(res);
        console.log('//////////');
    });
});

module.exports = router;
