  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncDeepLinkReducer = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var useAsyncDeepLinkStore = (0, _$$_REQUIRE(_dependencyMap[3]).create)(function (set, getState) {
    return {
      deepLinkLoading: true,
      fallBackRoute: null,
      dispatch: function () {
        var _dispatch = (0, _asyncToGenerator2.default)(function* (payload) {
          set(Object.assign({}, yield (0, _asyncDeepLinkReducer.default)(getState(), payload)));
        });
        function dispatch(_x) {
          return _dispatch.apply(this, arguments);
        }
        return dispatch;
      }()
    };
  });
  var _default = exports.default = useAsyncDeepLinkStore;
