  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GiftCardRulesModal = GiftCardRulesModal;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function GiftCardRulesModal(_ref) {
    var data = _ref.data,
      isVisible = _ref.isVisible,
      setIsVisible = _ref.setIsVisible,
      onPress = _ref.onPress;
    if (!data) return null;
    var handleCloseModal = function handleCloseModal() {
      return setIsVisible(false);
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNativeModal.default, {
      avoidKeyboard: true,
      onBackdropPress: handleCloseModal,
      isVisible: isVisible,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, Object.assign({}, (0, _testProps.default)('check_the_rules_container'), {
        style: _styles.default.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, Object.assign({}, (0, _testProps.default)('check_the_rules_title_modal'), {
          style: _styles.default.title,
          children: data.titleModal || ''
        })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, Object.assign({}, (0, _testProps.default)('check_the_rules_description_modal'), {
          style: _styles.default.rules,
          children: data.descriptionModal || ''
        })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('check_the_rules_button_continue'), {
          style: _styles.default.button,
          onPress: onPress,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
            style: _styles.default.buttonText,
            children: "CONTINUAR"
          })
        }))]
      }))
    });
  }
