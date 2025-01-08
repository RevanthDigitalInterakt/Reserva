  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Modal = Modal;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function Modal(_ref) {
    var isVisible = _ref.isVisible,
      handleClose = _ref.handleClose,
      title = _ref.title,
      description = _ref.description;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNativeModal.default, {
      avoidKeyboard: true,
      onBackdropPress: handleClose,
      isVisible: isVisible,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, Object.assign({}, (0, _testProps.default)('check_the_rules_container'), {
        style: _styles.default.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _styles.default.header,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, Object.assign({}, (0, _testProps.default)('check_the_rules_title_modal'), {
            style: _styles.default.title,
            children: title || ''
          })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
            onPress: handleClose,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconComponent.default, {
              icon: "close",
              style: {
                width: 24,
                height: 24
              }
            })
          })]
        }), description]
      }))
    });
  }
