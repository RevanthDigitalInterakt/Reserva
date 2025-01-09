  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = exports.objectStyles = exports.WrapperAboutPrime = exports.FooterHighlight = exports.FooterDescription = undefined;
  var _native = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var objectStyles = exports.objectStyles = _reactNative.StyleSheet.create({
    modal: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  var WrapperAboutPrime = exports.WrapperAboutPrime = (0, _native.default)(_$$_REQUIRE(_dependencyMap[4]).Box).attrs(function () {
    return {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    };
  })`
  margin-top: 8;
  margin-bottom: 24;
`;
  var FooterDescription = exports.FooterDescription = (0, _native.default)(_$$_REQUIRE(_dependencyMap[5]).Typography)`
    margin-top: 12;
`;
  var FooterHighlight = exports.FooterHighlight = (0, _native.default)(_$$_REQUIRE(_dependencyMap[5]).Typography)`
    text-decoration: underline;
`;
  var styles = exports.styles = _reactNative.StyleSheet.create({
    containerModal: {
      padding: 32,
      backgroundColor: _$$_REQUIRE(_dependencyMap[6]).COLORS.WHITE,
      width: _configDeviceSizes.default.DEVICE_WIDTH - 24
    },
    body: {
      color: _$$_REQUIRE(_dependencyMap[6]).COLORS.DARK_GRAY,
      fontFamily: 'ReservaSans-Regular',
      fontSize: 16,
      lineHeight: 20
    },
    textPrimeTitle: {
      fontSize: 26,
      marginBottom: 24,
      fontFamily: 'ReservaDisplay-Regular',
      color: _$$_REQUIRE(_dependencyMap[6]).COLORS.BLACK
    },
    textPrime: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: 'ReservaDisplay-Regular',
      color: _$$_REQUIRE(_dependencyMap[6]).COLORS.BLACK
    },
    textPrice: {
      color: _$$_REQUIRE(_dependencyMap[6]).COLORS.BLACK,
      fontSize: 16,
      lineHeight: 20,
      fontFamily: 'ReservaSans-Bold'
    }
  });
