  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function IsTestingModal(_ref) {
    var isVisible = _ref.isVisible,
      setIsVisible = _ref.setIsVisible;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeModal.default, {
      avoidKeyboard: true,
      onBackdropPress: function onBackdropPress() {
        return setIsVisible(false);
      },
      isVisible: isVisible,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        bg: "white",
        minHeight: 184,
        alignItems: "center",
        justifyContent: "center",
        px: 34,
        py: 45,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          position: "absolute",
          top: 16,
          right: 20,
          zIndex: 4,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Button, {
            onPress: function onPress() {
              return setIsVisible(false);
            },
            variant: "icone",
            icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).IconLegacy, {
              size: 17,
              name: "Close"
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          mb: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
            textAlign: "center",
            fontFamily: "reservaSerifBold",
            fontSize: 20,
            children: "Aten\xE7\xE3o!!"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
            textAlign: "center",
            fontFamily: "reservaSansLight",
            fontSize: 16,
            children: "Para que a mudan\xE7a de ambiente seja aplicada, \xE9 necess\xE1rio reiniciar o APP."
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          width: "100%",
          mt: 38,
          mb: 5,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Button, {
            variant: "primarioEstreito",
            width: "80%",
            height: 50,
            onPress: function onPress() {
              return setIsVisible(false);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
              color: "white",
              fontFamily: "nunitoExtraBold",
              fontSize: 13,
              children: "OK"
            })
          })
        })]
      })
    });
  }
  var _default = exports.default = IsTestingModal;
