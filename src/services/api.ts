import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://reserva-gateway.gateway.linkapi.solutions/v1/',
  headers: {
    Authorization:
      'Basic YmY3ZWRlYTMtYmMwOS00OTUxLWIwZDMtYmI0MTI0MjUyNTdjOjkyZTA1MDQ0LTY0ODctNGMxNS05ZDMyLTRmZmQ0NmNkYTYyZA==',
  },
})

const apiBffProducts = axios.create({
  baseURL: 'https://rsv-bff-linkapi.rj.r.appspot.com/',
})

// nao e link
const apiCategories = axios.create({
  baseURL: 'https://front.usereserva.com/menu',
})

const setAuthorizationToken = (accessToken: string) => {
  api.defaults.headers.common['client-token'] = accessToken
}

const removeAuthorizationToken = () => {
  api.defaults.headers.common['client-token'] = null
}

export { api, apiCategories, setAuthorizationToken, removeAuthorizationToken }
