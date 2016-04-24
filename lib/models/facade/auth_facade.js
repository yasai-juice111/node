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
    async.waterfall([
    	// accessToken取得
    	function(callback) {
		    http.post(casso.oauthTokenUrl)
		    .send("grant_type=authorization_code")
		    .send("code="+code)
		    .send("client_id="+casso.clientId)
		    .send("client_secret="+casso.clientSecret)
		    .send("redirect_uri="+casso.callbackUrl)
		    .end(function(error, responseData) {
		        if (error || responseData.statusCode != 200) {
		        	callback(error);
		            return;
		        }
		        if (!responseData.body || !responseData.body.access_token) {
		        	callback(new Error('Cannot get response body'));
		        	return;
		        }
		        // 200で返ってきた場合accessTokenを元にユーザ情報取得
	            http.get(casso.userInfoUrl)
	            .query("access_token="+responseData.body.access_token)
	            .end(function(error, result) {
			        if (error || result.statusCode != 200) {
			        	callback(error);
			            return;
			        }
			        callback(null, result.body)
	            });
		    });
    	},
    	function(caUser, callback) {
			// transaction start
			mysql.beginTransaction(function(error) {
				if (error) {
					callback(error);
					return;
				}
			    async.waterfall([
			    	// ユーザ取得
			    	function(callback) {
			    		userDao.getByEmployeeId(req, caUser.sub, callback);
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
							"employee_id": caUser.sub,
							"employee_type": caUser.employee_type,
							"company": caUser.company,
							"email": caUser.email
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
							callback(error);
							return;
			    		});
			    	}
					mysql.commit(function(err) {
						callback(null, user);
			  		});
			    });
			});
    	}
    ], function(error, user) {
    	if (error) {
    		callback(error);
    		return;
    	}
    	console.log(user);
    	callback(null, {
    		lunchBoxList : lunchBoxList
    	});
    });
}

module.exports = new Authfacade();