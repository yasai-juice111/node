// datastore
var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: mysqlConf.host || 'localhost',
  user: mysqlConf.user || 'root',
  password: mysqlConf.password || 'root',
  database: mysqlConf.database || 'node'
});

module.exports = mysqlConnection;