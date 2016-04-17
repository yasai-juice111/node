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
	var saleDate = req.currentDatetime;
console.log(saleDate);
	topFacade.index(req, {
		"saleDate": req.currentDatetime || new Date()
	},function(err, result) {
		if (err) {
			callback(err);
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
	var lunchBoxId = req.param('id');
console.log(lunchBoxId);
	topFacade.detail(req, {
		"lunchBoxId": lunchBoxId
	},function(err, result) {
		if (err) {
			callback(err);
			return
		}
console.log(result);
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
router.get('/confirm', function(req, res, next) {
	var lunchBoxId = req.param('id');

	topFacade.confirm(req, {
		"lunchBoxId": lunchBoxId,
		"amount": 1
	},function(err, result) {
		if (err) {
			callback(err);
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
router.get('/execute', function(req, res, next) {

	topFacade.execute(req, {
		"userId": 1,
		"lunchBoxId": 1,
		"amount": 1
	},function(err, result) {
		if (err) {
			callback(err);
			return
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

	res.render('top/finish', {});

	// topFacade.execute(req, {
	// 	"userId": 1,
	// 	"lunchBoxId": 1,
	// 	"amount": 1
	// },function(err, result) {
	// 	if (err) {
	// 		callback(err);
	// 		return
	// 	}
	//   	res.redirect('/top/finish');
	// });
});

module.exports = router;
