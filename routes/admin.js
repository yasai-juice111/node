var express = require('express');
var router = express.Router();

// facade
var adminFacade = require(__libpath + '/models/facade/admin_facade');

/**
 * TOP
 *p
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/', function(req, res, next) {
	var saleDate = req.currentDatetime || new Date();

	adminFacade.index(req, {
		"saleDate": saleDate
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.saleDate = saleDate;
		console.log(result);
		res.render('admin/index', result);
	});
});

module.exports = router;
