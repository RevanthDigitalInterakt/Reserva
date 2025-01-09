  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cashbackInstance = undefined;
  var _axios = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var urlProd = 'https://api.opencashback.com.br/v1';
  var urlDev = 'https://api.opencashback.com.br/v1';
  var url = urlProd;
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-API-KEY': '9219ba22-bc04-4a31-a0e2-aba90451127e'
  };
  var cashbackInstance = exports.cashbackInstance = _axios.default.create({
    baseURL: url,
    timeout: 30000,
    headers: headers
  });
