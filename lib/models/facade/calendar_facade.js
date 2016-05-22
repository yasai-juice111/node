/**
 * @fileOverview CalendarFacade
 */

// third party
var async = require('async');
var _ = require('underscore');
var validator = require('validator');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// dao
var studioDao = require(__libpath+"/models/dao/studio_dao");
var studioAreaDao = require(__libpath+"/models/dao/studio_area_dao");
var studioAreaRoomDao = require(__libpath+"/models/dao/studio_area_room_dao");

var Calendarfacade = function() {};

Calendarfacade.prototype.index = function(req, params, callback) {
	// try {
	// 	var is = _.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
    var studio = {};
    var studioAreaIdList = [];
    async.series({
        // スタジオ取得
        studio: function(callback) {
            studioDao.getById(req, params.id, function(error, result) {
                if (error) {
                    callback(error);
                    return;
                }
                studio = result;
                callback(null, studio);
            });
        },
        // スタジオエリア取得
        studioAreaList: function(callback) {
            studioAreaDao.getListByStudioId(req, studio.id, function(error, result) {
                if (error) {
                    callback(error);
                    return;
                }
                studioAreaIdList = _.pluck(result, 'id');
                callback(null, result);
            });
        },
    	// スタジオエリアルーム取得
    	studioAreaRoomList: function(callback) {
    		studioAreaRoomDao.getListByStudioAreaIdList(req, studioAreaIdList, callback);
    	}
    }, function(error, prepare) {
    	if (error) {
    		callback(error);
    		return;
    	}
        var studioAreaList = _.filter(prepare.studioAreaList, function(studioArea) {
            return studio.id == studioArea.studioId
        });
        _.each(studioAreaList, function(studioArea) {
            studioArea.studioAreaRoomList = _.filter(prepare.studioAreaRoomList, function(studioAreaRoom) {
                return studioArea.id == studioAreaRoom.studioAreaId
            });
        });
        studio.studioAreaList = studioAreaList;
    	callback(null, {
            studio : studio
        });
    });
}

// Calendarfacade.prototype.detail = function(req, params, callback) {
// 	try {
// 		// validator.isInt(params.studioId);
// 	} catch(error) {
// 		callback(error);
// 		return;
// 	}

//     async.series({
//     	// 指定の日時の弁当リスト取得
//     	studio: function(callback) {
//     		studioDao.getById(req, params.studioId, callback);
//     	},
//     	// その週における現在の予約状況取得
//     	userstudioList: function(callback) {
//     		userstudioDao.getListBystudioId(req, params.studioId, callback);
//     	}
//     }, function(error, prepare) {
//     	if (error) {
//     		callback(error);
//     		return;
//     	}
//         var reservedFlag = false;
//         // 予約済みかどうかチェック
//         if (_.find(prepare.userstudioList, function(userstudio) {
//             return userstudio.userId == params.userId && 
//                    userstudio.studioId == params.studioId &&
//                    userstudio.cancelFlag == false;
//         })) {
//             reservedFlag = true;
//         }
//         // 現在の予約数計算
//         var currentRecevedAmount = 0;
//         _.each(prepare.userstudioList, function(userstudio) {
//             if (userstudio.studioId == params.studioId && userstudio.cancelFlag == false) {
//                 currentRecevedAmount += userstudio.amount;
//             }
//         });
//     	callback(null, {
//     		studio : prepare.studio,
//             currentRecevedAmount : currentRecevedAmount,
//     		reservedFlag : reservedFlag
//     	});
//     });
// }

// Calendarfacade.prototype.confirm = function(req, params, callback) {
// 	try {
// 		// validator.isInt(params.studioId);
// 		// validator.isInt(params.amount);
// 	} catch(error) {
// 		callback(error);
// 		return;
// 	}

//     async.series({
//     	// 指定の日時の弁当リスト取得
//     	studio: function(callback) {
//     		studioDao.getById(req, params.studioId, callback);
//     	},
//     	// その週における現在の予約状況取得
//     	userstudioList: function(callback) {
//     		userstudioDao.getListBystudioId(req, params.studioId, callback);
//     	}
//     }, function(error, prepare) {
//     	if (error) {
// 	    	callback(error);
// 	    	return;
//     	}
//     	var enableReserveFlag = true;
//     	var currentReservedAmount = prepare.userstudioList.length;
//     	// 現在の予約数 + 予約したい個数 > 在庫数
//     	if (currentReservedAmount + params.amount > prepare.studio.amount) {
//     		enableReserveFlag = false;
//     	}
//     	callback(null, {
//     		studio : prepare.studio,
//     		currentRecevedAmount : currentReservedAmount,
//     		enableReserveFlag : enableReserveFlag
//     	});
//     });
// }

// Calendarfacade.prototype.execute = function(req, params, callback) {
// 	try {
// 		// validator.isInt(params.studioId);
// 		// validator.isInt(params.amount);
// 	} catch(error) {
// 		callback(error);
// 		return;
// 	}
// 	// transaction start
// 	mysql.beginTransaction(function(error) {
// 		if (error) {
// 			callback(error);
// 			return;
// 		}
// 	    async.waterfall([
// 	    	// fonUpdate
// 	    	function(callback) {
// 	    		studioDao.getByIdForUpdate(req, params.studioId, callback);
// 	    	},
// 	    	// 指定の日時の弁当リスト取得
// 	    	function(studio, callback) {
// 	    		userstudioDao.getListBystudioId(req, params.studioId, function(error, userstudioList) {
// 	    			if (error) {
// 	    				callback(error);
// 	    				return;
// 	    			}
// 	    			// 現在の予約数取得
// 			    	var currentReservedAmount = _.filter(userstudioList, function(userstudio) {
//                         return userstudio.cancelFlag == false;
//                     }).length;
// 			    	// 現在の予約数 + 予約したい個数 > 在庫数
// 			    	if (currentReservedAmount + params.amount > studio.amount) {
// 			    		callback(new Error('Error, already all reserved lunch box. studioId = ' + params.studioId));
// 			    		return;
// 			    	}
// 	    			callback();
// 	    		});
// 	    	},
// 	    	// 予約実行
// 	    	function(callback) {
// 	    		userstudioDao.add(req, params, callback);
// 	    	}
// 	    ], function(error, prepare) {
// 	    	if (error) {
// 				mysql.rollback(function() {
// 					callback(error);
// 	    		});
//                 return;
// 	    	}
// 			mysql.commit(function(err) {
// 				callback();
// 	  		});
// 	    });
// 	});
// }

// Calendarfacade.prototype.finish = function(req, params, callback) {
//     try {
//         // validator.isInt(params.userId);
//         // validator.isInt(params.studioId);
//     } catch(error) {
//         callback(error);
//         return;
//     }

//     async.series({
//         // 指定の日時の弁当リスト取得
//         studio: function(callback) {
//             studioDao.getById(req, params.studioId, callback);
//         },
//         // その週における現在の予約状況取得
//         userstudio: function(callback) {
//             userstudioDao.getByUserIdAndstudioId(req, params, callback);
//         }
//     }, function(error, prepare) {
//         if (error) {
//             callback(error);
//             return;
//         }
//         callback(null, {
//             studio : prepare.studio,
//             userstudio : prepare.userstudio,
//         });
//     });
// }

// Calendarfacade.prototype.receive = function(req, params, callback) {
//     try {
//         // validator.isInt(params.studioId);
//         // validator.isInt(params.amount);
//     } catch(error) {
//         callback(error);
//         return;
//     }
//     // transaction start
//     async.waterfall([
//         function(callback) {
//             mysql.beginTransaction(function(error) {
//                 if (error) {
//                     callback(error);
//                     return;
//                 }
//                 async.waterfall([
//                     // fonUpdate
//                     function(callback) {
//                         userstudioDao.updateReceiveFlag(req, params, callback);
//                     }
//                 ], function(error, prepare) {
//                     if (error) {
//                         mysql.rollback(function() {
//                             callback(error);
//                         });
//                         return;
//                     }
//                     mysql.commit(function(err) {
//                         callback();
//                     });
//                 });
//             });
//         },
//         function(callback) {
//             var userstudio = {};
//             async.series({
//                 // 予約状況取得
//                 userstudio: function(callback) {
//                     userstudioDao.getById(req, params.userstudioId, function(error, result) {
//                         if (error) {
//                             callback(error);
//                             return;
//                         }
//                         userstudio = result;
//                         callback(null, result);
//                     });
//                 },
//                 // 指定の日時の弁当取得
//                 studio: function(callback) {
//                     studioDao.getById(req, userstudio.studioId, callback);
//                 },
//                 // ユーザ情報取得
//                 user: function(callback) {
//                     userDao.getById(req, userstudio.userId, callback);
//                 },
//             }, callback);
//         }
//     ], callback);

// }

module.exports = new Calendarfacade();