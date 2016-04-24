// datastore
var mysql = require(__libpath + '/datastores/mysql');

var UserDao = function() {};

UserDao.prototype.getByEmployeeId = function(req, employeeId, callback) {

	mysql.query('select name from users where employeeId = ' + employeeId, function (err, rows) {
		if (err) {
			return callback(err);
		}
		var result = _.map(rows, function(row) {
	        // カラム名をキャメルケースに変換
	        row = inflector.toCamelCaseKeys(row);
	        return row;
	    });
		callback(null, (result.length > 0) ? result[0] : null);
	});

}

UserDao.prototype.add = function(req, params, callback) {

	var currentDatetime = new Date();
	var addData = [
		params.employee_id,
		params.employee_type,
		params.company,
		params.email,
		currentDatetime,
		currentDatetime
	];
	var queryString = 'insert into user (employee_id, employee_type, company, email, insert_datetime, update_datetime) value (?,?,?,?,?,?)';
	mysql.query(queryString, addData, callback);

}

module.exports = new UserDao();