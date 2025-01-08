  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalSuccess = ModalSuccess;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function ModalSuccess(_ref) {
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
        height: 184,
        alignItems: "center",
        justifyContent: "center",
        px: "xxxs",
        py: "xxxs",
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
              size: 12,
              name: "Close"
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          mt: "xxxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
            fontFamily: "reservaSerifBold",
            fontSize: 24,
            children: "Parab\xE9ns!"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          mt: "xxxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
            fontFamily: "reservaSerifRegular",
            fontSize: 24,
            children: "Voc\xEA ganhou cashback."
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          width: "100%",
          mt: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Button, {
            bg: "verdeSucesso",
            width: "100%",
            height: 50,
            onPress: function onPress() {
              return setIsVisible(false);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
              color: "white",
              fontFamily: "nunitoSemiBold",
              fontSize: 13,
              children: "OPA, VALEU!"
            })
          })
        })]
      })
    });
  }
