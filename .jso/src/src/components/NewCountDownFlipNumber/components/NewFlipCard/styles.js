  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width;
  var size = width / 8;
  var frontFlipCard = {
    top: 0,
    borderTopLeftRadius: size / 10,
    borderTopRightRadius: size / 10,
    borderBottomWidth: 0.5
  };
  var backFlipCard = {
    top: '50%',
    borderBottomLeftRadius: size / 10,
    borderBottomRightRadius: size / 10,
    borderTopWidth: 0.5
  };
  var styles = function styles(_ref) {
    var isFront = _ref.isFront;
    return _reactNative.StyleSheet.create({
      container: Object.assign({
        paddingLeft: 4,
        paddingRight: 4,
        position: 'absolute',
        left: 0,
        height: '50%',
        width: '100%',
        backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MEDIUM_BLACK,
        borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MEDIUM_BLACK_2,
        backfaceVisibility: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
      }, isFront ? frontFlipCard : backFlipCard),
      overflowContainer: {
        width: size,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      },
      number: {
        transform: [isFront ? {
          translateY: size * 0.23
        } : {
          translateY: -size * 0.23
        }],
        color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
        fontSize: size / 1.8,
        lineHeight: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[2]).platformType.ANDROID ? size / 1.85 : size / 1.65,
        fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_BOLD
      }
    });
  };
  var _default = exports.default = styles;
