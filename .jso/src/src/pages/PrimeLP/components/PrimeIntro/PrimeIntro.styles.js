  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    wrapper: {
      backgroundColor: '#F7F7F7',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32
    },
    elevatedBox: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      backgroundColor: '#ffffff',
      paddingHorizontal: 16,
      paddingTop: 32,
      paddingBottom: 8,
      marginBottom: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -60,
      width: '100%'
    },
    title: {
      fontSize: 20,
      lineHeight: 26,
      color: '#000000',
      marginBottom: 24
    },
    titleStrong: {
      fontSize: 20,
      lineHeight: 26,
      color: '#000000'
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 20,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.GRAY,
      marginBottom: 24,
      textAlign: 'center'
    },
    subtitleStrong: {
      fontSize: 16,
      lineHeight: 20,
      color: '#000000'
    }
  });
