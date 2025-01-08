  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalTermsAndConditions = ModalTermsAndConditions;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function ModalTermsAndConditions(_ref) {
    var isVisible = _ref.isVisible,
      setIsVisible = _ref.setIsVisible,
      setTermAndConditions = _ref.setTermAndConditions,
      isAccepted = _ref.isAccepted,
      loading = _ref.loading;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeModal.default, {
      avoidKeyboard: true,
      onBackdropPress: setIsVisible,
      isVisible: isVisible,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        bg: "white",
        marginY: "xxl",
        justifyContent: "center",
        px: "xxxs",
        py: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          position: "absolute",
          top: 16,
          right: 20,
          zIndex: 4,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
            onPress: setIsVisible,
            variant: "icone",
            icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).IconLegacy, {
              size: 12,
              name: "Close"
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          mt: "xxxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
            fontFamily: "reservaSerifRegular",
            fontSize: 20,
            children: "Termos e condi\xE7\xF5es"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.ScrollView, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\u2019s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with. The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it\u2019s seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum."
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          width: "100%",
          mt: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
            bg: "verdeSucesso",
            width: "100%",
            height: 50,
            disabled: isAccepted,
            onPress: setTermAndConditions,
            children: loading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_lottieReactNative.default, {
              source: _$$_REQUIRE(_dependencyMap[10]).loadingSpinner,
              style: {
                width: 30
              },
              autoPlay: true,
              loop: true
            }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
              color: "white",
              fontFamily: "nunitoSemiBold",
              fontSize: 13,
              children: isAccepted ? 'ACEITO' : 'ACEITAR'
            })
          })
        })]
      })
    });
  }
