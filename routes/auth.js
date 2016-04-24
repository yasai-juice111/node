var express = require('express');
var router = express.Router();

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
    authFacade.callback(req, {
        "code": code
    },function(error, result) {
        if (error) {
            res.redirect('/error');
            return
        }
        res.redirect('/top');
    });
});

module.exports = router;
