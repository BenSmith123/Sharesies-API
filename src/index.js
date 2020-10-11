
const axios = require('axios');

const URL_BASE = 'https://app.sharesies.nz/api';

const ENDPOINTS = {
	LOGIN: `${URL_BASE}/identity/login`,
	LOGOUT: `${URL_BASE}/identity/logout`,
	CHECK: `${URL_BASE}/identity/check`,
	STATS: `${URL_BASE}/accounting/stats-v3`,
	INFO: `${URL_BASE}/instruments/info`,
	FUND_LIST: `${URL_BASE}/fund/list`,
	TRANS_HIST: `${URL_BASE}/accounting/transaction-history`,
	FUND_HIST: `${URL_BASE}/fund/price-history?first=0001-01-01`
};


// let cookie = null;
let cookie = null;
let user = null;
let userId = null;


/**
 * Returns the currently logged in user, or null if user has not yet logged in
 *
 * @returns {object}
 */
function getUser() {
	return user;
}


/**
 * Returns true once user has been signed in
 *
 * @param {object} auth
 * @param {string} auth.email
 * @param {string} auth.password
 * @returns {Promise<Boolean>}
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

	const res = await axios(req);

	// TODO - validate successful login
	if (!res.headers['set-cookie'][1] || !res.data.user) { throw new Error('Failed to login: Auth cookie or user data was not returned'); }

	cookie = res.headers['set-cookie'][1]; // TODO - why this header (in browser it looks like a different value is sent)
	user = res.data.user; // TODO - need to store this?
	userId = res.data.user.id;

	return { cookie, user };
}


/**
 * Returns the [GET] sharesies API response
 *
 * @param {string} endpoint
 * @param {string=} queryParams
 */
async function sharesiesAPI(endpoint, queryParams = '') {

	if (!cookie) { throw new Error('No cookie set, you must authenticate first'); }

	const req = {
		url: queryParams
			? endpoint + queryParams + userId // attach userId to any API request that has query params
			: endpoint,
		headers: { cookie }
	};

	const res = await axios(req);

	return res.data;
}


module.exports = {
	authenticate,
	check: () => sharesiesAPI(ENDPOINTS.CHECK),
	stats: () => sharesiesAPI(ENDPOINTS.STATS, '?acting_as_id='),
	info: () => sharesiesAPI(ENDPOINTS.INFO),
	fundList: () => sharesiesAPI(ENDPOINTS.FUND_LIST, '?limit=50&acting_as_id='),
	transHist: () => sharesiesAPI(ENDPOINTS.TRANS_HIST),
	fundHist: () => sharesiesAPI(ENDPOINTS.FUND_HIST),
	cookie // TODO - remove from exports (only exported as debug to avoid spamming sharesies login)
};
