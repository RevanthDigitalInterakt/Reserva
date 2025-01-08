  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useSearchStore = exports.default = exports.SearchType = exports.SearchStatusEnum = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var SearchStatusEnum = exports.SearchStatusEnum = /*#__PURE__*/function (SearchStatusEnum) {
    SearchStatusEnum[SearchStatusEnum["INITIAL"] = 0] = "INITIAL";
    SearchStatusEnum[SearchStatusEnum["SUGGESTIONS"] = 1] = "SUGGESTIONS";
    SearchStatusEnum[SearchStatusEnum["RESULT"] = 2] = "RESULT";
    return SearchStatusEnum;
  }({});
  var SearchType = exports.SearchType = /*#__PURE__*/function (SearchType) {
    SearchType[SearchType["CATALOG"] = 0] = "CATALOG";
    SearchType[SearchType["SEARCH"] = 1] = "SEARCH";
    SearchType[SearchType["DEFAULT"] = 2] = "DEFAULT";
    return SearchType;
  }({});
  var RESULT_PER_PAGE = 12;
  var initialData = {
    initialized: false,
    loading: false,
    status: SearchStatusEnum.INITIAL,
    searchType: SearchType.DEFAULT,
    resultCount: 0,
    result: [],
    filters: {
      categories: new Set(),
      colors: new Set(),
      sizes: new Set(),
      price: undefined
    },
    parameters: {
      facets: [],
      page: 1,
      q: '',
      orderBy: _$$_REQUIRE(_dependencyMap[5]).SearchOrderByEnum.OrderByScoreDesc,
      perPage: RESULT_PER_PAGE,
      priceRange: null,
      analitycsTags: ['app']
    }
  };
  var useSearchStore = exports.useSearchStore = (0, _$$_REQUIRE(_dependencyMap[6]).create)(function (set, getState) {
    return {
      initialized: false,
      loading: false,
      status: SearchStatusEnum.INITIAL,
      searchType: SearchType.DEFAULT,
      resultCount: 0,
      filters: {
        categories: new Set(),
        colors: new Set(),
        sizes: new Set(),
        price: undefined
      },
      parameters: {
        q: '',
        page: 1,
        orderBy: _$$_REQUIRE(_dependencyMap[5]).SearchOrderByEnum.OrderByScoreDesc,
        facets: [],
        perPage: RESULT_PER_PAGE,
        priceRange: null,
        provider: null,
        analitycsTags: ['app']
      },
      result: [],
      queryID: '',
      setQueryID: function setQueryID(queryID) {
        return set(function () {
          return {
            queryID: queryID
          };
        });
      },
      onInit: function onInit(searchType) {
        return set(function () {
          return Object.assign({}, initialData, {
            searchType: searchType,
            initialized: true
          });
        });
      },
      setStatus: function setStatus(status) {
        return set(function () {
          return {
            status: status
          };
        });
      },
      setQ: function setQ(q) {
        var newParameters = Object.assign({}, getState().parameters, {
          q: q
        });
        set(function () {
          return {
            parameters: newParameters
          };
        });
      },
      onSearch: function () {
        var _onSearch = (0, _asyncToGenerator2.default)(function* (parameters, filters) {
          try {
            var client = (0, _$$_REQUIRE(_dependencyMap[7]).getApolloClient)();
            _reactNative.Keyboard.dismiss();
            var _useRemoteConfig$getS = _$$_REQUIRE(_dependencyMap[8]).useRemoteConfig.getState(),
              getBoolean = _useRemoteConfig$getS.getBoolean;
            var provider = getBoolean('show_on_smart_hint') ? _$$_REQUIRE(_dependencyMap[5]).SearchProviderEnum.Algolia : _$$_REQUIRE(_dependencyMap[5]).SearchProviderEnum.Vtex;
            var newParameters = Object.assign({}, {
              provider: provider
            }, getState().parameters, parameters);
            set(function () {
              return {
                loading: true,
                result: [],
                resultCount: 0,
                status: SearchStatusEnum.RESULT,
                parameters: newParameters
              };
            });
            var _yield$client$query = yield client.query({
                notifyOnNetworkStatusChange: true,
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: 'no-cache',
                query: _$$_REQUIRE(_dependencyMap[5]).SearchDocument,
                variables: {
                  input: newParameters
                }
              }),
              data = _yield$client$query.data;
            if (data.search.queryID) {
              set(function () {
                return {
                  queryID: data.search.queryID
                };
              });
            }
            var _getState = getState(),
              searchType = _getState.searchType;
            var trackStore = _$$_REQUIRE(_dependencyMap[9]).trackPageViewStore.getState();
            var trackClick = _$$_REQUIRE(_dependencyMap[10]).trackClickStore.getState();
            if (searchType === SearchType.SEARCH) {
              var type = data.search.count ? _$$_REQUIRE(_dependencyMap[5]).TrackPageTypeEnum.SearchWithResult : _$$_REQUIRE(_dependencyMap[5]).TrackPageTypeEnum.Search;
              var newData = {
                productId: '',
                identifier: ''
              };
              trackClick.onTrackClick(newData, data.search.identifier || '', type);
              trackStore.onTrackPageView(data.search.identifier || '', type);
              (0, _$$_REQUIRE(_dependencyMap[11]).trackEventSearchDito)(String(newParameters.q), data.search.count);
              _EventProvider.default.logEvent('view_search_results', {
                search_term: String(newParameters.q)
              });
            }
            if (searchType === SearchType.CATALOG) {
              var _data$search$items$;
              trackStore.onTrackPageView(data.search.identifier || '', _$$_REQUIRE(_dependencyMap[5]).TrackPageTypeEnum.Category);
              (0, _$$_REQUIRE(_dependencyMap[12]).trackEventAccessedCategoryDito)((0, _$$_REQUIRE(_dependencyMap[13]).getCollectionFacetsValue)(newParameters.facets));
              _EventProvider.default.logEvent('product_list_view', {
                content_type: 'product_group',
                item_brand: (0, _$$_REQUIRE(_dependencyMap[14]).getBrandByUrl)({
                  categoryTree: [{
                    href: ((_data$search$items$ = data.search.items[0]) == null ? undefined : _data$search$items$.category) || ''
                  }]
                })
              });
            }
            set(function () {
              return Object.assign({
                loading: false
              }, filters ? {
                filters: filters
              } : {}, {
                result: data.search.items,
                resultCount: data.search.count
              });
            });
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[15]).ExceptionProvider.captureException(err);
          }
        });
        function onSearch(_x, _x2) {
          return _onSearch.apply(this, arguments);
        }
        return onSearch;
      }(),
      doFetchMore: function () {
        var _doFetchMore = (0, _asyncToGenerator2.default)(function* () {
          try {
            var client = (0, _$$_REQUIRE(_dependencyMap[7]).getApolloClient)();
            set(function () {
              return {
                loading: true,
                status: SearchStatusEnum.RESULT
              };
            });
            var state = getState();
            var newParameters = Object.assign({}, state.parameters, {
              page: state.parameters.page + 1
            });
            var _yield$client$query2 = yield client.query({
                notifyOnNetworkStatusChange: true,
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: 'network-only',
                query: _$$_REQUIRE(_dependencyMap[5]).SearchDocument,
                variables: {
                  input: newParameters
                }
              }),
              data = _yield$client$query2.data;
            var resultCount = data.search.items.length ? data.search.count : 0;
            if (resultCount === 0 && state.result.length === 0) {
              set(function () {
                return {
                  loading: false,
                  parameters: Object.assign({}, state.parameters, {
                    page: 0
                  })
                };
              });
              state.doFetchMore();
            }
            set(function () {
              return {
                loading: false,
                parameters: newParameters,
                result: [].concat((0, _toConsumableArray2.default)(state.result), (0, _toConsumableArray2.default)(data.search.items)),
                resultCount: resultCount
              };
            });
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[15]).ExceptionProvider.captureException(err);
          }
        });
        function doFetchMore() {
          return _doFetchMore.apply(this, arguments);
        }
        return doFetchMore;
      }()
    };
  });
  var _default = exports.default = (0, _$$_REQUIRE(_dependencyMap[16]).createZustandStoreWithSelectors)(useSearchStore);
