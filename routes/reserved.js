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
		console.log(result);
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
	var userLunchBoxId = req.param('id');

	reservedFacade.detail(req, {
		"userLunchBoxId": userLunchBoxId
	},function(error, result) {
		if (error) {
	        require(__routespath + '/error').index(req, res, error);
			return
		}
		console.log(result);
		res.render('reserved/detail', result);
	});
});

/**
 * キャンセル実行
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.post('/cancel', function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/auth');
        return;
    }
	var userLunchBoxId = req.param('id');

	reservedFacade.cancel(req, {
		"userId": req.session.user.id,
		"userLunchBoxId": userLunchBoxId
	},function(error, result) {
		if (error) {
	        require(__routespath + '/error').index(req, res, error);
			return
		}
		console.log(result);
	  	res.redirect('/reserved');
	});
});

/**
 * キャンセル実行結果
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/result', function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/auth');
        return;
    }
	var userLunchBoxId = req.param('id');

	reservedFacade.cancel(req, {
		"userId": req.session.user.id,
		"userLunchBoxId": userLunchBoxId
	},function(error, result) {
		if (error) {
	        require(__routespath + '/error').index(req, res, error);
			return
		}
		console.log(result);
		res.render('reserved/detail', result);
	});
});

module.exports = router;
