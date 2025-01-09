  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ditoUsersApi = exports.ditoNotificationsApi = exports.ditoEventsApi = exports.configs = undefined;
  var _axios = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var configs = exports.configs = {
    platform_api_key: _reactNativeConfig.default.DITO_PLATFORM_API_KEY,
    sha1_signature: _reactNativeConfig.default.DITO_SHA1_SIGNATURE,
    id_type: 'id',
    network_name: 'pt'
  };
  var headers = {
    accept: 'application/json',
    Accept: 'application/json;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8'
  };
  var ditoUsersApi = exports.ditoUsersApi = _axios.default.create({
    baseURL: 'https://login.plataformasocial.com.br',
    headers: headers
  });
  var ditoEventsApi = exports.ditoEventsApi = _axios.default.create({
    baseURL: 'https://events.plataformasocial.com.br',
    headers: headers
  });
  var ditoNotificationsApi = exports.ditoNotificationsApi = _axios.default.create({
    baseURL: 'https://notification.plataformasocial.com.br',
    headers: headers
  });
