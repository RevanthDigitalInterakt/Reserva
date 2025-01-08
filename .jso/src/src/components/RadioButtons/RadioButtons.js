  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RadioButtons = RadioButtons;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _excluded = ["selectedItem", "optionsList", "disbledOptions", "defaultSelectedItem", "showMoreSizes", "color", "onSelectedChange", "size", "fontSize", "testID"];
  function RadioButtons(_ref) {
    var selectedItem = _ref.selectedItem,
      optionsList = _ref.optionsList,
      disbledOptions = _ref.disbledOptions,
      defaultSelectedItem = _ref.defaultSelectedItem,
      _ref$showMoreSizes = _ref.showMoreSizes,
      showMoreSizes = _ref$showMoreSizes === undefined ? true : _ref$showMoreSizes,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? 'preto' : _ref$color,
      onSelectedChange = _ref.onSelectedChange,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? '34px' : _ref$size,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === undefined ? '14px' : _ref$fontSize,
      testID = _ref.testID,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    if (!optionsList || optionsList.length === 0) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, Object.assign({
      alignItems: "flex-start",
      flexWrap: "wrap",
      flexDirection: "row"
    }, props, {
      children: optionsList.map(function (item, index) {
        var isSelected = selectedItem === item && !disbledOptions.includes(`${selectedItem}`);
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          hitSlop: {
            top: 15,
            bottom: 15,
            left: 15,
            right: 15
          },
          marginRight: index < optionsList.length ? 'micro' : null,
          marginBottom: index < optionsList.length && showMoreSizes ? 'nano' : null,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Button, {
            hitSlop: {
              top: 15,
              bottom: 15,
              left: 15,
              right: 15
            },
            disabled: disbledOptions.includes(`${item}`),
            height: size,
            onPress: function onPress() {
              onSelectedChange(item);
            },
            testID: testID,
            alignItems: "center",
            justifyContent: "center",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
              height: size,
              width: size,
              alignSelf: "flex-start",
              bg: isSelected ? color : 'white',
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "pico",
              borderWidth: "hairline",
              borderColor: "divider",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                color: isSelected ? 'white' : color,
                fontFamily: "nunitoBold",
                fontSize: fontSize,
                children: item
              })
            })
          })
        }, `option-${item}`);
      })
    }));
  }
