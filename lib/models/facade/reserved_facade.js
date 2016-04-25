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
    //  var is = _.isDate(params.saleDate);
    // } catch(error) {
    //  callback(error);
    //  return;
    // }
    var lunchBoxIdList = [];
    async.series({
        userLunchBoxList: function(callback) {
            userLunchBoxDao.getListByUserId(req, params.userId, function(error, userLunchBoxList) {
                if (error) {
                    callback(error);
                    return;
                }
                lunchBoxIdList = _.pluck(userLunchBoxList, 'lunchBoxId');
                callback(null, userLunchBoxList);
            });
        },
        lunchBoxMap: function(callback) {
            lunchBoxDao.getListByIdList(req, lunchBoxIdList, function(error, lunchBoxList) {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, _.indexBy(lunchBoxList, 'id'));
            });
        }       
    }, function(error, prepare) {
        if (error) {
            callback(error);
            return;
        }
        _.each(prepare.userLunchBoxList, function(userLunchBox) {
            userLunchBox.lunchBox = prepare.lunchBoxMap[userLunchBox.lunchBoxId];
        });

        callback(null, {
            'userLunchBoxList': prepare.userLunchBoxList
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