  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Checkbox = Checkbox;
  exports.CheckboxList = CheckboxList;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _excluded = ["checked", "optionName", "onCheck", "fontSize", "fontFamily", "color", "selectedColor", "width", "alignItems", "testID", "newPackageItem"];
  function Checkbox(_ref) {
    var checked = _ref.checked,
      optionName = _ref.optionName,
      onCheck = _ref.onCheck,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === undefined ? 12 : _ref$fontSize,
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
      testID = _ref.testID,
      _ref$newPackageItem = _ref.newPackageItem,
      newPackageItem = _ref$newPackageItem === undefined ? false : _ref$newPackageItem,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, Object.assign({
      flexDirection: "row",
      width: width,
      alignItems: alignItems
    }, props, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
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
        testID: testID,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).IconLegacy, {
          name: checked ? 'CheckboxChecked' : 'CheckboxUnchecked',
          color:
          // eslint-disable-next-line no-nested-ternary
          color ? selectedColor && checked ? selectedColor : color : 'preto',
          size: 15
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        ml: "nano",
        children: newPackageItem ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[9]).checkboxStyles.text,
          children: optionName
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
          fontSize: fontSize,
          fontFamily: fontFamily,
          variant: "botaoFiltrarEOrdenarProdutos",
          children: optionName
        })
      })]
    }));
  }
  function CheckboxList(_ref2) {
    var optionsList = _ref2.optionsList,
      selectedList = _ref2.selectedList,
      onCheckChange = _ref2.onCheckChange,
      color = _ref2.color,
      selectedColor = _ref2.selectedColor;
    var isChecked = function isChecked(option) {
      return selectedList.indexOf(option) >= 0;
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
      flexDirection: "row",
      flexWrap: "wrap",
      children: optionsList.map(function (option) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(Checkbox, {
          paddingY: "nano",
          optionName: option,
          checked: isChecked(option),
          color: color || 'preto',
          selectedColor: selectedColor || 'preto',
          onCheck: function onCheck() {
            if (isChecked(option)) onCheckChange(selectedList.filter(function (x) {
              return x != option;
            }));else onCheckChange([].concat((0, _toConsumableArray2.default)(selectedList), [option]));
          }
        }, `option-${option}`);
      })
    });
  }
