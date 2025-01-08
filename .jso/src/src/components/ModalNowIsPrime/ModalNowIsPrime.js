  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalNowIsPrime = ModalNowIsPrime;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _IconLogoPrime = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function ModalNowIsPrime(_ref) {
    var isVisible = _ref.isVisible,
      onBackdropPress = _ref.onBackdropPress;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeModal.default, {
      isVisible: isVisible,
      onBackdropPress: onBackdropPress,
      animationInTiming: 300,
      animationIn: "fadeIn",
      animationOut: "fadeOut",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[6]).styles.modalWrapper,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[6]).styles.headerContainer,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_IconLogoPrime.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
            hitSlop: {
              top: 30,
              left: 30,
              bottom: 30,
              right: 30
            },
            onPress: function onPress() {
              return onBackdropPress();
            },
            variant: "icone",
            icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).IconLegacy, {
              name: "Close",
              size: 16
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[6]).styles.textContainer,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[6]).styles.text,
            children: ["Agora voc\xEA \xE9 um cliente", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[6]).styles.primeText,
              children: "Prime"
            }), ", para facilitar na sua compra j\xE1 adicionamos ao seu carrinho a assinatura, ela ser\xE1 conclu\xEDda junto ao seu pedido."]
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
          accessible: true,
          title: "VOLTAR PARA SACOLA",
          color: "white",
          backgroundColor: "fullBlack",
          onPress: onBackdropPress,
          width: "100%",
          variant: "primarioEstreito"
        })]
      })
    });
  }
