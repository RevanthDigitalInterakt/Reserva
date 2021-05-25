import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://reserva-gateway.gateway.linkapi.solutions/v1/",
  headers: {
    Authorization:
      "Basic YmY3ZWRlYTMtYmMwOS00OTUxLWIwZDMtYmI0MTI0MjUyNTdjOjkyZTA1MDQ0LTY0ODctNGMxNS05ZDMyLTRmZmQ0NmNkYTYyZA==",
  },
});

const apiCategories = axios.create({
  baseURL: "https://front.usereserva.com/menu",
});

const setAuthorizationToken = (accessToken: string) => {
  api.defaults.headers.common["client-token"] = accessToken;
};

const removeAuthorizationToken = () => {
  api.defaults.headers.common["client-token"] = null;
};

// api.interceptors.response.use((response) => {
//   return response
// },
//  (error) => {
//   const originalRequest: AxiosRequestConfig = error.config;
//   if (error.response.status === 401) {
//       return api.post('/auth/token',
//           {
//             "refresh_token": originalRequest.headers[]
//           })
//           .then(res => {
//               if (res.status === 201) {
//                   // 1) put token to LocalStorage
//                   //localStorageService.setToken(res.data);

//                   // 2) Change Authorization header
//                   api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();

//                   // 3) return originalRequest object with Axios.
//                   return axios(originalRequest);
//               }
//           })
//   }

export { api, apiCategories, setAuthorizationToken, removeAuthorizationToken };
