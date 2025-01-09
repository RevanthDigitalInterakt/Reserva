  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.News = News;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function News() {
    var _data$searchNews;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[4]).useNavigation)();
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[5]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useSearchNewsQuery = (0, _$$_REQUIRE(_dependencyMap[6]).useSearchNewsQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('searchNews')
      }),
      data = _useSearchNewsQuery.data;
    var onNavigate = (0, _react.useCallback)(function (item) {
      navigation.navigate('ProductCatalog', {
        facetInput: item.facets,
        referenceId: item.referenceId,
        orderBy: item.orderBy
      });
    }, [navigation]);
    if (!(data != null && (_data$searchNews = data.searchNews) != null && _data$searchNews.length)) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
        mt: "sm",
        marginX: "nano",
        mb: "micro",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
          fontFamily: "nunitoBold",
          fontSize: 13,
          color: "neutroFrio2",
          children: "NOVIDADES"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
        height: 170,
        pt: "quarck",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.FlatList, {
          horizontal: true,
          data: data.searchNews,
          showsHorizontalScrollIndicator: false,
          keyExtractor: function keyExtractor(item) {
            return item.image;
          },
          renderItem: function renderItem(_ref) {
            var item = _ref.item;
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, {
              onPress: function onPress() {
                return onNavigate(item);
              },
              ml: "nano",
              mr: "nano",
              width: 286,
              height: 154,
              borderRadius: "nano",
              style: {
                elevation: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[11]).platformType.ANDROID ? 4 : 0
              },
              boxShadow: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[11]).platformType.ANDROID ? null : 'topBarShadow',
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ImageComponent.default, {
                borderRadius: 8,
                height: 154,
                width: 286,
                source: {
                  uri: item.image
                }
              })
            });
          }
        })
      })]
    });
  }
