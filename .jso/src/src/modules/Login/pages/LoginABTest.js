  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = LoginABTest;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _SignIn = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function LoginABTest(loginProps) {
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[3]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var isTester = (0, _$$_REQUIRE(_dependencyMap[4]).useIsTester)();
    var showNewLogin = (0, _react.useMemo)(function () {
      return getBoolean(isTester ? 'show_new_login_tester' : 'show_new_login');
    }, [getBoolean, isTester]);
    return !showNewLogin ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_SignIn.default, Object.assign({}, loginProps)) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).LoginScreen, Object.assign({}, loginProps));
  }
