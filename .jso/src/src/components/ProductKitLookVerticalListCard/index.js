  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProductKitLookVerticalListCard = ProductKitLookVerticalListCard;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function ProductKitLookVerticalListCard(_ref) {
    var imageSource = _ref.imageSource,
      onClickImage = _ref.onClickImage,
      productTitle = _ref.productTitle,
      testID = _ref.testID;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
      style: _styles.default.mainContainer,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
        onPress: function onPress() {
          if (onClickImage) {
            onClickImage();
          }
        },
        testID: testID,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ImageComponent.default, {
          source: {
            uri: imageSource
          },
          width: _configDeviceSizes.default.DEVICE_WIDTH * 0.45,
          height: 240
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
        style: _styles.default.childContainer,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: _styles.default.textContainer,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
            style: _styles.default.textTitle,
            children: productTitle
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconComponent.default, {
          icon: "arrowBack"
        })]
      })]
    });
  }
