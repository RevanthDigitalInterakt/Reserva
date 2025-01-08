  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function ProductNotFound() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
      bg: "white",
      height: _configDeviceSizes.default.DEVICE_HEIGHT,
      mt: "xxl",
      alignItems: "center",
      px: "micro",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        mb: "sm",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_IconComponent.default, {
          width: 120,
          height: 120,
          icon: "searchNotFound"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
          fontFamily: "nunitoRegular",
          fontSize: 13,
          textAlign: "center",
          children: "N\xE3o encontramos produtos que corresponde a sua busca."
        })
      })]
    });
  }
  var _default = exports.default = ProductNotFound;
