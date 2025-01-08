  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var smallDevices = _reactNative.Dimensions.get('screen').width <= 375;
  var styles = exports.styles = _reactNative.StyleSheet.create({
    checkBoxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.GOLD,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BACKGROUND_GOLD
    },
    minHeight: {
      minHeight: 72
    },
    between: {
      justifyContent: 'space-between'
    },
    start: {
      justifyContent: 'flex-start'
    },
    ml: {
      marginLeft: 16
    },
    imageBackgroundBadge: {
      width: smallDevices ? 135 : 160,
      height: smallDevices ? 24 : 28,
      justifyContent: 'center',
      paddingLeft: 10
    },
    integerPartPrime: {
      fontWeight: '700',
      fontSize: 24,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.DARK_GOLD_TEXT
    },
    decimalPartPrime: {
      fontWeight: '700',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.GOLD
    },
    decimalText: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.DARK_GOLD_TEXT
    },
    normalTextRed: {
      fontWeight: '400',
      fontSize: 18,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.DARK_GOLD_TEXT
    },
    negativeMarginText: {
      marginLeft: smallDevices ? -35 : -40
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'baseline',
      marginTop: 4
    },
    primePrice: {
      marginHorizontal: 16
    },
    primeCheckBox: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
      height: 22,
      width: 22,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.GOLD,
      marginRight: smallDevices ? 15 : 0
    },
    primeCheckBoxFill: {
      height: 16,
      width: 16,
      borderRadius: 8,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.GOLD
    },
    priceDataWrapper: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingVertical: 10,
      marginLeft: 16
    },
    priceDataEconomy: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingVertical: 10,
      marginLeft: 6
    },
    separator: {
      alignSelf: 'center',
      width: 1,
      height: 30,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_GRAY,
      marginHorizontal: 15
    },
    mt: {
      marginTop: 30
    },
    mDefault: {
      margin: 0
    },
    bePrimeBadge: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.GOLD,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2
    },
    textWhite: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE
    },
    textRedBadge: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      fontSize: smallDevices ? 12 : 15
    }
  });
