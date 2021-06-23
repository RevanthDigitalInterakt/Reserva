import axios from "axios";

const urlBase = "https://lojausereserva.vtexcommercestable.com.br/api/";

const url = urlBase;

const AppKey = "12341234";
const AppToken = "1234123123123123112";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-VTEX-API-APPKEY": AppKey,
  "X-VTEX-API-APPTOKEN": AppToken,
};

const instance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers: headers,
});

export { instance as default, url, urlBase };
