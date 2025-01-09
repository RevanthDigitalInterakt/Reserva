  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  exports.formatInput = formatInput;
  exports.isValidInput = isValidInput;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _useSearchStore2 = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function isValidInput(input) {
    return input.trim().length > 0;
  }
  function formatInput(input) {
    return input.trimStart();
  }
  function SearchWrapper(_ref) {
    var children = _ref.children;
    var _useSearchStore = (0, _useSearchStore2.default)(['loading', 'onSearch', 'parameters', 'setQ', 'setStatus', 'status']),
      setQ = _useSearchStore.setQ,
      loading = _useSearchStore.loading,
      onSearch = _useSearchStore.onSearch,
      parameters = _useSearchStore.parameters,
      setStatus = _useSearchStore.setStatus,
      status = _useSearchStore.status;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];
    function handleSearchTerm(term) {
      if (isValidInput(term)) {
        if (status !== _useSearchStore2.SearchStatusEnum.RESULT && term) {
          setStatus(_useSearchStore2.SearchStatusEnum.SUGGESTIONS);
        }
        setQ(formatInput(term));
      }
      setSearchTerm(formatInput(term));
      return null;
    }
    function handleClickIcon() {
      if (isValidInput(searchTerm)) {
        onSearch({
          q: searchTerm || '',
          facets: [],
          page: 1
        });
      }
      return null;
    }
    (0, _react.useEffect)(function () {
      setSearchTerm(parameters.q);
    }, [parameters.q, status]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
      backgroundColor: "white",
      flex: 1,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).TopBarDefaultBackButton, {
        loading: loading
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        paddingX: "nano",
        paddingBottom: "micro",
        paddingTop: "micro",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).SearchBar, {
          value: searchTerm,
          onValueChange: handleSearchTerm,
          onClickIcon: handleClickIcon,
          height: 36,
          placeholder: "Buscar"
        })
      }), children]
    });
  }
  var _default = exports.default = SearchWrapper;
