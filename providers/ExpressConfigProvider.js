var	rootPath		= require('app-root-path');
var bodyParser 		= require('body-parser');
var morgan			= require('morgan');
var flash 			= require('connect-flash');
var cookieSession 	= require('cookie-session');

module.exports = function(app, express){
	app.use(function(req, res, next){
		res.header("Cache-Control", "public, max-age=2629743");
		next();
	});

	app.use(cookieSession({
	    keys: ['sdfhsdfjhsjdfjhjhh423j4', 'sdfsdfsdfsdfisd6f6sdf']
	}));
	app.use(flash());

	app.use(morgan('tiny'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: true
	}));

	app.use(express.static(rootPath + '/public'));

	return app;
};