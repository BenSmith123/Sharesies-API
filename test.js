
require('dotenv').config();

const sharesies = require('./src/index');
// const sharesies = require('sharesies'); <-- for published npm package

(async () => {

	console.log('Authenticating..');

	const credentials = {
		email: process.env.EMAIL,
		password: process.env.PASSWORD
	};

	const auth = await sharesies.authenticate(credentials);

	console.log(auth);

	// const a = await sharesies.check(cookie);
	// console.log(a);


})();
