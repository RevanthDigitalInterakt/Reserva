  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = CategoryComponent;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _CardWrapper = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function CategoryComponent() {
    var _useHomeStore = (0, _$$_REQUIRE(_dependencyMap[5]).useHomeStore)(['offersCarousels']),
      offersCarousels = _useHomeStore.offersCarousels;
    var title = offersCarousels.map(function (item) {
      var _item$categoryCards;
      return (_item$categoryCards = item.categoryCards) == null ? undefined : _item$categoryCards.sectionCardTitle;
    });
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, Object.assign({}, (0, _testProps.default)('category_main_component'), {
      style: _$$_REQUIRE(_dependencyMap[7]).styles.mainContainer,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[7]).styles.childrenContainer,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[7]).styles.containerRow,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, Object.assign({}, (0, _testProps.default)('category_main_title'), {
            style: _$$_REQUIRE(_dependencyMap[7]).styles.txtTitle,
            children: title
          }))
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_CardWrapper.default, {})]
      })
    }));
  }
