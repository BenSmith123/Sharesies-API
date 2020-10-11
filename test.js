
require('dotenv').config();
const fs = require('fs');
const { cookie } = require('./authResponse.json'); // debug

const sharesies = require('./src/index');
// const sharesies = require('sharesies'); <-- for published npm package

(async () => {

	console.log('Starting..');

	const credentials = {
		email: process.env.EMAIL,
		password: process.env.PASSWORD
	};

	/// /// ///
	// TEMP skip logging in when you can to avoid spamming sharesies API
	// const authResponse = await sharesies.authenticate(credentials);

	// debug - store the last auth details to avoid spamming sharesies login
	// fs.writeFileSync('authResponse.json', JSON.stringify(authResponse));
	/// /// ///

	const data = await sharesies.fundList();

	console.log(data);

})();
