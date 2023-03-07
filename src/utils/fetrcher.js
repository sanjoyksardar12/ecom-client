import { getCookie } from ".";
import APP_CONSTANTS from "../constant";

const { APIS} = APP_CONSTANTS;
// TODO: refacrtor
class Fetcher {
  constructor(respInterceptors) {
    this.baseUrl = APIS.BACKEND_BASE_URL;
    this.options = {
      method: "GET",
      rediret: "follow",
    };
    this.headers = new Headers();
    this.respInterceptors = respInterceptors;
  }

  updateHeader() {
    this.headers.set("Authorization", `Bearer ${getCookie("token")}`);
    this.headers.set("Content-Type", "application/json");
    this.headers.set("Cookie", document.cookie);
  }
  async fetch(url, method, payload) {
    this.updateHeader();
    this.options = {
      ...this.options,
      method: method || "GET",
      headers: this.headers,
      body: JSON.stringify(payload),
    };

    // const resp = await fetch(url, this.options);
    // const result = await resp.json();
    // handle error properly with status code
    return fetch(this.baseUrl + url, this.options)
      .then((resp) => {
        return resp.json();
        // if (resp.ok) {
        //   return resp.json();
        // }
        // return resp.text();
      })
      .catch((err) => {
        debugger;
        console.log("err", err);
      });
  }

  get(url) {
    return this.fetch(url);
  }
  post(url, payload) {
    return this.fetch(url, "POST", payload);
  }
}
const addTokenToCookie = (res) => {
  const clonedResp = res.clone();

  console.log(
    "fetching token from resp header",
    clonedResp.headers["x-access-token"],
    clonedResp.headers("x-access-token")
  );
};

const fetcher = new Fetcher([addTokenToCookie]);
export default fetcher;

// fetch("http://localhost:3000/item/list", {
//   headers: {
//     accept: "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "cache-control": "no-cache",
//     "content-type": "application/json, application/json",
//     pragma: "no-cache",
//     "sec-ch-ua":
//       '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": '"macOS"',
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-access-token":
//       "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzYW5qb3kiLCJwYXNzd29yZCI6InNhcmRhciJ9.IRXE_bRqGAvGyx8RydW6VlbiqNTHZj5CFtonLpxJ3p8, eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzYW5qb3kiLCJwYXNzd29yZCI6InNhcmRhciJ9.IRXE_bRqGAvGyx8RydW6VlbiqNTHZj5CFtonLpxJ3p8",
//   },
//   referrer: "http://localhost:3000/listitem",
//   referrerPolicy: "strict-origin-when-cross-origin",
//   body: null,
//   method: "GET",
//   mode: "cors",
//   credentials: "include",
// });
