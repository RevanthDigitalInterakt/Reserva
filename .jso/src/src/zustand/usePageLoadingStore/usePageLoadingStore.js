  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.usePageLoadingStore = undefined;
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var routesArray = ['Home', 'ProductDetail', 'ProductCatalog', 'BagScreen', 'NewBag', 'DeliveryScreen', 'WishList', 'OrderList', 'EditProfile', 'MY_CASHBACK_MY_WALLET', 'Offers', 'AddressList', 'Search', 'Login', undefined];
  var initialState = {
    currentRoute: undefined,
    startLoadingTime: 0
  };
  var pageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[2]).create)(function (set, getState) {
    return Object.assign({}, initialState, {
      onStartLoad: function onStartLoad(page) {
        var state = getState();
        if (!page) return;
        var pageFind = routesArray.includes(page);
        if (page === state.currentRoute || !pageFind) return;
        set(function () {
          return {
            currentRoute: page,
            startLoadingTime: new Date().getTime()
          };
        });
      },
      onFinishLoad: function onFinishLoad() {
        var state = getState();
        if (!state.startLoadingTime) return;
        var currTime = new Date().getTime();
        var timeElapsed = currTime - getState().startLoadingTime;
        if (timeElapsed && state.currentRoute) {
          var value = timeElapsed / 1000;
          try {
            _EventProvider.default.logEvent('page_load_time', {
              page: state.currentRoute,
              value: value
            });
          } catch (error) {
            _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(error);
          }
        }
        set(initialState);
      }
    });
  });
  var usePageLoadingStore = exports.usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[4]).createZustandStoreWithSelectors)(pageLoadingStore);
