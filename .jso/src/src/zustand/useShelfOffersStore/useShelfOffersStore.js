  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useShelfOffersStore = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var initialData = {
    loading: false,
    shelfTop: [],
    shelfBottom: [],
    shelfInfo: [],
    parameters: {
      facets: [],
      page: 1,
      q: '',
      orderBy: _$$_REQUIRE(_dependencyMap[3]).SearchOrderByEnum.OrderByScoreDesc,
      perPage: 6,
      priceRange: null,
      analitycsTags: ['app']
    }
  };
  var shelfOffersStore = (0, _$$_REQUIRE(_dependencyMap[4]).create)(function (set, getState) {
    return Object.assign({}, initialData, {
      onLoadOffersShelf: function () {
        var _onLoadOffersShelf = (0, _asyncToGenerator2.default)(function* (data) {
          set(function () {
            return {
              loading: true
            };
          });
          if (!data.shelfProductsTop && !data.shelfProductsBottom) return;
          try {
            var _payloadTop$search, _payloadBottom$search;
            var client = (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)();
            var provider = _$$_REQUIRE(_dependencyMap[3]).SearchProviderEnum.Algolia;
            var shelfProductsTopFacets = (0, _$$_REQUIRE(_dependencyMap[6]).generateFacets)({
              reference: (data == null ? undefined : data.shelfProductsTop) || ''
            });
            var shelfTopParameters = Object.assign({}, {
              provider: provider
            }, getState().parameters, {
              facets: shelfProductsTopFacets
            });
            var shelfProductsBottomFacets = (0, _$$_REQUIRE(_dependencyMap[6]).generateFacets)({
              reference: (data == null ? undefined : data.shelfProductsBottom) || ''
            });
            var shelfBottomParameters = Object.assign({}, {
              provider: provider
            }, getState().parameters, {
              facets: shelfProductsBottomFacets
            });
            var _yield$Promise$all = yield Promise.all([client.query({
                notifyOnNetworkStatusChange: true,
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: 'no-cache',
                query: _$$_REQUIRE(_dependencyMap[3]).SearchDocument,
                variables: {
                  input: shelfTopParameters
                }
              }), client.query({
                notifyOnNetworkStatusChange: true,
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: 'no-cache',
                query: _$$_REQUIRE(_dependencyMap[3]).SearchDocument,
                variables: {
                  input: shelfBottomParameters
                }
              })]),
              _yield$Promise$all2 = (0, _slicedToArray2.default)(_yield$Promise$all, 2),
              payloadTop = _yield$Promise$all2[0].data,
              payloadBottom = _yield$Promise$all2[1].data;
            var arrTopSliced = payloadTop == null ? undefined : (_payloadTop$search = payloadTop.search) == null ? undefined : _payloadTop$search.items.slice(0, 6);
            var arrBottomSliced = payloadBottom == null ? undefined : (_payloadBottom$search = payloadBottom.search) == null ? undefined : _payloadBottom$search.items.slice(0, 6);
            var shelfTop = (0, _$$_REQUIRE(_dependencyMap[7]).getShelfData)(arrTopSliced);
            var shelfBottom = (0, _$$_REQUIRE(_dependencyMap[7]).getShelfData)(arrBottomSliced);
            var shelfInfo = [{
              shelfTitle: data.shelfTitle,
              shelfName: data.shelfSubtitleTop,
              products: shelfTop,
              id: data.shelfProductsTop
            }, {
              shelfTitle: '',
              shelfName: data.shelfSubtitleBottom,
              products: shelfBottom,
              id: data.shelfProductsBottom
            }];
            set(function () {
              return {
                shelfTop: payloadTop.search.items,
                shelfBottom: payloadBottom.search.items,
                shelfInfo: shelfInfo,
                loading: false
              };
            });
          } catch (_unused) {
            set(function () {
              return {
                loading: false
              };
            });
          }
        });
        function onLoadOffersShelf(_x) {
          return _onLoadOffersShelf.apply(this, arguments);
        }
        return onLoadOffersShelf;
      }()
    });
  });
  var useShelfOffersStore = exports.useShelfOffersStore = (0, _$$_REQUIRE(_dependencyMap[8]).createZustandStoreWithSelectors)(shelfOffersStore);
