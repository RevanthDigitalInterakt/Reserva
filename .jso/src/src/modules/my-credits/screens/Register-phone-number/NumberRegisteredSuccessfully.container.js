  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NumberRegisteredSuccessfullyContainer = NumberRegisteredSuccessfullyContainer;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function NumberRegisteredSuccessfullyContainer(_ref) {
    var navigateBack = _ref.navigateBack,
      navigateToCashbackInStore = _ref.navigateToCashbackInStore;
    var handleNavigateToCashbackInStore = function handleNavigateToCashbackInStore() {
      navigateToCashbackInStore();
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_$$_REQUIRE(_dependencyMap[2]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[3]).TopBarBackButton, {
        loading: false,
        showShadow: true,
        backButtonPress: navigateBack
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[4]).NumberRegisteredSuccessfullyView, {
        navigateToCashbackInStore: handleNavigateToCashbackInStore
      })]
    });
  }
