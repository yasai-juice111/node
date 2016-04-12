var express = require('express');
var router = express.Router();

// facade
var usersFacade = require(__libpath + '/models/facade/users_facade');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
  res.send('respond with a resource list');
});

router.get('/getList', function(req, res, next) {
	usersFacade.index(req, function(err, result){
 		res.send(result);
	});
});

module.exports = router;
