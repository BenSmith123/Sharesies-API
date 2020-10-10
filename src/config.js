
const URL_BASE = 'https://app.sharesies.nz/api';

const ENDPOINTS = {
	LOGIN: `${URL_BASE}/identity/login`,
	LOGOUT: `${URL_BASE}/identity/logout`,
	CHECK: `${URL_BASE}/identity/check`,
	STATS: `${URL_BASE}/accounting/stats-v3`,
	FUND_LIST: `${URL_BASE}/fund/list`,
	TRANS_HIST: `${URL_BASE}/accounting/transaction-history`,
	FUND_HIST: `${URL_BASE}/fund/price-history?first=0001-01-01`
};

module.exports = {
	URL_BASE,
	ENDPOINTS
};
