  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HttpService = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var HttpService = exports.HttpService = /*#__PURE__*/function () {
    function HttpService(ApiInstance) {
      (0, _classCallCheck2.default)(this, HttpService);
      this.axiosInstance = ApiInstance;
    }
    return (0, _createClass2.default)(HttpService, [{
      key: "get",
      value: function () {
        var _get = (0, _asyncToGenerator2.default)(function* (url, params) {
          return this.axiosInstance.get(url, {
            params: params
          });
        });
        function get(_x, _x2) {
          return _get.apply(this, arguments);
        }
        return get;
      }()
    }, {
      key: "post",
      value: function () {
        var _post = (0, _asyncToGenerator2.default)(function* (url, data) {
          return this.axiosInstance.post(url, data);
        });
        function post(_x3, _x4) {
          return _post.apply(this, arguments);
        }
        return post;
      }()
    }, {
      key: "delete",
      value: function () {
        var _delete2 = (0, _asyncToGenerator2.default)(function* (url, params) {
          return this.axiosInstance.delete(url, {
            params: params
          });
        });
        function _delete(_x5, _x6) {
          return _delete2.apply(this, arguments);
        }
        return _delete;
      }()
    }]);
  }();
