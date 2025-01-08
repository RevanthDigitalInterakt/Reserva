  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useAsyncStorageProvider;
  exports.getAsyncStorageItem = getAsyncStorageItem;
  exports.removeAsyncStorageItem = removeAsyncStorageItem;
  exports.setAsyncStorageItem = setAsyncStorageItem;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function getAsyncStorageItem(_x) {
    return _getAsyncStorageItem.apply(this, arguments);
  }
  function _getAsyncStorageItem() {
    _getAsyncStorageItem = (0, _asyncToGenerator2.default)(function* (key) {
      try {
        var res = yield _asyncStorage.default.getItem(key);
        return res ? JSON.parse(res) : null;
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(err, {
          key: key
        });
        return null;
      }
    });
    return _getAsyncStorageItem.apply(this, arguments);
  }
  function setAsyncStorageItem(_x2, _x3) {
    return _setAsyncStorageItem.apply(this, arguments);
  }
  function _setAsyncStorageItem() {
    _setAsyncStorageItem = (0, _asyncToGenerator2.default)(function* (key, val) {
      try {
        yield _asyncStorage.default.setItem(key, JSON.stringify(val));
        return true;
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(err, {
          key: key,
          value: val
        });
        return false;
      }
    });
    return _setAsyncStorageItem.apply(this, arguments);
  }
  function removeAsyncStorageItem(_x4) {
    return _removeAsyncStorageItem.apply(this, arguments);
  }
  function _removeAsyncStorageItem() {
    _removeAsyncStorageItem = (0, _asyncToGenerator2.default)(function* (key) {
      try {
        yield _asyncStorage.default.removeItem(key);
        return true;
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(err, {
          key: key
        });
        return false;
      }
    });
    return _removeAsyncStorageItem.apply(this, arguments);
  }
  function useAsyncStorageProvider() {
    return {
      getItem: getAsyncStorageItem,
      setItem: setAsyncStorageItem,
      removeItem: removeAsyncStorageItem
    };
  }
