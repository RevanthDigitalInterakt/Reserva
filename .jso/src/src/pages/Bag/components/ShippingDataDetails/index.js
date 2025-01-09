  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ShippingDataDetails;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function ShippingDataDetails(_ref) {
    var type = _ref.type,
      _ref$store = _ref.store,
      store = _ref$store === undefined ? '' : _ref$store,
      onPress = _ref.onPress;
    var isIOS = _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[4]).platformType.IOS;
    var shadownContainer = [_$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.container, isIOS ? _$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.shadowIOS : _$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.shadowAndroid];
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
      style: [_$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.container, shadownContainer],
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.contentWrap,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.containerWrap,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_IconComponent.default, {
            icon: "greenCheck",
            style: _$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.iconRight
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.title,
              children: type
            }), store && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.description,
              children: store
            })]
          })]
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, {
        onPress: onPress,
        hitSlop: 20,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.buttonWrap,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[5]).shippingDataDetailsStyles.edit,
            children: "Editar"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_IconComponent.default, {
              icon: "chevronRight"
            })
          })]
        })
      })]
    });
  }
