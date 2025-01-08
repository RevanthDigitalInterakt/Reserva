  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Exchange;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeWebview = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function Exchange(_ref) {
    var route = _ref.route;
    var url = route.params.url;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeWebview.default, {
      source: {
        uri: url
      }
    });
  }
