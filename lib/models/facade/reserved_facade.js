/**
 * @fileOverview reservedFacade
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

var ReservedFacade = function() {};

ReservedFacade.prototype.index = function(req, params, callback) {
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
    }, function(error, prepare) {
    	if (error) {
    		callback(error);
    		return;
    	}
    	var lunchBoxList = prepare.lunchBoxList;
    	// 各弁当の予約数を取得
    	_.each(lunchBoxList, function(lunchBox) {
    		lunchBox.currentRecevedAmount = _.filter(prepare.userLunchBoxList, function(userLunchBox) {
    			return userLunchBox.lunchBoxId == lunchBox.id
    		}).length;
    	});
    	callback(null, {
    		lunchBoxList : lunchBoxList
    	});
    });
}

ReservedFacade.prototype.detail = function(req, params, callback) {
	try {
		// validator.isInt(params.lunchBoxId);
	} catch(error) {
		callback(error);
		return;
	}

    async.series({
    	// 指定の日時の弁当リスト取得
    	lunchBox: function(callback) {
    		lunchBoxDao.getById(req, params.lunchBoxId, callback);
    	},
    	// その週における現在の予約状況取得
    	userLunchBoxList: function(callback) {
    		userLunchBoxDao.getListByLunchBoxId(req, params.lunchBoxId, callback);
    	}
    }, function(error, prepare) {
    	if (error) {
    		callback(error);
    		return;
    	}
    	callback(null, {
    		lunchBox : prepare.lunchBox,
    		currentRecevedAmount : prepare.userLunchBoxList.length
    	});
    });
}


module.exports = new ReservedFacade();