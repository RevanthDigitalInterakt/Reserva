  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TopBarDefaultBackButton = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var TopBarDefaultBackButton = exports.TopBarDefaultBackButton = function TopBarDefaultBackButton(_ref) {
    var _ref$showShadow = _ref.showShadow,
      showShadow = _ref$showShadow === undefined ? true : _ref$showShadow,
      _ref$loading = _ref.loading,
      loading = _ref$loading === undefined ? false : _ref$loading,
      _ref$navigateGoBack = _ref.navigateGoBack,
      navigateGoBack = _ref$navigateGoBack === undefined ? false : _ref$navigateGoBack,
      backButtonPress = _ref.backButtonPress,
      cacheGoingBackRequest = _ref.cacheGoingBackRequest;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[3]).useNavigation)();
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[4]).useBagStore)(['allItemsQuantity']),
      allItemsQuantity = _useBagStore.allItemsQuantity;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).TopBar, {
      loading: loading,
      paddingX: "quarck",
      bg: "white",
      style: {
        elevation: showShadow ? 10 : 0
      },
      boxShadow: showShadow && _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[7]).platformType.IOS ? 'topBarShadow' : null,
      leftButton: {
        testID: 'com.usereserva:id/top_bar_default_button_home',
        name: 'ArrowBack',
        size: 24,
        onPress: function onPress() {
          if (backButtonPress) {
            backButtonPress();
            return;
          }
          if (!navigateGoBack) {
            navigation.navigate('Home');
            return;
          }
          navigation.goBack();
        }
      },
      rightButton1: {
        testID: 'com.usereserva:id/top_bar_button_searchmenu',
        name: 'Search',
        size: 24,
        onPress: function onPress() {
          return navigation.navigate('SearchMenu');
        }
      },
      rightButton2: {
        testID: 'com.usereserva:id/top_bar_button_handbag',
        name: 'Handbag',
        size: 24,
        onPress: function onPress() {
          if (cacheGoingBackRequest) {
            cacheGoingBackRequest();
          }
          navigation.navigate('BagScreen');
        },
        badgeCount: allItemsQuantity
      },
      height: 50
    });
  };
