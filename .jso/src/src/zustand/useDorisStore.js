  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var useDorisStore = (0, _$$_REQUIRE(_dependencyMap[2]).create)(function (set) {
    return {
      dorisUrl: '',
      showAnimationBagDoris: false,
      setDorisUrl: function setDorisUrl(ean, orderFormId) {
        set(function () {
          return {
            dorisUrl: `${_reactNativeConfig.default.DORIS_URL}?ean=${ean}&dwview=1&dwoa=1&dwskus=${ean}&dwappuser=${orderFormId}`
          };
        });
      },
      setShowAnimationBagDoris: function setShowAnimationBagDoris(show) {
        set(function () {
          return {
            showAnimationBagDoris: show
          };
        });
      }
    };
  });
  var _default = exports.default = (0, _$$_REQUIRE(_dependencyMap[3]).createZustandStoreWithSelectors)(useDorisStore);
