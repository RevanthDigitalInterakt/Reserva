  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width;
  var size = width / 8;
  var styles = function styles(_ref) {
    var upper = _ref.upper;
    return _reactNative.StyleSheet.create({
      card: {
        margin: 0,
        padding: 0,
        flex: 0.5,
        paddingLeft: 4,
        paddingRight: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MEDIUM_BLACK_2,
        borderBottomColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MEDIUM_BLACK_2,
        overflow: 'hidden',
        borderBottomWidth: upper ? 0.5 : 0,
        borderTopWidth: upper ? 0 : 0.5
      },
      number: {
        color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
        transform: [upper ? {
          translateY: size * 0.23
        } : {
          translateY: -size * 0.23
        }],
        fontSize: size / 1.8,
        lineHeight: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[2]).platformType.ANDROID ? size / 1.85 : size / 1.65,
        fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_BOLD
      }
    });
  };
  var _default = exports.default = styles;
