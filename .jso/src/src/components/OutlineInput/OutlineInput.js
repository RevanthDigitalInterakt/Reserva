  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OutlineInput = OutlineInput;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _excluded = ["iconName", "onChangeText", "loading", "maskType", "maskOptions", "onPressIcon"];
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function OutlineInput(_ref) {
    var iconName = _ref.iconName,
      _onChangeText = _ref.onChangeText,
      loading = _ref.loading,
      maskType = _ref.maskType,
      maskOptions = _ref.maskOptions,
      onPressIcon = _ref.onPressIcon,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      text = _useState2[0],
      setText = _useState2[1];
    var inputProps = props;
    var inputDefaultProps = {
      flex: 1,
      height: 32,
      style: {
        paddingVertical: 2
      },
      alignItems: 'baseline',
      onChangeText: function onChangeText(value) {
        setText(value);
        if (_onChangeText) {
          _onChangeText(value);
        }
      },
      fontFamily: 'nunitoRegular',
      fontSize: 13,
      color: 'preto',
      placeholderTextColor: _$$_REQUIRE(_dependencyMap[5]).theme.colors.preto
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
      pl: "micro",
      flexDirection: "row",
      borderWidth: "hairline",
      borderColor: "preto",
      borderRadius: "pico",
      flex: 1,
      alignItems: "center",
      children: [maskType ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).InputMask, Object.assign({
        type: maskType,
        options: maskOptions
      }, Object.assign({}, inputDefaultProps, inputProps))) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Input, Object.assign({}, Object.assign({}, inputDefaultProps, inputProps))), iconName && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        borderLeftColor: "preto",
        borderLeftWidth: "hairline",
        p: "nano",
        children: loading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_lottieReactNative.default, {
          source: _$$_REQUIRE(_dependencyMap[9]).loadingSpinner,
          style: {
            width: 16,
            height: 16
          },
          autoPlay: true,
          loop: true
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, {
          onPress: function onPress() {
            if (onPressIcon) {
              onPressIcon(text);
            }
          },
          variant: "icone",
          icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[11]).IconLegacy, {
            name: iconName,
            size: 16
          })
        })
      })]
    });
  }
