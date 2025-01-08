  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var screenWidth = _reactNative.Dimensions.get('window').width;
  function UnderlineInput(_ref) {
    var width = _ref.width,
      value = _ref.value,
      testID = _ref.testID,
      _onFocus = _ref.onFocus,
      errorMsg = _ref.errorMsg,
      iconSize = _ref.iconSize,
      showError = _ref.showError,
      placeholder = _ref.placeholder,
      _onChangeText = _ref.onChangeText,
      isSecureText = _ref.isSecureText,
      keyboardType = _ref.keyboardType,
      _ref$isModal = _ref.isModal,
      isModal = _ref$isModal === undefined ? false : _ref$isModal;
    // TODO refactor
    width = width == undefined ? width = screenWidth - 40 : width;
    iconSize = iconSize == undefined ? iconSize = 22 : iconSize;
    var _useState = (0, _react.useState)(true),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      hidePassword = _useState2[0],
      setHidePassword = _useState2[1];
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
      width: width,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        flexDirection: "row",
        borderBottomWidth: "hairline",
        justifyContent: "space-between",
        style: {
          overflow: 'hidden'
        },
        borderBottomColor: showError ? 'vermelhoAlerta' : 'neutroFrio2',
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          flexGrow: 4,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).TextInput, Object.assign({
            value: value,
            autoCapitalize: "none",
            autoCompleteType: "off"
          }, (0, _testProps.default)(testID), {
            placeholder: placeholder,
            onFocus: function onFocus(e) {
              return _onFocus && _onFocus(e);
            },
            secureTextEntry: isSecureText && hidePassword,
            onChangeText: function onChangeText(text) {
              return _onChangeText(text.trim());
            },
            keyboardType: isSecureText && !hidePassword && _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[8]).platformType.ANDROID ? 'visible-password' : keyboardType,
            style: {
              padding: 0,
              margin: 0,
              paddingRight: isModal ? 62 : 0,
              maxWidth: isSecureText ? width - (iconSize + 4) : width
            },
            autoCorrect: false
          }))
        }), isSecureText && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
          style: {
            alignSelf: 'center',
            right: isModal ? 52 : 14
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
            testID: `${testID}_button_hide_password`,
            onPress: function onPress() {
              setHidePassword(!hidePassword);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[10]).IconLegacy, {
              size: iconSize,
              name: hidePassword ? 'EyeOff' : 'EyeOpen'
            })
          })
        })]
      }), showError && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, Object.assign({
        fontSize: 13,
        color: "vermelhoAlerta",
        fontFamily: "nunitoRegular"
      }, (0, _testProps.default)('com.usereserva:id/underline_input_msg_show_error'), {
        children: errorMsg
      }))]
    });
  }
  var _default = exports.default = UnderlineInput;
