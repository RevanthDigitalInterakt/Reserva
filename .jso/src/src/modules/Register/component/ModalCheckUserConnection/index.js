  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _useAuthModalStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function ModalCheckUserConnection() {
    var _useAuthModalStore = (0, _useAuthModalStore2.default)(['setModalCheckConnection', 'showModalCheckConnection']),
      setModalCheckConnection = _useAuthModalStore.setModalCheckConnection,
      showModalCheckConnection = _useAuthModalStore.showModalCheckConnection;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Modal, {
      animationType: "fade",
      transparent: true,
      visible: showModalCheckConnection,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[6]).styles.modalContainer,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[6]).styles.modalContent,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
              fontFamily: "reservaSerifMedium",
              fontSize: 20,
              children: "Falha na comunica\xE7\xE3o!"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[6]).styles.modalView,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
              fontFamily: "nunitoRegular",
              children: ["N\xE3o foi poss\xEDvel continuar o cadastro devido a um problema de rede,", ' ', "verifique sua conex\xE3o ou tente novamente mais tarde"]
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/modal_check_user_connection_button'), {
            style: _$$_REQUIRE(_dependencyMap[6]).styles.modalActionButton,
            onPress: function onPress() {
              return setModalCheckConnection(false);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 14,
              color: "white",
              children: "TENTAR NOVAMENTE"
            })
          }))]
        })
      })
    });
  }
  var _default = exports.default = ModalCheckUserConnection;
