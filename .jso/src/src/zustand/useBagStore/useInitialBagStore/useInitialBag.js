  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[2]);
  var useInitialBag = function useInitialBag() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[3]).useBagStore)(['actions', 'topBarLoading', 'orderFormId']),
      actions = _useBagStore.actions,
      topBarLoading = _useBagStore.topBarLoading,
      orderFormId = _useBagStore.orderFormId;
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[4]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;
    var handleInitializeBag = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      if (!orderFormId) {
        _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(new Error('Bag invalid OrderForm'));
        return;
      }
      yield (0, _$$_REQUIRE(_dependencyMap[6]).setAsyncStorageItem)('orderFormId', orderFormId);
      actions.INITIAL_LOAD();
    }), [orderFormId, actions]);
    (0, _react.useEffect)(function () {
      handleInitializeBag();
    }, [handleInitializeBag]);
    (0, _react.useEffect)(function () {
      if (!topBarLoading && startLoadingTime > 0) {
        onFinishLoad();
      }
    }, [topBarLoading, onFinishLoad, startLoadingTime]);
  };
  var _default = exports.default = useInitialBag;
