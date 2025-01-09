  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useOffersStore = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var offersStore = (0, _$$_REQUIRE(_dependencyMap[3]).create)(function (set) {
    return {
      loading: true,
      hasTabBar: true,
      carousels: [],
      discountBar: undefined,
      offersPage: undefined,
      commercialBannerCollection: undefined,
      collectionFilters: {
        items: [],
        title: ''
      },
      bannerCarousel: {
        title: '',
        items: []
      },
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
          set(function () {
            return {
              loading: true
            };
          });
          try {
            var collectionFiltersPromise = client.query({
              context: {
                clientName: 'gateway'
              },
              query: _$$_REQUIRE(_dependencyMap[5]).OffersPageDocument
            });
            var bannerCarouselPromise = client.query({
              context: {
                clientName: 'gateway'
              },
              query: _$$_REQUIRE(_dependencyMap[5]).OffersPageCollectionBannerCarouselDocument
            });
            var _yield$Promise$all = yield Promise.all([collectionFiltersPromise, bannerCarouselPromise]),
              _yield$Promise$all2 = (0, _slicedToArray2.default)(_yield$Promise$all, 2),
              collectionFilters = _yield$Promise$all2[0],
              bannerCarousel = _yield$Promise$all2[1];
            set(function () {
              return {
                collectionFilters: {
                  items: collectionFilters.data.offersPageCollectionFilter.items,
                  title: collectionFilters.data.offersPageCollectionFilter.title
                },
                bannerCarousel: {
                  items: bannerCarousel.data.offersPageCollectionBannerCarousel.items,
                  title: bannerCarousel.data.offersPageCollectionBannerCarousel.title
                }
              };
            });
          } catch (_unused) {/* empty */} finally {
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
  var useOffersStore = exports.useOffersStore = (0, _$$_REQUIRE(_dependencyMap[6]).createZustandStoreWithSelectors)(offersStore);
