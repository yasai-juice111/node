var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	req.session.destroy();
  	console.log('deleted sesstion');
	res.render('logout/index', {});
});

module.exports = router;
