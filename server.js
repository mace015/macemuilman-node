var express 		= require('express');
var app 			= express();

require('dotenv').config();

var port = process.env.APP_PORT;

// Require all application service providers.
var mailer = require('./providers/MailerProvider.js')();
var nunjucks = require('./providers/NunjucksProvider.js')(app);
var app = require('./providers/ExpressConfigProvider.js')(app, express);

// Require all application controllers.
require('./controllers/PagesController.js')(app, mailer, nunjucks);

app.use(function(req, res){
	res.redirect('/');
});

app.listen(port, function(){
	console.log('Webserver running on port ' + port);
});