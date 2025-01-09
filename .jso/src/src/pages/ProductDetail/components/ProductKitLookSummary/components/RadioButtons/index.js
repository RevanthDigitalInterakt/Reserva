  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RadioButtons = RadioButtons;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function RadioButtons(_ref) {
    var selectedItem = _ref.selectedItem,
      optionsList = _ref.optionsList,
      disabledOptions = _ref.disabledOptions,
      onSelectedChange = _ref.onSelectedChange,
      testID = _ref.testID;
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      indexScroll = _useState2[0],
      setIndexScroll = _useState2[1];
    var scrollRef = (0, _react.useRef)(null);
    var onScrollEvent = function onScrollEvent(scrollEvent) {
      var actualIndexScroll = Math.ceil(scrollEvent.nativeEvent.contentOffset.x / 25);
      if (actualIndexScroll !== indexScroll && optionsList && actualIndexScroll <= Math.ceil(optionsList.length)) {
        setIndexScroll(actualIndexScroll);
      }
    };
    if (!optionsList || optionsList.length === 0) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
        style: (0, _styles.default)(false).mainContainer,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Animated.ScrollView, {
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          onScroll: function onScroll(event) {
            onScrollEvent(event);
          },
          ref: scrollRef,
          scrollEnabled: optionsList.length > 6,
          children: optionsList.map(function (item) {
            var isSelected = selectedItem === item.itemId && !disabledOptions.includes(`${selectedItem}`);
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
              hitSlop: {
                top: 15,
                bottom: 15,
                left: 15,
                right: 15
              },
              style: (0, _styles.default)(isSelected).btnContainer,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
                hitSlop: {
                  top: 15,
                  bottom: 15,
                  left: 15,
                  right: 15
                },
                disabled: disabledOptions.includes(`${item}`),
                onPress: function onPress() {
                  onSelectedChange({
                    item: item.itemId,
                    size: item.size,
                    seller: item.seller,
                    price: item.currentPrice
                  });
                },
                testID: testID,
                style: (0, _styles.default)(false).btnSelectColor,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
                  style: (0, _styles.default)(isSelected).btnContent,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
                    style: (0, _styles.default)(isSelected).btnText,
                    children: item.size
                  })
                })
              })
            }, `option-${item.itemId}`);
          })
        })
      }), optionsList.length > 6 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Animated.View, {
        style: {
          transform: [{
            rotate: indexScroll < 1 ? '0deg' : '180deg'
          }],
          marginLeft: 4
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_IconComponent.default, {
          icon: "chevronRight"
        })
      })]
    });
  }
