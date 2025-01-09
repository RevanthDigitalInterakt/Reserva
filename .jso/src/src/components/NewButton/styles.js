  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = function styles(_ref) {
    var disabled = _ref.disabled,
      textColor = _ref.textColor;
    return _reactNative.StyleSheet.create({
      container: {
        backgroundColor: disabled ? _$$_REQUIRE(_dependencyMap[1]).COLORS.DISABLED_GRAY : _$$_REQUIRE(_dependencyMap[1]).COLORS.ENABLED_GREEN,
        height: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(51),
        justifyContent: 'center',
        alignItems: 'center'
      },
      text: {
        color: textColor || _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
        fontSize: 14,
        lineHeight: 18.48,
        fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_MEDIUM
      }
    });
  };
  var _default = exports.default = styles;
