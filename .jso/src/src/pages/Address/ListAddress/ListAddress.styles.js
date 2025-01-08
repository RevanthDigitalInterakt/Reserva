  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var style = _reactNative.StyleSheet.create({
    container: {
      flex: 1
    },
    content: {
      padding: 20
    },
    title: {
      fontFamily: 'ReservaSerif-Regular',
      fontSize: 24,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK
    },
    listContainer: {
      padding: 20
    },
    actionButton: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    actionButtonText: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      textTransform: 'uppercase',
      fontFamily: 'ReservaSans-Bold',
      fontSize: 14,
      lineHeight: 18
    },
    emptyListAddressText: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      textTransform: 'uppercase',
      fontFamily: 'ReservaSans-Bold',
      fontSize: 14,
      lineHeight: 18
    }
  });
  var _default = exports.default = style;
