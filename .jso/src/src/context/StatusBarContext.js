  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useStatusBar = exports.default = exports.StatusBarStyle = exports.StatusBarContext = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var StatusBarStyle = exports.StatusBarStyle = /*#__PURE__*/function (StatusBarStyle) {
    StatusBarStyle["DARK_CONTENT"] = "dark-content";
    StatusBarStyle["LIGHT_CONTENT"] = "light-content";
    return StatusBarStyle;
  }({});
  var StatusBarContext = exports.StatusBarContext = (0, _react.createContext)({
    backgroundColor: '#61dafb',
    barStyle: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[4]).platformType.IOS ? StatusBarStyle.DARK_CONTENT : StatusBarStyle.LIGHT_CONTENT,
    changeBackgroundColor: function changeBackgroundColor(color) {},
    changeBarStyle: function changeBarStyle(style) {}
  });
  function StatusBarContextProvider(_ref) {
    var children = _ref.children;
    var _useState = (0, _react.useState)('#61dafb'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      backgroundColor = _useState2[0],
      setBackgroundColor = _useState2[1];
    var _useState3 = (0, _react.useState)(_reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[4]).platformType.IOS ? StatusBarStyle.DARK_CONTENT : StatusBarStyle.LIGHT_CONTENT),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      barStyle = _useState4[0],
      setBarStyle = _useState4[1];
    var changeBackgroundColor = function changeBackgroundColor(color) {
      setBackgroundColor(color);
    };
    var changeBarStyle = function changeBarStyle(style) {
      setBarStyle(style);
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(StatusBarContext.Provider, {
      value: {
        backgroundColor: backgroundColor,
        changeBackgroundColor: changeBackgroundColor,
        barStyle: barStyle,
        changeBarStyle: changeBarStyle
      },
      children: children
    });
  }
  var _default = exports.default = StatusBarContextProvider;
  var useStatusBar = exports.useStatusBar = function useStatusBar() {
    var statusBarContext = (0, _react.useContext)(StatusBarContext);
    if (!statusBarContext) {
      throw new Error('use StatusBar must be used within a StatusBarContext');
    }
    var backgroundColor = statusBarContext.backgroundColor,
      changeBackgroundColor = statusBarContext.changeBackgroundColor,
      barStyle = statusBarContext.barStyle,
      changeBarStyle = statusBarContext.changeBarStyle;
    return {
      backgroundColor: backgroundColor,
      changeBackgroundColor: changeBackgroundColor,
      barStyle: barStyle,
      changeBarStyle: changeBarStyle
    };
  };
