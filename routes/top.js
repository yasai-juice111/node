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
	topFacade.index(req, {
		"saleDate": new Date()
	},function(err, result) {
		if (err) {
			callback(err);
			return
		}
		res.render('top', result);
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


	topFacade.detail(req, {
		"lunchBoxId": 1
	},function(err, result) {
		if (err) {
			callback(err);
			return
		}
console.log('///////////');
console.log(result);
console.log('///////////');
		res.render('top', result);
	});
});

module.exports = router;
