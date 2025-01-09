  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _NewListVerticalProducts = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _useSearchStore2 = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  var _NewCountdown = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _Banner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _ProductNotFound = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _ProductCatalogHeader = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var defaultReference = 'collection:2407';
  function NewProductCatalog(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route,
      _ref$showTabBar = _ref.showTabBar,
      showTabBar = _ref$showTabBar === undefined ? true : _ref$showTabBar,
      _ref$showWhatsappButt = _ref.showWhatsappButton,
      showWhatsappButton = _ref$showWhatsappButt === undefined ? true : _ref$showWhatsappButt;
    var _useSearchStore = (0, _useSearchStore2.default)(['doFetchMore', 'loading', 'result', 'resultCount', 'onSearch', 'parameters', 'onInit']),
      doFetchMore = _useSearchStore.doFetchMore,
      loading = _useSearchStore.loading,
      result = _useSearchStore.result,
      resultCount = _useSearchStore.resultCount,
      parameters = _useSearchStore.parameters,
      onSearch = _useSearchStore.onSearch,
      onInit = _useSearchStore.onInit;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isGoingBack = _useState2[0],
      setIsGoingBack = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loadingMedias = _useState4[0],
      setLoadingMedias = _useState4[1];
    var _ref2 = route.params || {},
      referenceId = _ref2.referenceId,
      filters = _ref2.filters;
    var _useHomeStore = (0, _$$_REQUIRE(_dependencyMap[13]).useHomeStore)(['offersPage']),
      offersPage = _useHomeStore.offersPage;
    var reference = (0, _react.useMemo)(function () {
      return referenceId || offersPage || defaultReference;
    }, [referenceId, offersPage]);
    var countdownType = reference === offersPage ? _$$_REQUIRE(_dependencyMap[14]).ClockScreenEnum.Offers : _$$_REQUIRE(_dependencyMap[14]).ClockScreenEnum.Category;
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[15]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;
    var defaultFacets = (0, _react.useMemo)(function () {
      return (0, _$$_REQUIRE(_dependencyMap[16]).generateFacets)(Object.assign({}, filters, {
        reference: reference
      }));
    }, [filters, reference]);
    (0, _react.useEffect)(function () {
      var _parameters$facets$fi;
      _EventProvider.default.logEvent('view_item_list', {
        item_brand: '',
        items: result.map(function (item) {
          return {
            price: item == null ? undefined : item.currentPrice,
            item_id: item == null ? undefined : item.productId,
            item_name: item == null ? undefined : item.productName
          };
        })
      });
      _EventProvider.default.logScreenViewEvent(`/pdc/${(_parameters$facets$fi = parameters.facets.find(function (facet) {
        return facet.key === 'productClusterIds';
      })) == null ? undefined : _parameters$facets$fi.value}`);
      _UxCam.default.tagScreen('Product Catalog Screen');
      _UxCam.default.logEvent('product catalog view', {
        reference: reference
      });
    }, []);
    (0, _react.useEffect)(function () {
      if (!loading && startLoadingTime > 0) {
        onFinishLoad();
      }
    }, [loading, startLoadingTime, onFinishLoad]);
    (0, _react.useEffect)(function () {
      var unsubscribe = navigation.addListener('focus', /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
        if (isGoingBack) {
          setIsGoingBack(false);
          return;
        }
        onInit(_useSearchStore2.SearchType.CATALOG);
        onSearch({
          facets: defaultFacets
        });
      }));
      return unsubscribe;
    }, [defaultFacets, navigation, onSearch, onInit, isGoingBack]);
    var hasFilters = (0, _react.useMemo)(function () {
      return !!parameters.facets.length;
    }, [parameters.facets]);
    var renderList = (0, _react.useMemo)(function () {
      if (loadingMedias && loading && !result.length) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[18]).CatalogSkeleton, {
          loading: loading
        });
      }
      if (!result.length && !hasFilters && !loading) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_ProductNotFound.default, {});
      }
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsxs)(_reactNative.SafeAreaView, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_ProductCatalogHeader.default, {
          defaultFacets: defaultFacets,
          showWhatsappButton: showWhatsappButton
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_NewListVerticalProducts.default, {
          data: result,
          loading: loading,
          cacheGoingBackRequest: function cacheGoingBackRequest() {
            return setIsGoingBack(true);
          },
          headerComponent: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Fragment, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_reactNative.View, {
              style: {
                marginTop: (0, _$$_REQUIRE(_dependencyMap[19]).scale)(120)
              }
            }), countdownType === 'CATEGORY' ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_NewCountdown.default, {
              reference: reference,
              selectClockScreen: countdownType
            }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_NewCountdown.default, {
              selectClockScreen: countdownType
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_Banner.default, {
              setLoading: setLoadingMedias,
              reference: reference
            })]
          }),
          marginBottom: 90,
          onFetchMore: doFetchMore,
          total: resultCount
        })]
      });
    }, [loadingMedias, loading, result, hasFilters, reference, defaultFacets, doFetchMore, resultCount]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsxs)(_$$_REQUIRE(_dependencyMap[20]).Box, {
      flex: 1,
      backgroundColor: "white",
      height: 800,
      children: [showTabBar && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[21]).TopBarDefaultBackButton, {
        loading: loading,
        cacheGoingBackRequest: function cacheGoingBackRequest() {
          return setIsGoingBack(true);
        }
      }), renderList]
    });
  }
  var _default = exports.default = NewProductCatalog;
