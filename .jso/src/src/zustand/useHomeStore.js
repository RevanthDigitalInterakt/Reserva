  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useHomeStore = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var homeStore = (0, _$$_REQUIRE(_dependencyMap[3]).create)(function (set) {
    return {
      loading: true,
      hasTabBar: true,
      carousels: [],
      offersCarousels: [],
      discountBar: undefined,
      offersPage: undefined,
      shelfOffers: {
        shelfProductsBottom: '',
        shelfProductsTop: '',
        shelfSubtitleBottom: '',
        shelfSubtitleTop: '',
        shelfTitle: ''
      },
      commercialBannerCollection: undefined,
      medias: [],
      setHasTabBar: function setHasTabBar(hasTabBar) {
        return set(function () {
          return {
            hasTabBar: hasTabBar
          };
        });
      },
      onLoad: function () {
        var _onLoad = (0, _asyncToGenerator2.default)(function* () {
          var client = (0, _$$_REQUIRE(_dependencyMap[4]).getApolloClient)();
          var _apolloFetchPolicySto = _$$_REQUIRE(_dependencyMap[5]).apolloFetchPolicyStore.getState(),
            getFetchPolicyPerKey = _apolloFetchPolicySto.getFetchPolicyPerKey;
          var _yield$client$query = yield client.query({
              context: {
                clientName: 'gateway'
              },
              fetchPolicy: getFetchPolicyPerKey('homeCarousels'),
              query: _$$_REQUIRE(_dependencyMap[6]).HomeCarouselsDocument
            }),
            homeData = _yield$client$query.data;
          var _yield$client$query2 = yield client.query({
              context: {
                clientName: 'gateway'
              },
              fetchPolicy: getFetchPolicyPerKey('homeCarousels'),
              query: _$$_REQUIRE(_dependencyMap[6]).OffersCarouselsDocument
            }),
            offersData = _yield$client$query2.data;
          set(function () {
            var _offersData$offersCar, _offersData$offersCar2, _offersData$offersCar3, _offersData$offersCar4, _offersData$offersCar5;
            return {
              loading: true,
              carousels: homeData.homeCarousels,
              offersCarousels: offersData.offersCarousels,
              shelfOffers: {
                shelfTitle: ((_offersData$offersCar = offersData.offersCarousels[0]) == null ? undefined : _offersData$offersCar.shelfTitle) || '',
                shelfProductsBottom: ((_offersData$offersCar2 = offersData.offersCarousels[0]) == null ? undefined : _offersData$offersCar2.shelfProductsBottom) || '',
                shelfProductsTop: ((_offersData$offersCar3 = offersData.offersCarousels[0]) == null ? undefined : _offersData$offersCar3.shelfProductsTop) || '',
                shelfSubtitleBottom: ((_offersData$offersCar4 = offersData.offersCarousels[0]) == null ? undefined : _offersData$offersCar4.shelfSubtitleBottom) || '',
                shelfSubtitleTop: ((_offersData$offersCar5 = offersData.offersCarousels[0]) == null ? undefined : _offersData$offersCar5.shelfSubtitleTop) || ''
              }
            };
          });
          try {
            var _yield$client$query3 = yield client.query({
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: getFetchPolicyPerKey('homeCarousels'),
                query: _$$_REQUIRE(_dependencyMap[6]).HomeCarouselsDocument
              }),
              data = _yield$client$query3.data;
            var _yield$Promise$all = yield Promise.all([client.query({
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: getFetchPolicyPerKey('homeMedias'),
                query: _$$_REQUIRE(_dependencyMap[6]).HomeMediasDocument
              }), client.query({
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: getFetchPolicyPerKey('homeConfig'),
                query: _$$_REQUIRE(_dependencyMap[6]).HomeConfigDocument
              })]),
              _yield$Promise$all2 = (0, _slicedToArray2.default)(_yield$Promise$all, 2),
              medias = _yield$Promise$all2[0],
              config = _yield$Promise$all2[1];
            set(function () {
              var _config$data$homeConf, _config$data$homeConf2;
              return {
                medias: medias.data.homeMedias || [],
                offersPage: ((_config$data$homeConf = config.data.homeConfig) == null ? undefined : _config$data$homeConf.offersPage) || undefined,
                commercialBannerCollection: ((_config$data$homeConf2 = config.data.homeConfig) == null ? undefined : _config$data$homeConf2.commercialBannerCollection) || undefined,
                loading: false,
                carousels: data.homeCarousels
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
        function onLoad() {
          return _onLoad.apply(this, arguments);
        }
        return onLoad;
      }()
    };
  });
  var useHomeStore = exports.useHomeStore = (0, _$$_REQUIRE(_dependencyMap[7]).createZustandStoreWithSelectors)(homeStore);
