  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useOncePerDayEvent = exports.has24HoursPassed = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[3]);
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var has24HoursPassed = exports.has24HoursPassed = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (key) {
      try {
        var lastEventDate = yield _asyncStorage.default.getItem(key);
        if (!lastEventDate) {
          return true;
        }
        var lastEventTimestamp = new Date(lastEventDate).getTime();
        var currentTimestamp = new Date().getTime();
        var twentyFourHoursInMs = 86400000;
        return currentTimestamp - lastEventTimestamp >= twentyFourHoursInMs;
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(error);
        return false;
      }
    });
    return function has24HoursPassed(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var useOncePerDayEvent = exports.useOncePerDayEvent = function useOncePerDayEvent(eventKey) {
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      canTriggerEvent = _useState2[0],
      setCanTriggerEvent = _useState2[1];
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[6]).useBagStore)(['clientProfileData', 'appTotalizers', 'packageItems']),
      clientProfileData = _useBagStore.clientProfileData,
      packageItems = _useBagStore.packageItems,
      appTotalizers = _useBagStore.appTotalizers;
    (0, _react.useEffect)(function () {
      var checkEventStatus = /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)(function* () {
          var canTrigger = yield has24HoursPassed(eventKey);
          setCanTriggerEvent(canTrigger);
        });
        return function checkEventStatus() {
          return _ref2.apply(this, arguments);
        };
      }();
      checkEventStatus();
    }, [eventKey]);
    var triggerEvent = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* () {
        if (canTriggerEvent) {
          try {
            yield (0, _$$_REQUIRE(_dependencyMap[7]).trackEventDitoStatusCart)({
              items: (0, _$$_REQUIRE(_dependencyMap[8]).mergeItemsPackage)(packageItems),
              appTotalizers: appTotalizers,
              clientProfileData: clientProfileData
            });
            yield _asyncStorage.default.setItem(eventKey, new Date().toISOString());
          } catch (error) {
            _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(error);
          }
        }
      });
      return function triggerEvent() {
        return _ref3.apply(this, arguments);
      };
    }();
    return {
      canTriggerEvent: canTriggerEvent,
      setCanTriggerEvent: setCanTriggerEvent,
      triggerEvent: triggerEvent
    };
  };
