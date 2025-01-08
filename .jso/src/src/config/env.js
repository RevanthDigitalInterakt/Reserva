  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.env = undefined;
  var dev = {
    ONE_SIGINAL_APP_KEY_IOS: 'cf6780d3-1fb7-4b31-8c0b-eb96986a8ac6',
    BASE_URL_IMAGE: 'https://www.usereserva.com',
    BASE_URL_COLLECTION_IMAGE: 'https://www.usereserva.com/ccstore/v1/images/?source=/file',
    APPSFLYER: {
      DEV_KEY: 't2ftFUHavfa3SdZbztC6EK',
      APP_ID: '1566861458'
    }
  };
  var production = Object.assign({}, dev, {
    ONE_SIGINAL_APP_KEY_IOS: 'cf6780d3-1fb7-4b31-8c0b-eb96986a8ac6',
    BASE_URL_IMAGE: 'https://www.usereserva.com',
    BASE_URL_COLLECTION_IMAGE: 'https://www.usereserva.com/ccstore/v1/images/?source=/file',
    APPSFLYER: {
      DEV_KEY: 't2ftFUHavfa3SdZbztC6EK',
      APP_ID: '1566861458'
    }
  });
  var env = exports.env = production;
