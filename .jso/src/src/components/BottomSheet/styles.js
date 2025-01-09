  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
      flex: 1
    },
    backdrop: {
      flex: 1,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BACKDROP
    },
    contentWrapper: {
      height: '50%',
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      borderTopEndRadius: 12,
      borderTopStartRadius: 12,
      paddingHorizontal: 24,
      paddingTop: 24
    }
  });
  var _default = exports.default = styles;
