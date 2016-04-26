var express = require('express');
var router = express.Router();

// facade
var topFacade = require(__libpath + '/models/facade/top_facade');

/**
 * TOP
 *p
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/', function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/auth');
        return;
    }
	var saleDate = req.currentDatetime || new Date();

	topFacade.index(req, {
		"saleDate": saleDate
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.saleDate = saleDate;
		console.log(result);
		res.render('top/index', result);
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

	topFacade.detail(req, {
		"lunchBoxId": lunchBoxId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.render('top/detail', result);
	});
});

/**
 * 確認
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.post('/confirm', function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/auth');
        return;
    }
	var lunchBoxId = req.param('id');

	topFacade.confirm(req, {
		"lunchBoxId": lunchBoxId,
		"amount": 1
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
console.log(result);
		res.render('top/confirm', result);
	});
});


/**
 * 予約実行
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.post('/execute', function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/auth');
        return;
    }
	var lunchBoxId = req.param('id');
	var amount = req.param('amount');
	topFacade.execute(req, {
		"userId": req.session.user.id,
		"lunchBoxId": lunchBoxId,
		"amount": amount
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		req.session.reservedLunchBox = {
			"lunchBoxId": lunchBoxId
		}
	  	res.redirect('/top/finish');
	});
});


/**
 * 完了
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/finish', function(req, res, next) {

	var lunchBoxId = req.session.reservedLunchBox.lunchBoxId;
	delete req.session.reservedLunchBox;

	topFacade.finish(req, {
		"userId": req.session.user.id,
		"lunchBoxId": lunchBoxId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		console.log(result);
		res.render('top/finish', result);
	});
});

module.exports = router;
