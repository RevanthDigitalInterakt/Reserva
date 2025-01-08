  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useNotification = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _$$_REQUIRE(_dependencyMap[4]);
  var _messaging = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[6]);
  var _reactNative2 = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var useNotification = exports.useNotification = function useNotification() {
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      channelId = _useState2[0],
      setChannelId = _useState2[1];
    var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      notifications = _useState4[0],
      setNotifications = _useState4[1];
    (0, _react.useEffect)(function () {
      var notify = /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)(function* () {
          if (notifications.length) {
            for (var i = 0; i < notifications.length; i++) {
              var _notifications$i, _notifications$i$data;
              var data = JSON.parse((_notifications$i = notifications[i]) == null ? undefined : (_notifications$i$data = _notifications$i.data) == null ? undefined : _notifications$i$data.data);
              var details = data.details;
              if (details != null && details.title && details != null && details.message) {
                var not = {
                  title: String(details.title),
                  body: String(details.message),
                  android: {
                    channelId: channelId,
                    importance: _reactNative2.AndroidImportance.HIGH
                  },
                  data: {
                    notification: String(data.notification),
                    reference: String(data.reference),
                    link: String(details.link)
                  }
                };
                yield _reactNative2.default.displayNotification(not);
              }
            }
            setNotifications([]);
          }
        });
        return function notify() {
          return _ref.apply(this, arguments);
        };
      }();
      notify();
    }, [notifications]);
    var onMessageReceived = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (message) {
        var hasNotifiedBefore = notifications.find(function (notification) {
          var _notification$data, _notification$data$de, _message$data, _message$data$details;
          return (notification == null ? undefined : (_notification$data = notification.data) == null ? undefined : (_notification$data$de = _notification$data.details) == null ? undefined : _notification$data$de.notification) === ((_message$data = message.data) == null ? undefined : (_message$data$details = _message$data.details) == null ? undefined : _message$data$details.notification);
        });
        if (!hasNotifiedBefore) {
          setNotifications(function (prev) {
            return [].concat((0, _toConsumableArray2.default)(prev), [message]);
          });
        }
      });
      return function onMessageReceived(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      var unsubscribe = (0, _messaging.default)().onMessage(onMessageReceived);
      (0, _messaging.default)().setBackgroundMessageHandler(onMessageReceived);
      _reactNative2.default.onBackgroundEvent(function () {
        return true;
      });
      var createChannel = /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)(function* () {
          setChannelId(yield _reactNative2.default.createChannel({
            id: 'DITO',
            name: 'Dito Notification',
            importance: _reactNative2.AndroidImportance.HIGH
          }));
        });
        return function createChannel() {
          return _ref3.apply(this, arguments);
        };
      }();
      createChannel();
      return unsubscribe;
    }, []);
    (0, _react.useEffect)(function () {
      var handleClickOnNotification = _reactNative2.default.onForegroundEvent(/*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)(function* (_ref4) {
          var _detail$notification, _detail$notification$;
          var type = _ref4.type,
            detail = _ref4.detail;
          switch (type) {
            case _reactNative2.EventType.DISMISSED:
              break;
            case _reactNative2.EventType.PRESS:
              var link = String((_detail$notification = detail.notification) == null ? undefined : (_detail$notification$ = _detail$notification.data) == null ? undefined : _detail$notification$.link);
              if (!link) {
                break;
              }
              try {
                yield _reactNative.Linking.openURL(link);
              } catch (error) {
                console.error(error);
              }
              break;
          }
        });
        return function (_x2) {
          return _ref5.apply(this, arguments);
        };
      }());
      return handleClickOnNotification;
    }, []);
    return {
      onMessageReceived: onMessageReceived
    };
  };
