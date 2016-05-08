var email = require('emailjs');

module.exports = function(){
	var mailer = email.server.connect({
		user: 		process.env.MAIL_USER,
		password: 	process.env.MAIL_PASS,
		host: 		process.env.MAIL_HOST,
		port: 		process.env.MAIL_PORT,
		ssl: 		true
	});

	return mailer;
};