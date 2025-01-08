  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _styles = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function FormLink() {
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[5]).useRemoteConfig)(),
      getString = _useRemoteConfig.getString;
    var showForm = (0, _react.useMemo)(function () {
      return getString('show_user_feedback_form');
    }, []);
    var handleButtonPress = (0, _react.useCallback)(function () {
      _EventProvider.default.logEvent(showForm === 'menu' ? 'click_form_menu' : 'click_form_profile', {});
      _reactNative.Linking.openURL(showForm === 'menu' ? 'https://forms.gle/bfA1UXHteCs36HjRA' : 'https://forms.gle/rpPP8aStXcGA63UdA');
    }, [showForm]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        style: _styles.default.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
          style: _styles.default.text,
          children: "O que voc\xEA t\xE1 achando do app?"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, {
          style: _styles.default.button,
          onPress: handleButtonPress,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
            style: _styles.default.buttonText,
            children: "CONTA A\xCD"
          })
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Divider, {
        variant: "fullWidth",
        marginBottom: "nano",
        marginTop: "nano",
        marginX: "micro"
      })]
    });
  }
  var _default = exports.default = FormLink;
