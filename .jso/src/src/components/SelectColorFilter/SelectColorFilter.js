  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SelectColorFilter = SelectColorFilter;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function SelectColorFilter(_ref) {
    var listColors = _ref.listColors,
      selectedColors = _ref.selectedColors,
      disabledColors = _ref.disabledColors,
      _onPress = _ref.onPress,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? 25 : _ref$size;
    var renderOptions = function renderOptions() {
      var listItems = listColors.map(function (_ref2) {
        var value = _ref2.value;
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Button, {
            disabled: disabledColors == null ? undefined : disabledColors.includes(value),
            onPress: function onPress() {
              return _onPress(value);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Box, {
              height: size + 5,
              width: size + 5,
              bg: selectedColors != null && selectedColors.includes(value) || selectedColors === value ? 'white' : null,
              borderRadius: "infinity",
              borderWidth: selectedColors != null && selectedColors.includes(value) || selectedColors === value ? 'hairline' : null,
              borderColor: selectedColors != null && selectedColors.includes(value) || selectedColors === value ? 'neutroFrio2' : null,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "nano",
              marginRight: "nano",
              marginTop: "nano",
              marginBottom: "nano",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Box, {
                height: size,
                width: size,
                borderRadius: "infinity",
                bg: value
              })
            })
          })
        }, `filter-options-${value}`);
      });
      return listItems;
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Box, {
      flexWrap: "wrap",
      flexDirection: "row",
      children: renderOptions()
    });
  }
