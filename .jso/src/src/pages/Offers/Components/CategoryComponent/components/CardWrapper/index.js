  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = CardWrapper;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _CategoryCard = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function CardWrapper() {
    var _useHomeStore = (0, _$$_REQUIRE(_dependencyMap[6]).useHomeStore)(['offersCarousels']),
      offersCarousels = _useHomeStore.offersCarousels;
    var _offersCarousels$map = offersCarousels.map(function (item) {
        var _item$categoryCards;
        return item == null ? undefined : (_item$categoryCards = item.categoryCards) == null ? undefined : _item$categoryCards.sectionMediaCards;
      }),
      _offersCarousels$map2 = (0, _slicedToArray2.default)(_offersCarousels$map, 1),
      SectionMediaCardsOutput = _offersCarousels$map2[0];
    if (!SectionMediaCardsOutput) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, Object.assign({}, (0, _testProps.default)('category_wrapper_component'), {
      style: _$$_REQUIRE(_dependencyMap[8]).styles.mainContainer,
      children: SectionMediaCardsOutput == null ? undefined : SectionMediaCardsOutput.map(function (item) {
        var _item$image;
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_CategoryCard.default, {
          id: item.id,
          url: (_item$image = item.image) == null ? undefined : _item$image.url,
          referenceId: item.reference
        }, item.id);
      })
    }));
  }
