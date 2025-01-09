  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = function styles(isSelected) {
    return _reactNative.StyleSheet.create({
      mainContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: 196
      },
      btnContainer: {
        borderColor: isSelected ? _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK : _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
        borderWidth: 1,
        borderRadius: 5,
        width: 31,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 2
      },
      btnSelectColor: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isSelected ? _$$_REQUIRE(_dependencyMap[1]).COLORS.RED : ''
      },
      btnContent: {
        height: 25,
        width: 25,
        backgroundColor: isSelected ? _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.INPUT_BORDER
      },
      btnText: {
        fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: isSelected ? _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE : _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK
      }
    });
  };
  var _default = exports.default = styles;
