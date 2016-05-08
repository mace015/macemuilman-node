module.exports = function(app, mailer, nunjucks){
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
}