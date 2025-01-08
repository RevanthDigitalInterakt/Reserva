  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useInitialShippingBar = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[3]);
  var useInitialShippingBar = exports.useInitialShippingBar = function useInitialShippingBar(sumPriceShipping, loading) {
    var _useShippingBarStore = (0, _$$_REQUIRE(_dependencyMap[4]).useShippingBarStore)(),
      setSumPrice = _useShippingBarStore.setSumPrice,
      setLoadingBar = _useShippingBarStore.setLoadingBar,
      isFreeShipping = _useShippingBarStore.isFreeShipping,
      freeShippingValue = _useShippingBarStore.freeShippingValue,
      setIsFreeShipping = _useShippingBarStore.setIsFreeShipping,
      setValueProgressBar = _useShippingBarStore.setValueProgressBar,
      setFreeShippingValue = _useShippingBarStore.setFreeShippingValue;
    var _useConfigShippingBar = (0, _$$_REQUIRE(_dependencyMap[5]).useConfigShippingBarLazyQuery)({
        context: {
          clientName: 'gateway'
        }
      }),
      _useConfigShippingBar2 = (0, _slicedToArray2.default)(_useConfigShippingBar, 1),
      getConfigShippingBar = _useConfigShippingBar2[0];
    var initializeShippingBar = (0, _react.useCallback)(function () {
      setLoadingBar(true);
      if (!isFreeShipping) {
        setValueProgressBar(sumPriceShipping);
        setSumPrice(sumPriceShipping - freeShippingValue);
        return;
      }
      setValueProgressBar(freeShippingValue);
      setSumPrice(freeShippingValue);
      if (!(sumPriceShipping >= freeShippingValue)) {
        setSumPrice(sumPriceShipping - freeShippingValue);
        setValueProgressBar(sumPriceShipping);
      }
    }, [isFreeShipping, sumPriceShipping, freeShippingValue, setValueProgressBar, setSumPrice, setLoadingBar]);
    var handleInitializeShippingBar = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var _data$config, _data$config$shipping, _data$config2, _data$config2$shippin;
      var _yield$getConfigShipp = yield getConfigShippingBar(),
        data = _yield$getConfigShipp.data;
      var freeShippingValueData = data == null ? undefined : (_data$config = data.config) == null ? undefined : (_data$config$shipping = _data$config.shippingBar) == null ? undefined : _data$config$shipping.freeShippingValue;
      var isFreeShippingData = data == null ? undefined : (_data$config2 = data.config) == null ? undefined : (_data$config2$shippin = _data$config2.shippingBar) == null ? undefined : _data$config2$shippin.isFreeShipping;
      if (typeof isFreeShippingData === 'boolean' && freeShippingValueData) {
        setFreeShippingValue(freeShippingValueData);
        setIsFreeShipping(isFreeShippingData);
      }
    }), [setFreeShippingValue, setIsFreeShipping, getConfigShippingBar]);
    (0, _react.useEffect)(function () {
      if (freeShippingValue >= 0) {
        initializeShippingBar();
      }
    }, [freeShippingValue, sumPriceShipping, loading, isFreeShipping, initializeShippingBar]);
    (0, _react.useEffect)(function () {
      handleInitializeShippingBar();
    }, [handleInitializeShippingBar]);
  };
