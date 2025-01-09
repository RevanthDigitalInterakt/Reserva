  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FirebaseService = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _storage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeUuid = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var pathStorageInFirebase = 'user/profile/image/';
  var FirebaseService = exports.FirebaseService = /*#__PURE__*/function () {
    function FirebaseService() {
      (0, _classCallCheck2.default)(this, FirebaseService);
    }
    return (0, _createClass2.default)(FirebaseService, [{
      key: "createFS",
      value: (
      /**
       * Save image profile
       * @param {any} file
       * @returns {any}
       */
      function () {
        var _createFS = (0, _asyncToGenerator2.default)(function* (file) {
          var _file$uri;
          var fileExtension = file == null ? undefined : (_file$uri = file.uri) == null ? undefined : _file$uri.split('.').pop();
          var fileName = `${_reactNativeUuid.default.v4()}.${fileExtension}`;
          var reference = (0, _storage.default)().ref(`${pathStorageInFirebase}${fileName}`);
          var pathToFileOnDevice = `${file.uri}`;
          var uploading = reference.putFile(pathToFileOnDevice);
          uploading.on('state_changed', function (taskSnapshot) {});
          yield uploading.then(function () {});
          return reference.fullPath;
        });
        function createFS(_x) {
          return _createFS.apply(this, arguments);
        }
        return createFS;
      }()
      /**
       * Delete image profile
       * @param {string} imageRef
       * @returns {any}
       */
      )
    }, {
      key: "deleteFS",
      value: (function () {
        var _deleteFS = (0, _asyncToGenerator2.default)(function* (imageRef) {
          var reference = (0, _storage.default)().ref(`${imageRef}`);
          yield reference.delete();
        });
        function deleteFS(_x2) {
          return _deleteFS.apply(this, arguments);
        }
        return deleteFS;
      }()
      /**
       * Get URL image profile
       * @param {string} imageRef
       * @returns {string}
       */
      )
    }, {
      key: "getUrlFS",
      value: (function () {
        var _getUrlFS = (0, _asyncToGenerator2.default)(function* (imageRef) {
          var url = yield (0, _storage.default)().ref(`${imageRef}`).getDownloadURL();
          return url;
        });
        function getUrlFS(_x3) {
          return _getUrlFS.apply(this, arguments);
        }
        return getUrlFS;
      }())
    }]);
  }();
