var express = require('express');
var router = express.Router();
var http = require('superagent');

// facade
var authFacade = require(__libpath + '/models/facade/auth_facade');


/**
 * 認証
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/', function(req, res, next) {
    // var redirectUrl = '/top';
    // if (mode == "local") {
    //     res.redirect(redirectUrl);
    //     return;
    // }
    redirectUrl = casso.authUrl+
                "?response_type=code&client_id="+casso.clientId+
                "&redirect_uri="+casso.callbackUrl+
                "&scope=openid%20email%20profile";
    console.log(redirectUrl);
    res.redirect(redirectUrl);
});

/**
 * 認証コールバック
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/callback', function(req, res, next) {
    var error = req.param('error');
    var code = req.param('code');
    if (error || !code) {
        res.redirect('/auth');
        return;
    }
    // TODO facadeで処理する(curlがなぜが叩けなかった)
    // accessToken取得
    http.post(casso.oauthTokenUrl)
    .send("grant_type=authorization_code")
    .send("code="+code)
    .send("client_id="+casso.clientId)
    .send("client_secret="+casso.clientSecret)
    .send("redirect_uri="+casso.callbackUrl)
    .end(function(error, responseData) {
        if (error || responseData.statusCode != 200) {
            res.redirect('/error');
            return
        }
        if (!responseData.body || !responseData.body.access_token) {
            // callback(new Error('Cannot get response body'));
            res.redirect('/error');
            return
        }
        // 200で返ってきた場合accessTokenを元にユーザ情報取得
        http.get(casso.userInfoUrl)
        .query("access_token="+responseData.body.access_token)
        .end(function(error, result) {
            if (error || result.statusCode != 200) {
                res.redirect('/error');
                return
            }
            // 認証
            authFacade.callback(req, {
                "caUser": result.body
            },function(error, result) {
                if (error) {
                    res.redirect('/error');
                    return
                }
                console.log(result);
                res.redirect('/top');
            });
        });
    });

});

module.exports = router;
