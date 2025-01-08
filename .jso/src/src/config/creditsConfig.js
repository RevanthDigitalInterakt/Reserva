  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.creditsInstance = undefined;
  var _axios = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var urlProd = 'https://bff-cashback.usereserva.com';
  var urlDev = 'https://bff-cashback.usereserva.com';
  var url = urlProd;
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  var creditsInstance = exports.creditsInstance = _axios.default.create({
    baseURL: url,
    timeout: 30000,
    headers: headers
  });
