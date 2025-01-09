  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _excluded = ["optionsList", "disabledOptions", "defaultSelectedItem", "color", "onSelectedChange", "size", "fontSize"];
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var orderSizes = function orderSizes(sizes) {
    return sizes.sort(function (itemA, itemB) {
      var numA = parseInt(itemA, 10);
      var numB = parseInt(itemB, 10);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      if (!isNaN(numA)) return -1;
      if (!isNaN(numB)) return 1;
      return itemA.localeCompare(itemB);
    });
  };
  var RadioButtonsFilter = _react.default.memo(function (_ref) {
    var optionsList = _ref.optionsList,
      disabledOptions = _ref.disabledOptions,
      defaultSelectedItem = _ref.defaultSelectedItem,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? 'preto' : _ref$color,
      onSelectedChange = _ref.onSelectedChange,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? '34px' : _ref$size,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === undefined ? '10px' : _ref$fontSize,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    defaultSelectedItem = defaultSelectedItem.map(function (item) {
      return item.toUpperCase();
    });
    if (!optionsList || optionsList.length === 0) return null;
    var changeSelectedItems = (0, _react.useCallback)(function (isSelected, value) {
      var updatedItems = isSelected ? defaultSelectedItem.filter(function (item) {
        return item !== value.toUpperCase();
      }) : [].concat((0, _toConsumableArray2.default)(defaultSelectedItem), [value.toUpperCase()]);
      onSelectedChange(orderSizes(updatedItems));
    }, [defaultSelectedItem, onSelectedChange]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, Object.assign({
      alignItems: "flex-start",
      flexWrap: "wrap",
      flexDirection: "row"
    }, props, {
      children: optionsList.map(function (_ref2, index) {
        var value = _ref2.value;
        var isSelected = defaultSelectedItem.includes(value.toUpperCase());
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          height: size,
          width: size,
          alignSelf: "flex-start",
          bg: isSelected ? color : 'white',
          alignItems: "center",
          marginRight: index < optionsList.length - 1 ? 'micro' : undefined,
          marginBottom: index < optionsList.length - 1 ? 'nano' : undefined,
          borderRadius: "pico",
          borderWidth: "hairline",
          borderColor: "divider",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
            disabled: disabledOptions == null ? undefined : disabledOptions.includes(value),
            height: size,
            onPress: function onPress() {
              return changeSelectedItems(isSelected, value);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
              color: isSelected ? 'white' : color,
              fontFamily: "nunitoBold",
              fontSize: fontSize,
              children: value.toUpperCase()
            })
          })
        }, `option-${value}`);
      })
    }));
  });
  var _default = exports.default = RadioButtonsFilter;
