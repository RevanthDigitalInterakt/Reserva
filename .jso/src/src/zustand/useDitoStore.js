  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var useDitoStore = (0, _$$_REQUIRE(_dependencyMap[2]).create)()((0, _$$_REQUIRE(_dependencyMap[3]).persist)(function (set) {
    return {
      isLogged: false,
      hasHydrated: false,
      setIsLogged: function setIsLogged(value) {
        return set(function () {
          return {
            isLogged: value
          };
        });
      },
      setHasHydrated: function setHasHydrated(state) {
        set({
          hasHydrated: state
        });
      }
    };
  }, {
    name: 'dito-storage',
    storage: (0, _$$_REQUIRE(_dependencyMap[3]).createJSONStorage)(function () {
      return _asyncStorage.default;
    }),
    onRehydrateStorage: function onRehydrateStorage() {
      return function (state) {
        state == null ? undefined : state.setHasHydrated(true);
      };
    }
  }));
  var _default = exports.default = useDitoStore;
