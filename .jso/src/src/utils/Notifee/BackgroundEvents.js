  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _messaging = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative2 = _$$_REQUIRE(_dependencyMap[4]);
  var _useAsyncStorageProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  /* eslint-disable react-hooks/rules-of-hooks */

  var onBackgroundEventPush = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* () {
      var _useAsyncStorageProvi = (0, _useAsyncStorageProvider.default)(),
        setItem = _useAsyncStorageProvi.setItem,
        getItem = _useAsyncStorageProvi.getItem;
      if (_reactNative2.Platform.OS === 'ios') {
        yield (0, _messaging.default)().requestPermission();
      }
      (0, _messaging.default)().setBackgroundMessageHandler(/*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)(function* (remoteMessage) {
          var _remoteMessage$data;
          var channelId = yield _reactNative.default.createChannel({
            id: 'default',
            name: 'Default Channel'
          });
          if (!(remoteMessage != null && (_remoteMessage$data = remoteMessage.data) != null && _remoteMessage$data.data)) return;
          if (remoteMessage != null && remoteMessage.data) {
            var _remoteMessage$data2;
            var _JSON$parse = JSON.parse((remoteMessage == null ? undefined : (_remoteMessage$data2 = remoteMessage.data) == null ? undefined : _remoteMessage$data2.data) || '{}'),
              details = _JSON$parse.details,
              reference = _JSON$parse.reference,
              notification = _JSON$parse.notification;
            yield setItem('@DitoNotification:Id', notification);
            yield setItem('@DitoNotification:Ref', reference);
            var link = (details == null ? undefined : details.link) || '';
            var title = (details == null ? undefined : details.title) || '';
            var body = (details == null ? undefined : details.message) || '';
            var bigText = body || ' ';
            var hasLink = link || 'usereserva://home-tabs';
            try {
              _reactNative.default.displayNotification({
                title: title,
                body: body,
                data: {
                  hasLink: hasLink
                },
                android: {
                  channelId: channelId,
                  smallIcon: 'ic_stat_onesignal_default',
                  color: '#c41010',
                  pressAction: {
                    id: 'default'
                  },
                  style: {
                    type: _reactNative.AndroidStyle.BIGTEXT,
                    text: bigText
                  }
                },
                ios: {}
              });
            } catch (error) {
              _$$_REQUIRE(_dependencyMap[6]).ExceptionProvider.captureException(error);
            }
          }
        });
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
      _reactNative.default.onForegroundEvent(/*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)(function* (_ref3) {
          var _detail$notification, _detail$notification$;
          var type = _ref3.type,
            detail = _ref3.detail;
          if (type === _reactNative.EventType.PRESS && (_detail$notification = detail.notification) != null && (_detail$notification$ = _detail$notification.data) != null && _detail$notification$.hasLink) {
            var _detail$notification2, _detail$notification3;
            var dataLink = (_detail$notification2 = detail.notification) == null ? undefined : (_detail$notification3 = _detail$notification2.data) == null ? undefined : _detail$notification3.hasLink;
            yield _reactNative2.Linking.openURL(dataLink);
            var notificationId = yield getItem('@DitoNotification:Id');
            var reference = yield getItem('@DitoNotification:Ref');
            if (notificationId && reference) {
              yield (0, _$$_REQUIRE(_dependencyMap[7]).pushClicked)(notificationId, reference);
            }
          }
        });
        return function (_x2) {
          return _ref4.apply(this, arguments);
        };
      }());
      _reactNative.default.onBackgroundEvent(/*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)(function* (_ref5) {
          var _detail$notification4, _detail$notification5;
          var type = _ref5.type,
            detail = _ref5.detail;
          if (type === _reactNative.EventType.PRESS && (_detail$notification4 = detail.notification) != null && (_detail$notification5 = _detail$notification4.data) != null && _detail$notification5.hasLink) {
            var _detail$notification6, _detail$notification7;
            var dataLink = (_detail$notification6 = detail.notification) == null ? undefined : (_detail$notification7 = _detail$notification6.data) == null ? undefined : _detail$notification7.hasLink;
            yield _reactNative2.Linking.openURL(dataLink);
            var notificationId = yield getItem('@DitoNotification:Id');
            var reference = yield getItem('@DitoNotification:Ref');
            if (notificationId && reference) {
              yield (0, _$$_REQUIRE(_dependencyMap[7]).pushClicked)(notificationId, reference);
            }
          }
        });
        return function (_x3) {
          return _ref6.apply(this, arguments);
        };
      }());
    });
    return function onBackgroundEventPush() {
      return _ref.apply(this, arguments);
    };
  }();
  var _default = exports.default = onBackgroundEventPush;
