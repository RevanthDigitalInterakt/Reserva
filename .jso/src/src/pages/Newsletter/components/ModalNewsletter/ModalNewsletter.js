  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalNewsletter = ModalNewsletter;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function ModalNewsletter(_ref) {
    var isVisible = _ref.isVisible,
      onBackdropPress = _ref.onBackdropPress;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNativeModal.default, Object.assign({
      isVisible: isVisible,
      onBackdropPress: onBackdropPress,
      animationInTiming: 300,
      animationIn: "fadeIn",
      animationOut: "fadeOut"
    }, (0, _testProps.default)('modal_newsletter'), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[7]).styles.modalWrapper,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[7]).styles.textContainer,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_IconComponent.default, {
            icon: "checkedRounded"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[7]).styles.text,
            children: "Inscri\xE7\xE3o conclu\xEDda com sucesso!"
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('go_home_button'), {
          onPress: onBackdropPress,
          style: _$$_REQUIRE(_dependencyMap[7]).styles.btnGoHome,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[7]).styles.txtBtnGoHome,
            children: "voltar para home"
          })
        }))]
      })
    }));
  }
