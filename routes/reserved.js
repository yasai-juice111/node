var express = require('express');
var router = express.Router();

// facade
var reservedFacade = require(__libpath + '/models/facade/reserved_facade');

/**
 * TOP
 *p
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/', function(req, res, next) {
	console.log(req.session);
    if (!req.session.user) {
        res.redirect('/auth');
        return;
    }
	reservedFacade.index(req, {
		"userId": req.session.user.id
	},function(error, result) {
		if (error) {
	        require(__routespath + '/error').index(req, res, error);
	        return;
		}
		res.render('reserved/index', result);
	});
});

/**
 * 詳細
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/detail', function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/auth');
        return;
    }
	var lunchBoxId = req.param('id');

	reservedFacade.detail(req, {
		"lunchBoxId": lunchBoxId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.render('top/detail', result);
	});
});

module.exports = router;
