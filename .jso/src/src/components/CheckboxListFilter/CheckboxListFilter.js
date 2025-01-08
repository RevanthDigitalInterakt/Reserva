  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CheckboxFilter = CheckboxFilter;
  exports.CheckboxListFilter = CheckboxListFilter;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _excluded = ["checked", "optionName", "onCheck", "fontSize", "fontFamily", "color", "selectedColor", "width", "alignItems"];
  function CheckboxFilter(_ref) {
    var checked = _ref.checked,
      optionName = _ref.optionName,
      onCheck = _ref.onCheck,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === undefined ? '12px' : _ref$fontSize,
      _ref$fontFamily = _ref.fontFamily,
      fontFamily = _ref$fontFamily === undefined ? 'nunitoRegular' : _ref$fontFamily,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? 'dropDownBorderColor' : _ref$color,
      _ref$selectedColor = _ref.selectedColor,
      selectedColor = _ref$selectedColor === undefined ? 'preto' : _ref$selectedColor,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? '50%' : _ref$width,
      _ref$alignItems = _ref.alignItems,
      alignItems = _ref$alignItems === undefined ? 'center' : _ref$alignItems,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, Object.assign({
      flexDirection: "row",
      width: width,
      alignItems: alignItems
    }, props, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
        hitSlop: {
          top: 10,
          left: 10,
          bottom: 10,
          right: 10
        },
        onPress: function onPress() {
          if (onCheck) {
            onCheck();
          }
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).IconLegacy, {
          name: checked ? 'CheckboxChecked' : 'CheckboxUnchecked',
          color: color ? selectedColor && checked ? selectedColor : color : 'preto',
          size: 15
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        ml: "nano",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
          fontSize: fontSize,
          fontFamily: fontFamily,
          variant: "botaoFiltrarEOrdenarProdutos",
          children: optionName
        })
      })]
    }));
  }
  function CheckboxListFilter(_ref2) {
    var optionsList = _ref2.optionsList,
      selectedList = _ref2.selectedList,
      onCheckChange = _ref2.onCheckChange,
      color = _ref2.color,
      selectedColor = _ref2.selectedColor;
    var isChecked = function isChecked(option) {
      return selectedList.filter(function (_ref3) {
        var value = _ref3.value;
        return value === option.value;
      }).length > 0;
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
      flexDirection: "row",
      flexWrap: "wrap",
      children: optionsList.map(function (_ref4, index) {
        var key = _ref4.key,
          value = _ref4.value;
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(CheckboxFilter, {
          paddingY: "nano",
          optionName: value.charAt(0).toUpperCase() + value.slice(1),
          checked: isChecked({
            key: key,
            value: value.toLowerCase()
          }),
          color: color || 'preto',
          selectedColor: selectedColor || 'preto',
          onCheck: function onCheck() {
            if (isChecked({
              key: key,
              value: value.toLowerCase()
            })) {
              onCheckChange(selectedList.filter(function (_ref5) {
                var val = _ref5.value;
                return val !== value;
              }));
            } else onCheckChange([].concat((0, _toConsumableArray2.default)(selectedList), [{
              key: key,
              value: value
            }]));
          }
        }, `option-${key}-${value}`);
      })
    });
  }
