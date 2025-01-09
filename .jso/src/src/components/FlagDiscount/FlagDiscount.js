  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FlagDiscount = FlagDiscount;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function FlagDiscount(_ref) {
    var discountTag = _ref.discountTag,
      isDetail = _ref.isDetail;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
      style: Object.assign({}, _$$_REQUIRE(_dependencyMap[5]).styles.box, {
        marginLeft: isDetail ? 4 : 14,
        marginTop: 4,
        padding: isDetail ? 6 : 4
      }),
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.Text, {
        style: Object.assign({}, _$$_REQUIRE(_dependencyMap[5]).styles.textPercentage, {
          fontSize: isDetail ? 20 : _configDeviceSizes.default.DEVICE_WIDTH * 0.040
        }),
        children: [discountTag, "%"]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
        style: Object.assign({}, _$$_REQUIRE(_dependencyMap[5]).styles.textOff, {
          fontSize: isDetail ? 20 : _configDeviceSizes.default.DEVICE_WIDTH * 0.040
        }),
        children: "OFF"
      })]
    });
  }
