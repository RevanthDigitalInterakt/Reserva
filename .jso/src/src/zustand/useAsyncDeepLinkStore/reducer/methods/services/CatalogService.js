  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.catalogService = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _DeepLinkPathModule = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var ISCATEGORY = ['/reserva', '/unbrand', '/mini', '/reversa/'];
  var REGEX = {
    pathnName: new RegExp(/\|/g),
    searchRegExp: new RegExp(/\//g)
  };
  var CustomBlocks = {
    customQuery: 'search-result-layout.customQuery'
  };
  var defaultReturn = {
    routeName: 'HomeTabs'
  };
  var createRouteFallbackPlatform = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (newPathName) {
      if (_reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[4]).platformType.IOS) {
        yield _reactNative.Linking.openURL(`https://www.usereserva.com${newPathName}`);
        return {
          routeName: 'HomeTabs',
          params: {}
        };
      }
      yield _DeepLinkPathModule.default.openUrlInBrowser({
        url: `https://www.usereserva.com${newPathName}`,
        closeCurrentAppInstance: true
      });
      return {
        routeName: 'HomeTabs',
        params: {}
      };
    });
    return function createRouteFallbackPlatform(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var getContentFullUrl = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)(function* (deepLinkRoute) {
      try {
        var _yield$getApolloClien = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().query({
            query: _$$_REQUIRE(_dependencyMap[6]).DeeplinkPathDocument,
            variables: {
              path: encodeURI(deepLinkRoute)
            },
            context: {
              clientName: 'gateway'
            }
          }),
          deeplinkPath = _yield$getApolloClien.data.deeplinkPath;
        if (!deeplinkPath) return undefined;
        return deeplinkPath;
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[7]).ExceptionProvider.captureException(error);
      }
      return undefined;
    });
    return function getContentFullUrl(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var catalogService = exports.catalogService = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)(function* (pathName, fullUrl) {
      var newPathName = pathName.replace(REGEX.pathnName, '/');
      var contentFullUrl = yield getContentFullUrl(fullUrl);
      if (contentFullUrl) {
        if (!contentFullUrl.active) return createRouteFallbackPlatform(newPathName);
        return {
          routeName: 'ProductCatalog',
          params: {
            referenceId: contentFullUrl.referenceId.startsWith('collection:') ? contentFullUrl.referenceId : `collection:${contentFullUrl.referenceId}`,
            safeArea: true,
            search: false,
            orderBy: '',
            facetInput: [{
              key: '',
              value: ''
            }]
          }
        };
      }
      try {
        var _extensionsInArray$;
        if (ISCATEGORY.some(function (item) {
          return newPathName.includes(item);
        })) {
          return {
            routeName: 'ProductCatalog',
            params: {
              referenceId: `category:${pathName}`,
              safeArea: true,
              search: false,
              orderBy: '',
              facetInput: [{
                key: '',
                value: ''
              }]
            }
          };
        }
        var category = yield _$$_REQUIRE(_dependencyMap[8]).deeplinkService.getCategory(newPathName);
        if (!category) return yield createRouteFallbackPlatform(newPathName);
        var treePath = `${category.route.pageContext.id}/flex-layout.row#colecoes-custom/flex-layout.col#colecoes-custom/search-result-layout.customQuery#colecoes-custom`;
        var isFeminine = pathName.includes('feminino');
        var extensionsInArray = Object.keys(category.extensions).map(function (key) {
          return category.extensions[key];
        });
        var extensionsBlock = extensionsInArray.find(function (extension) {
          return extension == null ? undefined : extension.blocks.find(function (block) {
            return block == null ? undefined : block.blockId.includes(CustomBlocks.customQuery);
          });
        });
        var customQueryBlock = extensionsBlock == null ? undefined : extensionsBlock.blocks.find(function (block) {
          return block.blockId.includes(CustomBlocks.customQuery);
        });
        if (!customQueryBlock) return defaultReturn;
        if (!isFeminine) {
          treePath = `${category.route.pageContext.id}/${customQueryBlock.extensionPointId}`;
        }
        var _yield$getApolloClien2 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().query({
            query: _$$_REQUIRE(_dependencyMap[9]).listContentQuery,
            variables: {
              blockId: customQueryBlock.blockId,
              id: category.route.pageContext.id,
              template: (_extensionsInArray$ = extensionsInArray[0]) == null ? undefined : _extensionsInArray$.blockId,
              treePath: treePath
            }
          }),
          dataListContent = _yield$getApolloClien2.data;
        if (!dataListContent.listContent.length) return defaultReturn;
        var listContent = dataListContent.listContent[0];
        if (!(listContent != null && listContent.contentJSON)) {
          return yield createRouteFallbackPlatform(newPathName);
        }
        var _JSON$parse = JSON.parse(listContent.contentJSON),
          _JSON$parse$querySche = _JSON$parse.querySchema,
          mapField = _JSON$parse$querySche.mapField,
          queryField = _JSON$parse$querySche.queryField;
        return {
          routeName: 'ProductCatalog',
          params: {
            referenceId: `queryField=${queryField.replace(REGEX.searchRegExp, ',')}&mapField=${(0, _$$_REQUIRE(_dependencyMap[10]).formatProductClusterIds)(mapField)}`,
            safeArea: true,
            search: false,
            orderBy: '',
            facetInput: [{
              key: '',
              value: ''
            }]
          }
        };
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[7]).ExceptionProvider.captureException(err);
        return createRouteFallbackPlatform(newPathName);
      }
    });
    return function catalogService(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();
