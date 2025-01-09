  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useRegionalSearch = exports.default = exports.RegionalSearchContext = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var getRegionId = function getRegionId() {
    var regionId = null;
    _asyncStorage.default.getItem('@RNRegionalSearch:regionId').then(function (x) {
      return regionId = x;
    });
    return regionId;
  };
  var getCep = function getCep() {
    var regionId = null;
    _asyncStorage.default.getItem('@RNRegionalSearch:cep').then(function (x) {
      return regionId = x;
    });
    return regionId;
  };
  var getSegmentToken = function getSegmentToken() {
    var segmentToken = null;
    _asyncStorage.default.getItem('@RNRegionalSearch:segmentToken').then(function (x) {
      return segmentToken = x;
    });
    return segmentToken;
  };
  var RegionalSearchContext = exports.RegionalSearchContext = (0, _react.createContext)({
    regionId: getRegionId(),
    setRegionId: function () {
      var _setRegionId = (0, _asyncToGenerator2.default)(function* () {
        return (yield _asyncStorage.default.getItem('@RNAuth:regionId')) || '';
      });
      function setRegionId() {
        return _setRegionId.apply(this, arguments);
      }
      return setRegionId;
    }(),
    segmentToken: getSegmentToken(),
    setSegmentToken: function () {
      var _setSegmentToken = (0, _asyncToGenerator2.default)(function* () {
        return (yield _asyncStorage.default.getItem('@RNAuth:segmentToken')) || '';
      });
      function setSegmentToken() {
        return _setSegmentToken.apply(this, arguments);
      }
      return setSegmentToken;
    }(),
    cep: getCep(),
    setCep: function () {
      var _setCep = (0, _asyncToGenerator2.default)(function* () {
        return (yield _asyncStorage.default.getItem('@RNAuth:cep')) || '';
      });
      function setCep() {
        return _setCep.apply(this, arguments);
      }
      return setCep;
    }(),
    fetchRegionId: function fetchRegionId(segmentId) {}
  });
  function RegionalSearchContextProvider(_ref) {
    var children = _ref.children;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      regionId = _useState2[0],
      setRegionId = _useState2[1];
    var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      cep = _useState4[0],
      setCep = _useState4[1];
    var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      segmentToken = _useState6[0],
      setSegmentToken = _useState6[1];
    var fetchRegionId = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (segmentId) {
        if (segmentId) {
          var _yield$instance$get = yield _$$_REQUIRE(_dependencyMap[5]).instance.get(`/segments/${segmentId}`),
            data = _yield$instance$get.data;
          return data;
        }
      });
      return function fetchRegionId(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      if (regionId) {
        _asyncStorage.default.setItem('@RNRegionalSearch:regionId', regionId);
      }
    }, [regionId]);
    (0, _react.useEffect)(function () {
      if (cep) {
        _asyncStorage.default.setItem('@RNRegionalSearch:cep', cep);
      }
    }, [cep]);
    (0, _react.useLayoutEffect)(function () {
      fetchRegionId(segmentToken);
      if (segmentToken) {
        _asyncStorage.default.setItem('@RNRegionalSearch:segmentToken', segmentToken);
      }
    }, [segmentToken]);
    (0, _react.useEffect)(function () {
      _asyncStorage.default.getItem('@RNRegionalSearch:regionId').then(function (value) {
        setRegionId(value);
      });
      _asyncStorage.default.getItem('@RNRegionalSearch:cep').then(function (value) {
        setCep(value);
      });
      _asyncStorage.default.getItem('@RNRegionalSearch:segmentToken').then(function (value) {
        setSegmentToken(value);
      });
    });
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(RegionalSearchContext.Provider, {
      value: {
        regionId: regionId,
        setRegionId: setRegionId,
        segmentToken: segmentToken,
        setSegmentToken: setSegmentToken,
        cep: cep,
        setCep: setCep,
        fetchRegionId: fetchRegionId
      },
      children: children
    });
  }
  var _default = exports.default = RegionalSearchContextProvider;
  var useRegionalSearch = exports.useRegionalSearch = function useRegionalSearch() {
    var regionalSearchContext = (0, _react.useContext)(RegionalSearchContext);
    if (!regionalSearchContext) {
      throw new Error('use RegionalSearch must be used within a RegionalSearchContextProvider');
    }
    var regionId = regionalSearchContext.regionId,
      setRegionId = regionalSearchContext.setRegionId,
      segmentToken = regionalSearchContext.segmentToken,
      setSegmentToken = regionalSearchContext.setSegmentToken,
      cep = regionalSearchContext.cep,
      setCep = regionalSearchContext.setCep,
      fetchRegionId = regionalSearchContext.fetchRegionId;
    return {
      regionId: regionId,
      setRegionId: setRegionId,
      segmentToken: segmentToken,
      setSegmentToken: setSegmentToken,
      cep: cep,
      setCep: setCep,
      fetchRegionId: fetchRegionId
    };
  };
