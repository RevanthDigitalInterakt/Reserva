  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = function styles(selectedColor) {
    return _reactNative.StyleSheet.create({
      mainContainer: {
        width: 198,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      },
      boxContainer: {
        height: 31,
        width: 31,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: selectedColor ? _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK : _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 2
      },
      containerImage: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center'
      },
      imageBackground: {
        width: 25,
        height: 25,
        borderRadius: 4,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.INPUT_BORDER
      }
    });
  };
  var _default = exports.default = styles;
