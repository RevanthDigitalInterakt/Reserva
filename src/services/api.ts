import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reserva.hubin.io/iomanager/api/flows/execute/route',
});

const apiCategories = axios.create({
  baseURL: 'https://front.usereserva.com/menu',
});

api.defaults.headers.common['x-hubin-access-token'] =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJSZXNlcnZhIE1vYmlsZSIsInRlbmFudCI6InJlc2VydmEiLCJ0eXBlVG9rZW4iOiIyIiwiZXhwIjoxMDI1OTQ1NTM0Mjk3OX0.4DSA_DU4Rr1UMb0lYc9HkKqr73svTIwbPbUGXGEKHvE';

export { api, apiCategories };
