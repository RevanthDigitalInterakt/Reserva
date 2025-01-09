  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.usePrimeStore = exports.primeStore = undefined;
  var primeStore = exports.primeStore = (0, _$$_REQUIRE(_dependencyMap[0]).create)(function (_set, _getState) {
    return {
      animationBag: false,
      isVisibleModalWelcome: false,
      hasPrimeSubscriptionInCart: false,
      isVisibleModalPrimeRemoved: false,
      changeStateIsVisibleModalPrimeRemoved: function changeStateIsVisibleModalPrimeRemoved(state) {
        _set({
          isVisibleModalPrimeRemoved: state
        });
      },
      changeStateAnimationBag: function changeStateAnimationBag(state) {
        _set({
          animationBag: state
        });
      },
      changeStateIsVisibleModalWelcome: function changeStateIsVisibleModalWelcome(state) {
        _set({
          isVisibleModalWelcome: state
        });
      },
      handleClickContinue: function handleClickContinue() {
        _set({
          isVisibleModalWelcome: false
        });
      }
    };
  });
  var usePrimeStore = exports.usePrimeStore = (0, _$$_REQUIRE(_dependencyMap[1]).createZustandStoreWithSelectors)(primeStore);
