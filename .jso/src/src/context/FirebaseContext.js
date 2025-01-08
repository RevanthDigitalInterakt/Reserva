  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FirebaseContext = undefined;
  exports.FirebaseContextProvider = FirebaseContextProvider;
  exports.useFirebaseContext = exports.RemoteConfigKeys = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  // create a firebase context

  var FirebaseContext = exports.FirebaseContext = (0, _react.createContext)({
    fetchValues: function fetchValues() {
      return Promise.resolve([]);
    },
    getValue: function getValue() {
      return Promise.resolve(null);
    },
    remoteConfigs: []
  });
  var RemoteConfigKeys = exports.RemoteConfigKeys = /*#__PURE__*/function (RemoteConfigKeys) {
    RemoteConfigKeys["SCREEN_MAINTENANCE"] = "SCREEN_MAINTENANCE";
    RemoteConfigKeys["FEATURE_CASHBACK_IN_STORE"] = "FEATURE_CASHBACK_IN_STORE";
    return RemoteConfigKeys;
  }({});
  function FirebaseContextProvider(_ref) {
    var children = _ref.children;
    var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      remoteConfigs = _useState2[0],
      setRemoteConfigs = _useState2[1];
    var fetchValues = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        var result = yield _$$_REQUIRE(_dependencyMap[4]).RemoteConfigService.fetchValues();
        setRemoteConfigs(result);
        return result;
      });
      return function fetchValues() {
        return _ref2.apply(this, arguments);
      };
    }();
    var getValue = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (key) {
        var result = yield fetchValues();
        return result.find(function (x) {
          return x.key === key;
        });
      });
      return function getValue(_x) {
        return _ref3.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      fetchValues();
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(FirebaseContext.Provider, {
      value: {
        fetchValues: fetchValues,
        getValue: getValue,
        remoteConfigs: remoteConfigs
      },
      children: children
    });
  }
  var useFirebaseContext = exports.useFirebaseContext = function useFirebaseContext() {
    return (0, _react.useContext)(FirebaseContext);
  };
