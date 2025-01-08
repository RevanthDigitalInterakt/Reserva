  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = AddZipCodeDelivery;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function AddZipCodeDelivery(_ref) {
    var label = _ref.label,
      description = _ref.description,
      _ref$icon = _ref.icon,
      icon = _ref$icon === undefined ? 'infoSuccess' : _ref$icon,
      onPress = _ref.onPress;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TouchableOpacity, {
      onPress: onPress,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[5]).addZipCodeDeliveryStyles.buttonContainer,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[5]).addZipCodeDeliveryStyles.labelWrap,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_IconComponent.default, {
            icon: icon,
            style: _$$_REQUIRE(_dependencyMap[5]).addZipCodeDeliveryStyles.iconRight
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[5]).addZipCodeDeliveryStyles.textTitle,
              children: label
            }), description && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[5]).addZipCodeDeliveryStyles.textDescription,
              children: description
            })]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_IconComponent.default, {
          icon: "chevronRight"
        })]
      })
    });
  }
