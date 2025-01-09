  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ColorsButtons = ColorsButtons;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ColorsButtons(_ref) {
    var listColors = _ref.listColors,
      selectedColors = _ref.selectedColors,
      disabledColors = _ref.disabledColors,
      _onPress = _ref.onPress;
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      indexScroll = _useState2[0],
      setIndexScroll = _useState2[1];
    var scrollRef = (0, _react.useRef)(null);
    var onScrollEvent = function onScrollEvent(scrollEvent) {
      var actualIndexScroll = Math.ceil(scrollEvent.nativeEvent.contentOffset.x / 25);
      if (actualIndexScroll !== indexScroll && listColors && actualIndexScroll <= Math.ceil(listColors.length)) {
        setIndexScroll(actualIndexScroll);
      }
    };
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
          children: listColors.map(function (item) {
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
              style: (0, _styles.default)(!!(selectedColors != null && selectedColors.includes(item.id)) || selectedColors === item.id).boxContainer,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
                disabled: disabledColors.includes(item.id),
                onPress: function onPress() {
                  return _onPress(item.id);
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
                  style: (0, _styles.default)(false).containerImage,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.ImageBackground, {
                    resizeMode: "cover",
                    style: (0, _styles.default)(false).imageBackground,
                    source: {
                      uri: item.url
                    }
                  })
                })
              })
            }, `option-${item.id}`);
          })
        })
      }), listColors.length > 5 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Animated.View, {
        style: {
          transform: [{
            rotate: indexScroll < 6 ? '0deg' : '180deg'
          }],
          marginLeft: 4
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_IconComponent.default, {
          icon: "chevronRight"
        })
      })]
    });
  }
