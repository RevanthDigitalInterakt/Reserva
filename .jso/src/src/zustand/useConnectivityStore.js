  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useConnectivityStore = undefined;
  var _netinfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var connectivityStore = (0, _$$_REQUIRE(_dependencyMap[2]).create)(function (set) {
    return {
      isConnected: false,
      onListenEvents: function onListenEvents() {
        _netinfo.default.addEventListener(function (state) {
          set({
            isConnected: !!(state != null && state.isConnected)
          });
        });
      }
    };
  });
  var useConnectivityStore = exports.useConnectivityStore = (0, _$$_REQUIRE(_dependencyMap[3]).createZustandStoreWithSelectors)(connectivityStore);
