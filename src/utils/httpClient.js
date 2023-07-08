import CONFIG from './config';

class HttpClient {
  constructor(options = {}) {}

  async _fetchJSON(endpoint, options = {}) {
    const res = await fetch(CONFIG.API_URL + endpoint, {
      ...options,
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    if (options.parseResponse !== false && res.status !== 204) {
      return res.json();
    }

    return undefined;
  }

  objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
      );
    }
    return keyValuePairs.join('&');
  }

  get(endpoint, params = [], options = {}) {
    return this._fetchJSON(endpoint + '?' + this.objToQueryString(params), {
      ...options,
      method: 'GET',
    });
  }

  post(endpoint, body, options = {}) {
    return this._fetchJSON(endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
      method: 'POST',
    });
  }
}

let client = new HttpClient();
export {client as httpClient};
