var express 		= require('express');
var nunjucks 		= require('nunjucks');
var bodyParser 		= require('body-parser');
var morgan			= require('morgan');
var flash 			= require('connect-flash');
var cookieSession 	= require('cookie-session');
var email			= require('emailjs');
var app 			= express();

require('dotenv').config();

var port = process.env.APP_PORT;

var mailer = email.server.connect({
	user: 		process.env.MAIL_USER,
	password: 	process.env.MAIL_PASS,
	host: 		process.env.MAIL_HOST,
	port: 		process.env.MAIL_PORT,
	ssl: 		true
});

nunjucks.configure('views', {
    autoescape: true,
    express: app
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

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('index.html', { current_page: 'index' });
});

app.get('/over', function(req, res){
	res.render('over.html', { current_page: 'over' });
});

app.get('/portfolio', function(req, res){
	res.render('portfolio.html', { current_page: 'portfolio' });
});

app.get('/contact', function(req, res){
	res.render('contact.html', { current_page: 'contact', gelukt: req.flash('gelukt'), errors: req.flash('errors') });
});

app.post('/contact', function(req, res){
	var post = req.body;

	if (post.naam == '' || post.email == '' || post.onderwerp == '' || post.bericht == ''){
		req.flash('errors', ['Niet alle velden zijn ingevuld!']);
	} else {
		mailer.send({
			from: 		'no-reply@macemuilman.nl',
			to : 		'mace@macemuilman.nl',
			subject: 	'Contact formulier Macemuilman.nl',
			text: 		nunjucks.render('emails/contact.html', post),
			attachment: [{ data: nunjucks.render('emails/contact.html', post), alternative: true }]
		});

		req.flash('gelukt', 'true');
	}

	return res.redirect('/contact');
});

app.use(function(req, res){
	res.redirect('/');
});

app.listen(port, function(){
	console.log('Webserver running on port ' + port);
});