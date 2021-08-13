import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

//app-vtex.usereserva.com

const api = axios.create({
  baseURL: "https://reserva-gateway.gateway.linkapi.solutions/v1/",
  headers: {
    Authorization:
      "Basic YmY3ZWRlYTMtYmMwOS00OTUxLWIwZDMtYmI0MTI0MjUyNTdjOjkyZTA1MDQ0LTY0ODctNGMxNS05ZDMyLTRmZmQ0NmNkYTYyZA==",
  },
});

const apiBffProducts = axios.create({
  baseURL: "https://rsv-bff-linkapi.rj.r.appspot.com/",
});

// nao e link
const apiCategories = axios.create({
  baseURL: "https://front.usereserva.com/menu",
});

const setAuthorizationToken = (accessToken: string) => {
  api.defaults.headers.common["client-token"] = accessToken;
};

const removeAuthorizationToken = () => {
  api.defaults.headers.common["client-token"] = null;
};

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const originalRequest: AxiosRequestConfig = error.config;
//     if (error.response.status === 401 || error.response.status === 500) {
//       return api.post("/profiles/refresh").then((res: AxiosResponse) => {
//         if (res.status === 200) {
//           setAuthorizationToken(res.data?.access_token);

//           originalRequest.headers["client-token"] = res.data?.access_token;

//           return axios(originalRequest);
//         }
//       });
//     }
//   }
// );

export {
  api,
  apiCategories,
  setAuthorizationToken,
  removeAuthorizationToken,
  apiBffProducts,
};
