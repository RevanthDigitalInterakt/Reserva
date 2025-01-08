  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.buildQueryParams = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var buildQueryParams = exports.buildQueryParams = function buildQueryParams(params) {
    var searchParams = new URLSearchParams();
    var _appendParam = function appendParam(key, value) {
      if (Array.isArray(value)) {
        value.forEach(function (item) {
          searchParams.append((0, _$$_REQUIRE(_dependencyMap[2]).sanitizeString)(key), (0, _$$_REQUIRE(_dependencyMap[2]).sanitizeString)(item));
        });
      } else if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            subKey = _ref2[0],
            subValue = _ref2[1];
          _appendParam(`${key}-${(0, _$$_REQUIRE(_dependencyMap[2]).sanitizeString)(subKey)}`, subValue);
        });
      } else {
        searchParams.append((0, _$$_REQUIRE(_dependencyMap[2]).sanitizeString)(key), (0, _$$_REQUIRE(_dependencyMap[2]).sanitizeString)(value));
      }
    };
    Object.entries(params).forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];
      _appendParam(key, value);
    });
    return searchParams.toString();
  };
