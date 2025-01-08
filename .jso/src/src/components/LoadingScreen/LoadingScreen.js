  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function LoadingScreen() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      mt: "xxl",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_lottieReactNative.default, {
        source: _$$_REQUIRE(_dependencyMap[5]).loadingSpinner,
        style: {
          width: 60
        },
        autoPlay: true,
        loop: true
      })
    });
  }
  var _default = exports.default = LoadingScreen;
