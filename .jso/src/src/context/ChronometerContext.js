  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useCountDown = exports.default = exports.ChronometerContext = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var defaultState = {
    time: '00:00:00'
  };
  var ChronometerContext = exports.ChronometerContext = (0, _react.createContext)(defaultState);
  function ChronometerContextProvider(_ref) {
    var children = _ref.children;
    var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      time = _useState2[0],
      setTime = _useState2[1];
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(ChronometerContext.Provider, {
      value: {
        time: time,
        setTime: setTime
      },
      children: children
    });
  }
  var _default = exports.default = ChronometerContextProvider;
  var useCountDown = exports.useCountDown = function useCountDown() {
    var chronometerContext = (0, _react.useContext)(ChronometerContext);
    var time = chronometerContext.time,
      setTime = chronometerContext.setTime;
    return {
      time: time,
      setTime: setTime
    };
  };
