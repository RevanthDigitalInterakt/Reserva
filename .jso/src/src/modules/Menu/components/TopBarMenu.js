  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TopBarMenu = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var TopBarMenu = exports.TopBarMenu = function TopBarMenu(_ref) {
    var _ref$loading = _ref.loading,
      loading = _ref$loading === undefined ? false : _ref$loading;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[3]).useNavigation)();
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[4]).useBagStore)(['allItemsQuantity']),
      allItemsQuantity = _useBagStore.allItemsQuantity;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).TopBar, Object.assign({
      loading: loading,
      paddingX: "quarck"
    }, (0, _testProps.default)('com.usereserva:id/entrar_login_button'), {
      bg: "white",
      leftButton: {
        marginTop: 'nano',
        color: 'preto',
        name: 'Close',
        size: 14,
        onPress: function onPress() {
          return navigation.goBack();
        }
      },
      rightButton1: {
        testID: 'com.usereserva:id/top_bar_search_menu_button',
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
          return navigation.navigate('BagScreen');
        },
        badgeCount: allItemsQuantity
      },
      height: 50
    }));
  };
