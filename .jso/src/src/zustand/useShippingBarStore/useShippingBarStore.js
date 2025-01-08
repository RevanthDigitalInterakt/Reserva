  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useShippingBarStore = undefined;
  var useShippingBarStore = exports.useShippingBarStore = (0, _$$_REQUIRE(_dependencyMap[0]).create)(function (set) {
    return {
      sumPrice: 0,
      loadingBar: false,
      isFreeShipping: false,
      valueProgressBar: 0,
      freeShippingValue: 0,
      setSumPrice: function setSumPrice(value) {
        return set(function () {
          return {
            sumPrice: value
          };
        });
      },
      setLoadingBar: function setLoadingBar(value) {
        return set(function () {
          return {
            loadingBar: value
          };
        });
      },
      setIsFreeShipping: function setIsFreeShipping(value) {
        return set(function () {
          return {
            isFreeShipping: value
          };
        });
      },
      setValueProgressBar: function setValueProgressBar(value) {
        return set(function () {
          return {
            valueProgressBar: value
          };
        });
      },
      setFreeShippingValue: function setFreeShippingValue(value) {
        return set(function () {
          return {
            freeShippingValue: value
          };
        });
      }
    };
  });
