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
            userLunchBoxDao.getListByUserId(req, params.userId, function(error, result) {
                if (error) {
                    callback(error);
                    return;
                }
                // キャンセルしたものを弾く
                var userLunchBoxList = _.filter(result, function(userLunchBox) {
                    return userLunchBox.cancelFlag == false                    
                })
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
		// validator.isInt(params.userLunchBoxId);
	} catch(error) {
		callback(error);
		return;
	}

    var userLunchBox = {};

    async.series({
        userLunchBox: function(callback) {
            userLunchBoxDao.getById(req, params.userLunchBoxId, function(error, result) {
                if (error) {
                    callback(error);
                    return;
                }
                userLunchBox = result;
                callback(null, userLunchBox);
            });
        },
        lunchBox: function(callback) {
            lunchBoxDao.getById(req, userLunchBox.lunchBoxId, callback);
        }       
    }, callback);
}

ReservedFacade.prototype.cancel = function(req, params, callback) {
    try {
        // validator.isInt(params.userId);
        // validator.isInt(params.userLunchBoxId);
    } catch(error) {
        callback(error);
        return;
    }

    // transaction start
    mysql.beginTransaction(function(error) {
        if (error) {
            callback(error);
            return;
        }
        async.waterfall([
            // ユーザの予約したものがチャック
            function(callback) {
                userLunchBoxDao.getById(req, params.userLunchBoxId, function(error, userLunchBox) {
                    if (error) {
                        callback(error);
                        return;
                    }
                    if (params.userId != userLunchBox.userId) {
                        callback(new Error('Error. Cannot get user reserved lunch box. userLunchBoxId:'+params.userLunchBoxId+', userId:'+params.userId));
                        return;
                    }
                    callback();
                });
            },
            // キャンセル実行
            function(callback) {
                userLunchBoxDao.updateCancelFlag(req, params, callback);
            }
        ], function(error, prepare) {
            if (error) {
                mysql.rollback(function() {
                    console.log(error);
                    callback(error);
                    return;
                });
            }
            mysql.commit(function(err) {
                callback();
            });
        });
    });
}


module.exports = new ReservedFacade();