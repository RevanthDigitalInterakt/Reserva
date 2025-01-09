  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  _$$_REQUIRE(_dependencyMap[3]);
  var styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    },
    text: {
      fontSize: 20,
      color: 'white',
      padding: 10,
      textAlign: 'center'
    },
    image: {
      maxWidth: 200,
      height: 30,
      marginBottom: 10
    }
  });
  function ReservaJailbreakScreen() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).ThemeProvider, {
      theme: _$$_REQUIRE(_dependencyMap[6]).theme,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
        style: styles.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[7]).commons.logo,
          style: styles.image
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
          style: styles.text,
          children: "Este aplicativo n\xE3o \xE9 suportado em dispositivos com modifica\xE7\xF5es n\xE3o autorizadas."
        })]
      })
    });
  }
  var _default = exports.default = ReservaJailbreakScreen;
