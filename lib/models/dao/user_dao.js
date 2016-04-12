// datastore
var mysql = require(__libpath + '/datastores/mysql');

var UserDao = function() {};

UserDao.prototype.get = function(req, callback) {

	mysql.query('select name from users', function (err, rows) {
		if (err) {
			return callback(err);
		}
		callback(null, rows);
	});

}

module.exports = new UserDao();