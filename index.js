
const axios = require('axios');

const { ENDPOINTS } = require('./config');


let cookie = null;
// let user = null;
const userId = null;


function checkCookie() {
	if (!cookie) { throw new Error('No cookie set, you must authenticate first'); }
}


/**
 * Returns the authentication cookie
 *
 * @param {string} email
 * @param {string} password
 */
async function authenticate({ email, password }) {

	if (!email || !password) { throw new Error('No email or password provided.'); }

	const req = {
		url: ENDPOINTS.LOGIN,
		method: 'post',
		data: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios(req);

		// TODO - validate successful login

		cookie = res.headers['set-cookie'][1]; // TODO - why this header (in browser it looks like a different value is sent)
		// user = res.data.user; // TODO - need to store this?
		// userId = res.data.user.id;

		return res;


	} catch (err) {
		// TODO
		console.error(err);

	}

}


async function check() {

	checkCookie();

	const req = {
		url: ENDPOINTS.CHECK,
		headers: {
			cookie
		}
	};

	try {
		const res = await axios(req);

		console.log(res);

		return res;
	} catch (err) {
		console.error(err);
	}
}


module.exports = {
	authenticate,
	check
};
