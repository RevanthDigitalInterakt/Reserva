  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GiftCardList = GiftCardList;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _react = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var _styles = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[3]));
  function GiftCardOption(_ref) {
    var onSelect = _ref.onSelect,
      option = _ref.option;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return onSelect(option);
      },
      style: _styles.default.cardOption,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
        style: _styles.default.cardOptionText,
        children: option.name
      })
    });
  }
  function GiftCardList(_ref2) {
    var list = _ref2.list,
      onSelect = _ref2.onSelect;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
        style: _styles.default.title,
        children: "Escolha o Valor do Cart\xE3o"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.FlatList, {
        contentContainerStyle: _styles.default.listContainer,
        data: list,
        renderItem: function renderItem(_ref3) {
          var item = _ref3.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(GiftCardOption, {
            onSelect: onSelect,
            option: item
          }, item.itemId);
        },
        keyExtractor: function keyExtractor(item) {
          return item.itemId;
        }
      })]
    });
  }
