var express = require('express');
var router = express.Router();

// third party
var validator = require('validator');
var dateformat = require('dateformat');

// facade
// var calendarFacade = require(__libpath + '/models/facade/calendar_facade');

/**
 * TOP
 *p
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/', function(req, res, next) {
    // if (!req.session.user) {
    //     res.redirect('/auth');
    //     return;
    // }
	// var saleDate = req.currentDatetime || new Date();

	// calendarFacade.index(req, {
	// 	"saleDate": saleDate
	// },function(error, result) {
	// 	if (error) {
	// 	  	res.redirect('/error');
	// 		return
	// 	}
	// 	result.saleDate = saleDate;
	// 	result.availablePurchaseFlag = false;
	// 	if (dateformat(saleDate, 'HH') == '09' || dateformat(saleDate, 'HH') == '10' || dateformat(saleDate, 'HH') == '11' || mode == 'local') {
	// 		result.availablePurchaseFlag = true;
	// 	}
	// 	res.render('top/index', result);
	// });
	res.render('calendar/index', { title: 'calendar' });
});

module.exports = router;
