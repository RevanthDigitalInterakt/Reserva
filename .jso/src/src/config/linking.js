  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.urlHandler = exports.linkingConfig = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _messaging = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNativeAppsflyer = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var routesConfig = {
    screens: {
      Main: {
        initialRouteName: 'HomeTabs',
        screens: {
          WishList: 'wishlist',
          BagScreen: {
            path: 'bag/:orderFormId?'
          },
          RonRedirectToBag: {
            path: 'ron/:ronCode'
          },
          AsyncDeepLink: {
            path: 'asyncDeepLink/:reducerKey'
          },
          HomeTabs: {
            path: 'home-tabs',
            screens: {
              Offers: 'ofertas',
              NewOffersPage: 'colecao-ofertas',
              WishList: 'wishlist',
              Profile: 'profile',
              Call: 'call-center'
            }
          },
          ProductDetail: {
            path: 'product'
          },
          ProductCatalog: {
            path: 'catalog/:referenceId'
          },
          MY_CASHBACK_MY_WALLET: {
            path: 'wallet-cashback'
          },
          PrimeLP: {
            path: 'prime'
          },
          FacaVc: {
            path: 'facavc/criar/:category/:type/:custom'
          },
          Newsletter: {
            path: 'newsletter'
          }
        }
      }
    }
  };
  var urlHandler = exports.urlHandler = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (url) {
      var currentDeepLink = yield (0, _$$_REQUIRE(_dependencyMap[5]).deepLinkHelper)(url);
      if (currentDeepLink) return currentDeepLink;
      if (_reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[6]).platformType.IOS) {
        _reactNative.Linking.openURL(url);
      }
      return _$$_REQUIRE(_dependencyMap[7]).defaultInitialUrl;
    });
    return function urlHandler(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var linkingConfig = exports.linkingConfig = {
    prefixes: ['usereserva://', 'https://www.usereserva.com/', 'https://usereserva.io/', 'https://now.usereserva.io/', 'https://dito.vc/'],
    config: routesConfig,
    getPathFromState: function getPathFromState(state) {
      return (0, _$$_REQUIRE(_dependencyMap[8]).getPathFromState)(state) || '';
    },
    getInitialURL: function () {
      var _getInitialURL = (0, _asyncToGenerator2.default)(function* () {
        var _remoteMessage$data;
        // Check if app was opened from a deep link
        var remoteMessage = yield (0, _messaging.default)().getInitialNotification();
        var _JSON$parse = JSON.parse((remoteMessage == null ? undefined : (_remoteMessage$data = remoteMessage.data) == null ? undefined : _remoteMessage$data.data) || '{}'),
          details = _JSON$parse.details;
        var ditoDeeplinkUrl = (details == null ? undefined : details.link) || '';
        if (ditoDeeplinkUrl) {
          // TODO import { pushClicked } from '../../services/ditoService';
          // TODO implementar o pushClicked da dito
          return urlHandler(ditoDeeplinkUrl);
        }
        var url = yield _reactNative.Linking.getInitialURL();
        if (url) {
          return urlHandler(url);
        }
        return undefined;
      });
      function getInitialURL() {
        return _getInitialURL.apply(this, arguments);
      }
      return getInitialURL;
    }(),
    subscribe: function subscribe(listener) {
      var onReceiveURL = /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)(function* (_ref2) {
          var url = _ref2.url;
          var currentDeepLink = yield (0, _$$_REQUIRE(_dependencyMap[5]).deepLinkHelper)(url);
          if (!currentDeepLink) {
            if (_reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[6]).platformType.IOS) {
              _reactNative.Linking.openURL(url);
            }
          }
          listener(currentDeepLink || _$$_REQUIRE(_dependencyMap[7]).defaultInitialUrl);
        });
        return function onReceiveURL(_x2) {
          return _ref3.apply(this, arguments);
        };
      }();
      var onDeepLinkCanceller = _reactNativeAppsflyer.default.onDeepLink(/*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)(function* (res) {
          if ((res == null ? undefined : res.deepLinkStatus) !== 'NOT_FOUND') {
            var _res$data;
            var url = (_res$data = res.data) == null ? undefined : _res$data.deep_link_value;
            if (url) {
              var newUrl = yield (0, _$$_REQUIRE(_dependencyMap[5]).deepLinkHelper)(url);
              if (newUrl) {
                listener(newUrl);
              }
            }
          }
        });
        return function (_x3) {
          return _ref4.apply(this, arguments);
        };
      }());
      _reactNativeAppsflyer.default.initSdk({
        devKey: _$$_REQUIRE(_dependencyMap[9]).env.APPSFLYER.DEV_KEY,
        isDebug: false,
        appId: _$$_REQUIRE(_dependencyMap[9]).env.APPSFLYER.APP_ID,
        onInstallConversionDataListener: true,
        onDeepLinkListener: true,
        timeToWaitForATTUserAuthorization: 10
      }, function (_) {}, function (_) {});
      var unsubscribeFCM = (0, _messaging.default)().onNotificationOpenedApp(/*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)(function* (remoteMessage) {
          var _remoteMessage$data2;
          var _JSON$parse2 = JSON.parse((remoteMessage == null ? undefined : (_remoteMessage$data2 = remoteMessage.data) == null ? undefined : _remoteMessage$data2.data) || '{}'),
            details = _JSON$parse2.details;
          var url = (details == null ? undefined : details.link) || '';
          // TODO testar com app minimizado
          // TODO import { pushClicked } from '../../services/ditoService';
          // TODO implementar o pushClicked da dito
          var newUrl = yield (0, _$$_REQUIRE(_dependencyMap[5]).deepLinkHelper)(url);
          listener(newUrl);
        });
        return function (_x4) {
          return _ref5.apply(this, arguments);
        };
      }());
      var linkingSubscription = _reactNative.Linking.addEventListener('url', onReceiveURL);
      return function () {
        // Clean up the event listeners
        linkingSubscription.remove();
        onDeepLinkCanceller();
        unsubscribeFCM();
      };
    }
  };
