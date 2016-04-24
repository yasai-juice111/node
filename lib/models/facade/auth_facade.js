/**
 * @fileOverview TopFacade
 */

// third party
var async = require('async');
var _ = require('underscore');
var validator = require('validator');
var http = require('superagent');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// dao
var userDao = require(__libpath+"/models/dao/user_dao");

var Authfacade = function() {};

Authfacade.prototype.callback = function(req, params, callback) {
	// try {
	// 	var is = _.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	// transaction start
	mysql.beginTransaction(function(error) {
		if (error) {
			callback(error);
			return;
		}
	    async.waterfall([
	    	// ユーザ取得
	    	function(callback) {
	    		userDao.getByEmployeeId(req, params.caUser.sub, callback);
	    	},
	    	// ユーザ登録
	    	function(user, callback) {
	    		console.log('//////////');
	    		console.log(user);
	    		console.log('//////////');
	    		if (user) {
	    			callback(null, user);
	    			return;
	    		}
	    		userDao.add(req, {
					"employee_id": params.caUser.sub,
					"employee_type": params.caUser.employee_type,
					"company": params.caUser.company,
					"email": params.caUser.email
				}, function(error, result) {
					if (error) {
						callback(error);
						return;
					}
					console.log('adddddddddddddddddddd');
					console.log(result);
					console.log('adddddddddddddddddddd');
					callback(null, result);
				});
	    	}
	    ], function(error, user) {
	    	if (error) {
				mysql.rollback(function() {
					console.log('Error. Mysql Rollback');
					callback(error);
	    		});
				return;
	    	}
			mysql.commit(function() {
				console.log('Mysql Commit');
				callback(null, user);
	  		});
	    });
	});
}

module.exports = new Authfacade();