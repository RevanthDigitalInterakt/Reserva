  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NumberRegisteredSuccessfullyView = NumberRegisteredSuccessfullyView;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function NumberRegisteredSuccessfullyView(_ref) {
    var navigateToCashbackInStore = _ref.navigateToCashbackInStore;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.SafeAreaView, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.ScrollView, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          mx: "xxs",
          mt: "xxs",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            mb: "nano",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
              fontFamily: "reservaSerifMedium",
              fontSize: 28,
              children: "Obrigado!"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            mb: "xxs",
            mr: 22,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 14,
              style: {
                lineHeight: 19
              },
              children: "Seu n\xFAmero foi confirmado com sucesso. Aproveite o benef\xEDcio!"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
            onPress: navigateToCashbackInStore,
            height: 50,
            inline: true,
            bg: "verdeSucesso",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
              color: "white",
              fontFamily: "nunitoSemiBold",
              fontSize: 13,
              style: {
                lineHeight: 24,
                letterSpacing: 1.6
              },
              children: "CONTINUAR"
            })
          })]
        })
      })
    });
  }
