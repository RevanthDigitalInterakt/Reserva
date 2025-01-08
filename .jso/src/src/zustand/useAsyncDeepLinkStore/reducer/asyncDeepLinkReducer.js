  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reducerMethods = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var reducer = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)(function* (state, _ref) {
      var actionType = _ref.actionType,
        payload = _ref.payload;
      switch (actionType) {
        case 'CATALOG':
          {
            var navigateToRoute = yield _reducerMethods.default.CATALOG(Object.assign({}, payload));
            return Object.assign({}, state, {
              fallBackRoute: navigateToRoute
            });
          }
        case 'PRODUCT':
          {
            var _navigateToRoute = yield _reducerMethods.default.PRODUCT(Object.assign({}, payload));
            return Object.assign({}, state, {
              fallBackRoute: _navigateToRoute
            });
          }
        default:
          return Object.assign({}, state, {
            fallBackRoute: {
              routeName: 'HomeTabs'
            },
            deepLinkLoading: true
          });
      }
    });
    return function reducer(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var _default = exports.default = reducer;
