  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _DeepLinkPathModule = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _useSearchStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var DEFAULT_DEBAUNCE = 400;
  function SearchSuggestionsPage() {
    var _data$searchAutocompl;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[8]).usePrimeInfo)(),
      primeActive = _usePrimeInfo.primeActive,
      primeLPSearchTerms = _usePrimeInfo.primeLPSearchTerms;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[9]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var _useSearchStore = (0, _useSearchStore2.default)(['onSearch', 'parameters']),
      onSearch = _useSearchStore.onSearch,
      parameters = _useSearchStore.parameters;
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[10]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var showOnSmartint = (0, _react.useMemo)(function () {
      return getBoolean('show_on_smart_hint');
    }, [getBoolean]);
    var _useSearchAutocomplet = (0, _$$_REQUIRE(_dependencyMap[11]).useSearchAutocompleteSuggestionsLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        notifyOnNetworkStatusChange: true,
        variables: {
          q: parameters.q,
          analitycsTags: ['app'],
          provider: {
            value: showOnSmartint ? _$$_REQUIRE(_dependencyMap[11]).SearchProviderEnum.Algolia : _$$_REQUIRE(_dependencyMap[11]).SearchProviderEnum.Vtex
          }
        },
        fetchPolicy: getFetchPolicyPerKey('searchAutocompleteSuggestions')
      }),
      _useSearchAutocomplet2 = (0, _slicedToArray2.default)(_useSearchAutocomplet, 2),
      getSuggestions = _useSearchAutocomplet2[0],
      _useSearchAutocomplet3 = _useSearchAutocomplet2[1],
      data = _useSearchAutocomplet3.data,
      loading = _useSearchAutocomplet3.loading;
    var _useCheckSearchRedire = (0, _$$_REQUIRE(_dependencyMap[11]).useCheckSearchRedirectLazyQuery)({
        context: {
          clientName: 'gateway'
        }
      }),
      _useCheckSearchRedire2 = (0, _slicedToArray2.default)(_useCheckSearchRedire, 1),
      getCheckSearchRedirect = _useCheckSearchRedire2[0];
    var handleCheckSearchTerm = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      if (!parameters.q) return;
      var term = (parameters.q || '').toLowerCase().trim();
      if (primeActive && primeLPSearchTerms.includes(term)) {
        _reactNative.Keyboard.dismiss();
        navigation.navigate('PrimeLP');
        return;
      }
      var _yield$getCheckSearch = yield getCheckSearchRedirect({
          variables: {
            q: parameters.q
          },
          fetchPolicy: getFetchPolicyPerKey('checkSearchRedirect')
        }),
        dataSearch = _yield$getCheckSearch.data;
      if (dataSearch != null && dataSearch.checkSearchRedirect) {
        yield _DeepLinkPathModule.default.openUrlInBrowser({
          closeCurrentAppInstance: true,
          url: dataSearch.checkSearchRedirect
        });
        return;
      }
      setTimeout(function () {
        getSuggestions();
      }, DEFAULT_DEBAUNCE);
    }), [parameters.q, primeActive, primeLPSearchTerms, getCheckSearchRedirect, getFetchPolicyPerKey, navigation]);
    (0, _react.useEffect)(function () {
      handleCheckSearchTerm();
    }, [parameters.q]);
    if (!parameters.q) return null;
    if (loading) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
        bg: "white",
        marginY: "nano",
        justifyContent: "center",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_reactNative.ActivityIndicator, {
          size: "small",
          color: _$$_REQUIRE(_dependencyMap[14]).COLORS.BLACK
        })
      });
    }
    return data != null && (_data$searchAutocompl = data.searchAutocompleteSuggestions) != null && _data$searchAutocompl.length ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
      bg: "white",
      marginX: "nano",
      justifyContent: "center",
      children: data.searchAutocompleteSuggestions.map(function (suggestion) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsxs)(_react.default.Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Button, {
            width: "100%",
            onPress: function onPress() {
              onSearch({
                q: suggestion,
                page: 1,
                facets: []
              });
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
              width: "100%",
              paddingX: "micro",
              minHeight: 40,
              justifyContent: "center",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 12,
                color: "searchBarTextColor",
                children: suggestion
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Divider, {
            variant: "fullWidth"
          })]
        }, `search-suggestion-${parameters.q}-${suggestion}`);
      })
    }) : null;
  }
  var _default = exports.default = SearchSuggestionsPage;
