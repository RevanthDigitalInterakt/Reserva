  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pushClicked = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var pushClicked = exports.pushClicked = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (notificationId, reference) {
      try {
        yield _$$_REQUIRE(_dependencyMap[2]).ditoNotificationsApi.post(`/notifications/${notificationId}/open`, Object.assign({}, _$$_REQUIRE(_dependencyMap[2]).configs, {
          channel_type: 'mobile',
          data: {
            identifier: notificationId,
            reference: reference
          }
        }));
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(error);
      }
    });
    return function pushClicked(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
