  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.StorageServiceKeys = exports.StorageService = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeUuid = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  /**
   * Opções para salva e recuperar dados do storage
   *
   * @typeParam key - Chave do dado
   * @typeParam value - Valor do dado
   * @typeParam isJSON - Dado é um JSON
   *
   */
  var StorageServiceKeys = exports.StorageServiceKeys = /*#__PURE__*/function (StorageServiceKeys) {
    StorageServiceKeys["INSTALLATION_TOKEN"] = "installationToken";
    StorageServiceKeys["PROFILE"] = "profile";
    StorageServiceKeys["COOKIE"] = "cookie";
    return StorageServiceKeys;
  }({});
  var StorageService = exports.StorageService = /*#__PURE__*/function () {
    function StorageService() {
      (0, _classCallCheck2.default)(this, StorageService);
    }
    return (0, _createClass2.default)(StorageService, null, [{
      key: "getInstallationToken",
      value: (
      /**
       * Retorna o token de instalação único do usuário no app
       *
       * @method getInstallationToken
       * @memberof StorageService
       * @throws {Error} Caso não seja possível obter o token de instalação
       * @returns Token de instalação único do usuário no app
       * @static
       * @async
       * @example
       * ```
       * const installationToken = await StorageService.getInstallationToken();
       * ```
       *
       */
      function () {
        var _getInstallationToken = (0, _asyncToGenerator2.default)(function* () {
          return new Promise(function (resolve, reject) {
            _asyncStorage.default.getItem(StorageServiceKeys.INSTALLATION_TOKEN).then(function (value) {
              if (value) {
                resolve(value);
              } else {
                reject(new Error('No installation token'));
              }
            }).catch(function (error) {
              reject(error);
            });
          });
        });
        function getInstallationToken() {
          return _getInstallationToken.apply(this, arguments);
        }
        return getInstallationToken;
      }()
      /**
       * Salva o token de instalação único do usuário no app
       *
       * @method setInstallationToken
       * @memberof StorageService
       * @throws {Error} Caso não seja possível salvar o token de instalação
       * @returns Se o token de instalação foi salvo com sucesso
       * @static
       * @async
       * @example
       * ```
       * const isSaved = await StorageService.setInstallationToken();
       * ```
       *
       */
      )
    }, {
      key: "setInstallationToken",
      value: (function () {
        var _setInstallationToken = (0, _asyncToGenerator2.default)(function* () {
          return new Promise(function (resolve, reject) {
            var installationToken = _reactNativeUuid.default.v4();
            _asyncStorage.default.setItem(StorageServiceKeys.INSTALLATION_TOKEN, installationToken).then(function () {
              resolve(true);
            }).catch(function (error) {
              reject(error);
            });
          });
        });
        function setInstallationToken() {
          return _setInstallationToken.apply(this, arguments);
        }
        return setInstallationToken;
      }()
      /**
       * Busca um item do storage
       *
       * Caso `isJSON` seja `true`, o `value` será convertido para `JSON` antes de ser retornado
       *
       * @method getItem
       * @memberof StorageService
       * @param {GetSetOptions} options Opções para buscar o item
       * @throws {Error} Caso não seja possível obter o item
       * @returns Item do storage
       * @typeReturn T Tipo do item a ser buscado
       * @static
       * @async
       * @example
       * ```
       * const profile = await StorageService
       * .getItem<Profile>({ key: StorageServiceKeys.PROFILE, isJSON: true });
       * ```
       *
       */
      )
    }, {
      key: "getItem",
      value: (function () {
        var _getItem = (0, _asyncToGenerator2.default)(function* (_ref) {
          var key = _ref.key,
            isJSON = _ref.isJSON;
          return new Promise(function (resolve, reject) {
            _asyncStorage.default.getItem(key).then(function (value) {
              if (value) {
                resolve(isJSON ? JSON.parse(value) : value);
              } else {
                reject(new Error(`No data found for key: ${key}`));
              }
            }).catch(function (error) {
              reject(error);
            });
          });
        });
        function getItem(_x) {
          return _getItem.apply(this, arguments);
        }
        return getItem;
      }()
      /**
       * Salva um item no storage
       *
       * Caso o item já exista, ele será sobrescrito
       *
       * Caso `isJSON` seja `true`, o `value` deve ser um objeto e
       * será convertido para `string` antes de ser salvo
       *
       * @method setItem
       * @memberof StorageService
       * @param {GetSetOptions} options Opções para salvar o item
       * @throws {Error} Caso não seja possível salvar o item
       * @returns Se o item foi salvo com sucesso
       * @static
       * @async
       * @example
       * ```
       * const isSaved = await StorageService
       * .setItem({ key: StorageServiceKeys.PROFILE, value: profile, isJSON: true });
       * ```
       *
       */
      )
    }, {
      key: "setItem",
      value: (function () {
        var _setItem = (0, _asyncToGenerator2.default)(function* (_ref2) {
          var key = _ref2.key,
            value = _ref2.value,
            isJSON = _ref2.isJSON;
          return new Promise(function (resolve, reject) {
            if (value) {
              _asyncStorage.default.setItem(key, isJSON ? JSON.stringify(value) : value).then(function () {
                resolve(true);
              }).catch(function (error) {
                reject(error);
              });
            } else {
              reject(new Error('Value is required'));
            }
          });
        });
        function setItem(_x2) {
          return _setItem.apply(this, arguments);
        }
        return setItem;
      }()
      /**
       * Busca vários itens do storage de uma vez
       *
       * Caso `isJSON` seja `true`, o `value` será convertido para `JSON` antes de ser retornado
       *
       * @method multiGet
       * @memberof StorageService
       * @param {GetSetOptions} options Array de opções para buscar os itens
       * @throws {Error} Caso não seja possível obter os itens
       * @returns Array de itens do storage
       * @typeReturn T[] Tipo dos itens a serem buscados
       * @static
       * @async
       * @example
       * ```
       * const profiles = await StorageService.multiGet<Profile>([
       *  { key: StorageServiceKeys.PROFILE, isJSON: true },
       *  { key: StorageServiceKeys.INSTALLATION_TOKEN },
       * ]);
       * ```
       *
       */
      )
    }, {
      key: "multiGet",
      value: (function () {
        var _multiGet = (0, _asyncToGenerator2.default)(function* (options) {
          var promises = options.map(function (option) {
            return _asyncStorage.default.getItem(option.key);
          });
          var processResult = function processResult(result) {
            var resultObj = {};
            result.map(function (value, i) {
              if (options[i].isJSON) {
                resultObj[options[i].key] = JSON.parse(value);
              } else {
                resultObj[options[i].key] = value;
              }
              return true;
            });
            return resultObj;
          };
          return Promise.all(promises).then(function (result) {
            var value = processResult(result);
            return Promise.resolve(value);
          }, function (errors) {
            return Promise.reject(errors);
          });
        });
        function multiGet(_x3) {
          return _multiGet.apply(this, arguments);
        }
        return multiGet;
      }())
    }]);
  }();
