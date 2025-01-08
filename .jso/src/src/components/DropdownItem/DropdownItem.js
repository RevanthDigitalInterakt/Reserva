  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function DropdownItem(_ref) {
    var body = _ref.body,
      title = _ref.title,
      _ref$justifyText = _ref.justifyText,
      justifyText = _ref$justifyText === undefined ? false : _ref$justifyText;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showContent = _useState2[0],
      setShowContent = _useState2[1];
    var animationController = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var handleDropDownPress = function handleDropDownPress() {
      var animationConfig = {
        duration: 300,
        toValue: showContent ? 0 : 1,
        useNativeDriver: true
      };
      _reactNative.Animated.timing(animationController, animationConfig).start();
      _reactNative.LayoutAnimation.configureNext((0, _$$_REQUIRE(_dependencyMap[6]).toggleAnimation)());
      setShowContent(!showContent);
    };
    var chevronTransform = animationController.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg']
    });
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, Object.assign({
        onPress: handleDropDownPress
      }, (0, _testProps.default)('com.usereserva:id/dropdown_item_presseble_title'), {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[8]).styles.titleContainer,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
            fontFamily: "reservaSansRegular",
            fontWeight: "bold",
            fontSize: 16,
            children: title
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Animated.View, {
            style: {
              transform: [{
                rotateZ: chevronTransform
              }]
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconComponent.default, {
              icon: "chevronRight"
            })
          })]
        })
      })), showContent && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, Object.assign({
        style: _$$_REQUIRE(_dependencyMap[8]).styles.contentContainer
      }, (0, _testProps.default)('com.usereserva:id/dropdown_item_content'), {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
          style: [_$$_REQUIRE(_dependencyMap[8]).styles.body, {
            textAlign: justifyText ? 'justify' : 'left'
          }],
          children: body
        })
      }))]
    });
  }
  var _default = exports.default = DropdownItem;
