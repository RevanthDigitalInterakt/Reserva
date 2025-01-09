  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _useAuthModalStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function ModalSignUpComplete() {
    var _useAuthModalStore = (0, _useAuthModalStore2.default)(['showModalSignUpComplete', 'setModalSignUpComplete']),
      showModalSignUpComplete = _useAuthModalStore.showModalSignUpComplete,
      setModalSignUpComplete = _useAuthModalStore.setModalSignUpComplete;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Modal, {
      animationType: "fade",
      transparent: true,
      visible: showModalSignUpComplete,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[6]).styles.modalContainer,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[6]).styles.modalContent,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
              fontFamily: "reservaSerifMedium",
              fontSize: 20,
              children: "Cadastro feito com sucesso!"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[6]).styles.modalView,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
              fontFamily: "nunitoRegular",
              children: "Seu cadastro foi feito com sucesso, agora \xE9 s\xF3 partir para as compras!"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/modal_signup_complete_button'), {
            style: _$$_REQUIRE(_dependencyMap[6]).styles.modalActionButton,
            onPress: function onPress() {
              return setModalSignUpComplete(false);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 14,
              color: "white",
              children: "CONTINUAR PARA A LOJA"
            })
          }))]
        })
      })
    });
  }
  var _default = exports.default = ModalSignUpComplete;
