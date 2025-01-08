  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function ModalDeleteAccount(_ref) {
    var isVisible = _ref.isVisible,
      setIsVisible = _ref.setIsVisible,
      handleDeleteAccount = _ref.handleDeleteAccount;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeModal.default, {
      avoidKeyboard: true,
      onBackdropPress: function onBackdropPress() {
        return setIsVisible(false);
      },
      isVisible: isVisible,
      testID: "com.usereserva:id/modaldeleteaccount_container",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        bg: "white",
        borderRadius: 8,
        minHeight: 184,
        px: 24,
        mx: "3%",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          mt: "xxxs",
          mb: "quarck",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
            color: "preto",
            fontFamily: "reservaSerifRegular",
            fontSize: 22,
            children: "Tem certeza?"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
            color: "preto",
            fontFamily: "nunitoRegular",
            fontSize: 15,
            children: "Essa a\xE7\xE3o n\xE3o pode ser desfeita. Confirme o c\xF3digo recebido para deletar sua conta permanentemente."
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          width: "100%",
          mt: "xxxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
            bg: "#D71921",
            width: "100%",
            height: 50,
            onPress: function onPress() {
              return handleDeleteAccount();
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
              letterSpacing: 2,
              color: "white",
              fontFamily: "nunitoRegular",
              fontSize: 13,
              children: "DELETAR PERMANENTEMENTE"
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          width: "100%",
          mt: "xxxs",
          mb: "xxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
            variant: "primarioEstreitoOutline",
            width: "100%",
            height: 50,
            onPress: function onPress() {
              return setIsVisible(false);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
              letterSpacing: 2,
              color: "preto",
              fontFamily: "nunitoRegular",
              fontSize: 13,
              children: "VOLTAR"
            })
          })
        })]
      })
    });
  }
  var _default = exports.default = ModalDeleteAccount;
