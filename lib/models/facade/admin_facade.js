/**
 * @fileOverview AdminFacade
 */

// third party
var async = require('async');
var _ = require('underscore');
var validator = require('validator');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// dao
var userDao = require(__libpath+"/models/dao/user_dao");
var lunchBoxDao = require(__libpath+"/models/dao/lunch_box_dao");
var userLunchBoxDao = require(__libpath+"/models/dao/user_lunch_box_dao");

var Adminfacade = function() {};

Adminfacade.prototype.index = function(req, params, callback) {
	// try {
	// 	var is = _.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var lunchBoxIdList = [];
    async.series({
    	// 指定の日時の弁当リスト取得
    	lunchBoxList: function(callback) {
    		lunchBoxDao.getBySaleDate(req, params, function(error, result) {
    			if (error) {
    				callback(error);
    				return;
    			}
    			lunchBoxIdList = _.pluck(result, 'id');
    			callback(null, result);
    		});
    	},
    	// その週における現在の予約状況取得
    	userLunchBoxList: function(callback) {
    		userLunchBoxDao.getByLunchBoxIdList(req, lunchBoxIdList, callback);
    	}
    }, callback);
}

module.exports = new Adminfacade();