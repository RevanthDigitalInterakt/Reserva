  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _SearchInitialPage = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var _SearchSuggestionsPage = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[3]));
  var _SearchResultsPage = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[4]));
  var _useSearchStore2 = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  var _SearchWrapper = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[6]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[7]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewSearch() {
    var _useSearchStore = (0, _useSearchStore2.default)(['status', 'onInit', 'initialized']),
      status = _useSearchStore.status,
      initialized = _useSearchStore.initialized,
      onInit = _useSearchStore.onInit;
    (0, _react.useEffect)(function () {
      _EventProvider.default.logScreenViewEvent('/search');
      onInit(_useSearchStore2.SearchType.SEARCH);
      _UxCam.default.tagScreen('Search Screen');
      return function () {
        onInit(_useSearchStore2.SearchType.SEARCH);
      };
    }, [onInit]);
    return initialized ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_SearchWrapper.default, {
      children: [status === _useSearchStore2.SearchStatusEnum.INITIAL && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_SearchInitialPage.default, {}), status === _useSearchStore2.SearchStatusEnum.SUGGESTIONS && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_SearchSuggestionsPage.default, {}), status === _useSearchStore2.SearchStatusEnum.RESULT && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_SearchResultsPage.default, {})]
    }) : null;
  }
  var _default = exports.default = NewSearch;
