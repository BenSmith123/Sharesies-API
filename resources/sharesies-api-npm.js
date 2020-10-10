import fetch from "node-fetch";

function urlBuilder(path) {
  return `https://app.sharesies.nz/api/${path}`;
}
const AUTH_URL = urlBuilder("identity/login");
const CHECK_URL = urlBuilder("identity/check");
const STATS_URL = urlBuilder("accounting/stats-v3");
const FUND_LIST_URL = urlBuilder("fund/list");
const TRANS_HIST_URL = urlBuilder("accounting/transaction-history");
const FUND_HIST_URL = urlBuilder("fund/price-history?first=0001-01-01");

export default class Sharesies {
  #cookie;
  constructor() {}
  async authenticate({ email, password }) {
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
  async check({ cookie } = {}) {
    const response = await fetch(CHECK_URL, {
      headers: { cookie: cookie || this.#cookie },
    });
    return response.json();
  }
  async stats({ cookie } = {}) {
    this.mustAuth(!cookie);
    const response = await fetch(STATS_URL + `?acting_as_id=${this.user.id}`, {
      headers: { cookie: cookie || this.#cookie },
    });
    return response.json();
  }
  async list() {
    const response = await fetch(FUND_LIST_URL);
    this.share_list = await response.json();
    return this.share_list;
  }
  async transactionHistory({ cookie, limit = 50 } = {}) {
    this.mustAuth(!cookie);
    const response = await fetch(
      `${TRANS_HIST_URL}?acting_as_id=${this.user.id}&limit=${limit}`,
      {
        headers: { cookie: cookie || this.#cookie },
      }
    );
    return await response.json();
  }
  async fundHistory({ fund_id } = {}) {
    const response = await fetch(`${FUND_HIST_URL}&fund_id=${fund_id}`);
    return await response.json();
  }
  mustAuth(bool) {
    if (bool && !this.user) {
      throw new Error("Must authenticate first.");
    }
  }
}