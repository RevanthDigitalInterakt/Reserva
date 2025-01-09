  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.urlBase = exports.url = exports.instance7 = exports.instance5 = exports.instance4 = exports.instance3 = exports.instance2 = exports.instance = undefined;
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _axios = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _applyCookieHeader = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var urlBase = exports.urlBase = _reactNativeConfig.default.URL_BASE;
  var urlBase2 = _reactNativeConfig.default.URL_BASE2;
  var urlUser = _reactNativeConfig.default.URL_USER;
  var sendEmail = _reactNativeConfig.default.URL_SEND_EMAIL;
  var url = exports.url = urlBase;
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  var instance = exports.instance = _axios.default.create({
    baseURL: url,
    timeout: 30000,
    headers: headers
  });
  var instance2 = exports.instance2 = _axios.default.create({
    baseURL: urlBase2,
    timeout: 30000,
    headers: headers
  });
  var instance3 = exports.instance3 = _axios.default.create({
    baseURL: urlUser,
    timeout: 30000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  var instance4 = exports.instance4 = _axios.default.create({
    baseURL: sendEmail,
    timeout: 30000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  var instance5 = exports.instance5 = _axios.default.create({
    baseURL: urlBase2,
    timeout: 30000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  var instance7 = exports.instance7 = _axios.default.create({
    baseURL: urlBase,
    timeout: 30000,
    headers: headers
  });
  var instance8 = _axios.default.create({
    baseURL: _reactNativeConfig.default.URL_VTEX_QA,
    timeout: 30000,
    headers: headers
  });
  instance.interceptors.request.use(function (config) {
    return (0, _applyCookieHeader.default)(config);
  });
  instance2.interceptors.request.use(function (config) {
    return (0, _applyCookieHeader.default)(config);
  });
  instance3.interceptors.request.use(function (config) {
    return (0, _applyCookieHeader.default)(config);
  });
  instance4.interceptors.request.use(function (config) {
    return (0, _applyCookieHeader.default)(config);
  });
  instance5.interceptors.request.use(function (config) {
    return (0, _applyCookieHeader.default)(config);
  });
  instance7.interceptors.request.use(function (config) {
    return (0, _applyCookieHeader.default)(config);
  });
  instance8.interceptors.request.use(function (config) {
    return (0, _applyCookieHeader.default)(config);
  });
