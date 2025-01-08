  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EmptyBag = EmptyBag;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function EmptyBag(_ref) {
    var backButtonPress = _ref.backButtonPress,
      onPress = _ref.onPress,
      loading = _ref.loading;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).TopBarBackButton, {
        showShadow: true,
        backButtonPress: backButtonPress,
        loading: loading
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        flex: 1,
        alignItems: "center",
        paddingTop: 70,
        testID: "com.usereserva:id/empty_bag",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_IconComponent.default, {
          icon: "bagEmpty",
          height: 200,
          width: 200
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          mx: 37,
          mt: "md",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, Object.assign({
            fontFamily: "reservaSerifRegular",
            fontSize: 24
          }, (0, _testProps.default)('com.usereserva:id/sacola_vazia'), {
            children: "Sua sacola est\xE1 vazia"
          }))
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          mx: "md",
          my: "sm",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 14,
            textAlign: "center",
            children: "Navegue pelo nosso app e descubra produtos que s\xE3o sua cara!"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          width: "100%",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
            testID: "com.usereserva:id/button_going_shopping_empty_bag",
            onPress: onPress,
            marginX: "md",
            inline: true,
            title: "IR \xC0S COMPRAS",
            variant: "primarioEstreito"
          })
        })]
      })]
    });
  }
