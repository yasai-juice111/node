/**
 * @fileOverview UserLunch
BoxDao
 */

// third party
var _ = require('underscore');
var validator = require('validator');
var dateformat = require('dateformat');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// util
var inflector = require(__libpath+"/util/inflector");

var UserLunchBoxDao = function() {};

UserLunchBoxDao.prototype.getByLunchBoxId = function(req, lunchBoxId, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	if (lunchBoxIdList.length == 0) {
		callback(null, []);
		return
	}

	mysql.query('select * from user_lunch_box where lunch_box_id = ' + lunchBoxId, function (err, rows) {
		if (err) {
			callback(err);
			return;
		}
		var result = _.map(rows, function(row) {
	        // カラム名をキャメルケースに変換
	        row = inflector.toCamelCaseKeys(row);
	        return row;
	    });
		callback(null, result);
	});

}

UserLunchBoxDao.prototype.getByLunchBoxIdList = function(req, lunchBoxIdList, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	if (lunchBoxIdList.length == 0) {
		callback(null, []);
		return
	}
	var queryString = '(' + _.map(lunchBoxIdList, function(lunchBoxId) {
        return _.escape(lunchBoxId);
    }).join(', ') + ')';

	mysql.query('select * from user_lunch_box where lunch_box_id in ' + queryString, function (err, rows) {
		if (err) {
			callback(err);
			return;
		}
		var result = _.map(rows, function(row) {
	        // カラム名をキャメルケースに変換
	        row = inflector.toCamelCaseKeys(row);
	        return row;
	    });
		callback(null, result);
	});

}

module.exports = new UserLunchBoxDao();
