//arguments settings
var program = require('commander');
	program
	.option('-c, --conf [path]', 'config file path')
	.option('-p, --port [port]', 'listening port. default 3001')
	.option('-l, --listen [listen]', 'listening address. default 0.0.0.0. set :: if listening ipv6')
	.option('-o, --cluster-port [cluster-port]', 'cluster API port')
	.option('-d, --directory [directory]', 'Base directory')
	.option('-n, --newrelic', 'NewRelic')
	.parse(process.argv);

var config = require('./configurator');

//config
config.configure(program.conf || './conf/local/app.json');

GLOBAL.mode = config.app.mode;
GLOBAL.casso = config.casso;
GLOBAL.mysqlConf = config.mysqlConf;
GLOBAL.__libpath = __dirname + '/../..//lib';