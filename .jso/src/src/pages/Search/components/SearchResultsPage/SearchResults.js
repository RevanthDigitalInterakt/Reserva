  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _useSearchStore2 = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _ProductNotFound = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _NewListVerticalProducts = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  var _SearchResultHeader = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function SearchResults() {
    var _useSearchStore = (0, _useSearchStore2.default)(['loading', 'result', 'resultCount', 'doFetchMore', 'parameters']),
      result = _useSearchStore.result,
      resultCount = _useSearchStore.resultCount,
      loading = _useSearchStore.loading,
      doFetchMore = _useSearchStore.doFetchMore,
      parameters = _useSearchStore.parameters;
    var hasFilters = (0, _react.useMemo)(function () {
      return !!parameters.facets.length;
    }, [parameters.facets]);
    if (loading && !result.length) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
        bg: "white",
        marginY: "nano",
        justifyContent: "center",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.ActivityIndicator, {
          size: "small",
          color: _$$_REQUIRE(_dependencyMap[9]).COLORS.BLACK
        })
      });
    }
    if (!result.length && !hasFilters) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ProductNotFound.default, {});
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_SearchResultHeader.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_NewListVerticalProducts.default, {
        data: result,
        total: resultCount,
        loading: loading,
        marginBottom: 180,
        onFetchMore: doFetchMore
      })]
    });
  }
  var _default = exports.default = SearchResults;
