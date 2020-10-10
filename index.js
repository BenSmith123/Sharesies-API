
const axios = require('axios');

const { ENDPOINTS } = require('./config');


// main - test these functions!
(async () => {

})();


async function authenticate(email, password) {

	const req = {
		url: ENDPOINTS.AUTH,
		method: 'post',
		body: JSON.stringify({ email, password }),
		headers: { 'Content-Type': 'application/json' },
	};

	try {
		const res = await axios(req);


	} catch (err) {
		// TODO
	}

}


module.exports = {
	authenticate,
};

/*
  async function authenticate2({ email, password }) {
    const response = await fetch(AUTH_URL, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    this.#cookie = response.headers.raw()["set-cookie"][1];
    this.user = (await response.json()).user;
    console.log(this.#cookie);
    if (this.user.email !== email) throw new Error("Incorrect login details");
    return this.user;
  }
  */
