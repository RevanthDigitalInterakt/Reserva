  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useHelpCenterStore = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var initialState = {
    footerHelpCenter: {},
    titleHelpCenter: '',
    itemsHelpCenter: [],
    initialized: false,
    loading: false
  };
  var helpCenterStore = (0, _$$_REQUIRE(_dependencyMap[2]).create)(function (set, getState) {
    return Object.assign({}, initialState, {
      actions: {
        INITIAL_LOADING: function () {
          var _INITIAL_LOADING = (0, _asyncToGenerator2.default)(function* () {
            try {
              if (getState().initialized) return;
              set(function () {
                return {
                  loading: true
                };
              });
              var _yield$getApolloClien = yield (0, _$$_REQUIRE(_dependencyMap[3]).getApolloClient)().query({
                  query: _$$_REQUIRE(_dependencyMap[4]).HelpCenterCollectionDocument,
                  fetchPolicy: 'no-cache',
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien.data;
              if (!data) return;
              var items = data.helpCenterCollection.items;
              var titleHelpCenter = items == null ? undefined : items.map(function (x) {
                return x == null ? undefined : x.titleHelpCenter;
              });
              var footerHelpCenter = items == null ? undefined : items.map(function (x) {
                return x == null ? undefined : x.footerHelpCenter;
              });
              var itemsHelpCenter = items == null ? undefined : items.map(function (x) {
                var _x$itemsHelpCenterCol;
                return x == null ? undefined : (_x$itemsHelpCenterCol = x.itemsHelpCenterCollection) == null ? undefined : _x$itemsHelpCenterCol.items;
              });
              if (!titleHelpCenter || !footerHelpCenter || !itemsHelpCenter) return;
              set(function () {
                return {
                  titleHelpCenter: titleHelpCenter[0],
                  footerHelpCenter: footerHelpCenter[0],
                  itemsHelpCenter: itemsHelpCenter[0]
                };
              });
            } catch (error) {
              _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(error);
            } finally {
              set(function () {
                return {
                  loading: false,
                  initialized: true
                };
              });
            }
          });
          function INITIAL_LOADING() {
            return _INITIAL_LOADING.apply(this, arguments);
          }
          return INITIAL_LOADING;
        }(),
        SET_DATA: function () {
          var _SET_DATA = (0, _asyncToGenerator2.default)(function* (data) {
            try {
              var _data$items, _data$items2, _data$items3;
              set(function () {
                return {
                  loading: true
                };
              });
              var titleHelpCenter = (_data$items = data.items) == null ? undefined : _data$items.map(function (x) {
                return x == null ? undefined : x.titleHelpCenter;
              });
              var footerHelpCenter = (_data$items2 = data.items) == null ? undefined : _data$items2.map(function (x) {
                return x == null ? undefined : x.footerHelpCenter;
              });
              var itemsHelpCenter = (_data$items3 = data.items) == null ? undefined : _data$items3.map(function (x) {
                var _x$itemsHelpCenterCol2;
                return x == null ? undefined : (_x$itemsHelpCenterCol2 = x.itemsHelpCenterCollection) == null ? undefined : _x$itemsHelpCenterCol2.items;
              });
              if (!titleHelpCenter || !footerHelpCenter || !itemsHelpCenter) return;
              set(function () {
                return {
                  titleHelpCenter: titleHelpCenter[0],
                  footerHelpCenter: footerHelpCenter[0],
                  itemsHelpCenter: itemsHelpCenter[0]
                };
              });
            } catch (error) {
              _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(error);
            } finally {
              set(function () {
                return {
                  loading: false
                };
              });
            }
          });
          function SET_DATA(_x) {
            return _SET_DATA.apply(this, arguments);
          }
          return SET_DATA;
        }()
      }
    });
  });
  var useHelpCenterStore = exports.useHelpCenterStore = (0, _$$_REQUIRE(_dependencyMap[6]).createZustandStoreWithSelectors)(helpCenterStore);
