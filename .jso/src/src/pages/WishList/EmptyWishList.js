  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EmptyWishList = EmptyWishList;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function EmptyWishList() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[4]).useNavigation)();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.ScrollView, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        flex: 1,
        alignItems: "center",
        paddingTop: 110,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_IconComponent.default, {
          icon: "noWishList"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          mx: 37,
          mt: "md",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
            fontFamily: "reservaSerifRegular",
            fontSize: 24,
            children: "Voc\xEA ainda n\xE3o tem favoritos :("
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          mx: 58,
          my: 28,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 14,
            textAlign: "center",
            children: "Navegue pelo nosso app e favorite produtos que s\xE3o a sua cara!"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
          title: "NAVEGAR",
          variant: "primarioEstreito",
          width: 258,
          onPress: function onPress() {
            return navigation.navigate('Home');
          }
        })]
      })
    });
  }
