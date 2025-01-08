  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.webCatalogUrl = exports.urlRon = exports.urlLandingPagePrime = exports.registerMethods = exports.productUrlWithSlug = exports.productUrlWithSkuId = exports.productUrlWithProductId = exports.productUrlWithIdSku = exports.metaProductUrl = exports.defaultInitialUrl = exports.baseTabUrl = exports.REGEX_VALID_URL = exports.REGEX_PRODUCT_URL = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var linkingUtils = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _useRemoteConfig$getS = _$$_REQUIRE(_dependencyMap[5]).useRemoteConfig.getState(),
    getBoolean = _useRemoteConfig$getS.getBoolean;
  var REGEX_PRODUCT_URL = exports.REGEX_PRODUCT_URL = {
    IS_PRODUCT_URL: /\/p\b/gm,
    REMOVE_INVALID_WORDS: /\/p\b/gi,
    IS_META_PRODUCT_URL: /product\?slug/gm
  };
  var REGEX_VALID_URL = exports.REGEX_VALID_URL = /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/gi;
  var baseTabUrl = exports.baseTabUrl = 'usereserva://home-tabs';
  var defaultInitialUrl = exports.defaultInitialUrl = 'usereserva://home-tabs';
  var webCatalogUrl = exports.webCatalogUrl = 'https://www.usereserva.com/catalog/';
  var productUrlWithSlug = exports.productUrlWithSlug = 'usereserva://product?slug=';
  var productUrlWithSkuId = exports.productUrlWithSkuId = 'usereserva://product?skuId=';
  var productUrlWithIdSku = exports.productUrlWithIdSku = 'usereserva://product?idsku=';
  var productUrlWithProductId = exports.productUrlWithProductId = 'usereserva://product?productId=';
  var metaProductUrl = exports.metaProductUrl = 'usereserva://product?slug=';
  var defaultCustomMethodReturn = {
    match: false,
    strUrl: defaultInitialUrl
  };
  var urlRon = exports.urlRon = function urlRon(initialUrl) {
    var isRonDomain = initialUrl.startsWith('https://now.usereserva.io/');
    if (isRonDomain) {
      return {
        match: true,
        strUrl: `usereserva://ron/${initialUrl.split('.io/')[1]}`
      };
    }
    return defaultCustomMethodReturn;
  };
  var urlLandingPagePrime = exports.urlLandingPagePrime = function urlLandingPagePrime(initialUrl) {
    if (initialUrl.includes('/prime')) {
      try {
        return {
          match: true,
          strUrl: 'usereserva://prime'
        };
      } catch (err) {
        return defaultCustomMethodReturn;
      }
    }
    return defaultCustomMethodReturn;
  };
  var newsLetterUseCase = function newsLetterUseCase(initialUrl) {
    if (initialUrl.includes('/newsletter')) {
      try {
        var queryString = initialUrl.split('?')[1];
        if (queryString) {
          (0, _$$_REQUIRE(_dependencyMap[6]).setAsyncStorageItem)('@Newsletter:IdCampaign', queryString);
        }
        return {
          match: true,
          strUrl: 'usereserva://newsletter'
        };
      } catch (err) {
        return defaultCustomMethodReturn;
      }
    }
    return defaultCustomMethodReturn;
  };
  var urlSiteCase = function urlSiteCase(initialUrl) {
    var isUrlSiteCase = initialUrl === 'https://www.usereserva.com' || initialUrl === 'http://www.usereserva.com' || initialUrl === 'www.usereserva.com' || initialUrl === 'http://usereserva.com' || initialUrl === 'https://usereserva.io' || initialUrl === 'http://usereserva.io' || initialUrl === 'https://now.usereserva.io' || initialUrl === 'http://now.usereserva.io';
    if (isUrlSiteCase) {
      return {
        match: true,
        strUrl: defaultInitialUrl
      };
    }
    return defaultCustomMethodReturn;
  };
  var urlGoogleGclidCase = function urlGoogleGclidCase(initialUrl) {
    var isHomeSiteWithGclidGoogle = initialUrl.split('/?gclid')[0] === 'https://www.usereserva.com';
    if (isHomeSiteWithGclidGoogle) {
      return {
        match: true,
        strUrl: defaultInitialUrl
      };
    }
    return defaultCustomMethodReturn;
  };
  var urlMetaProductCase = function urlMetaProductCase(initialUrl) {
    var regex = new RegExp(REGEX_PRODUCT_URL.IS_META_PRODUCT_URL);
    if (regex.test(initialUrl.toLowerCase())) {
      return {
        match: true,
        strUrl: `${initialUrl}`
      };
    }
    return defaultCustomMethodReturn;
  };
  var urlProductCase = function urlProductCase(initialUrl) {
    var regex = new RegExp(REGEX_PRODUCT_URL.IS_PRODUCT_URL);
    if (regex.test(initialUrl.toLowerCase())) {
      var url = new (_$$_REQUIRE(_dependencyMap[7]).URL)(initialUrl);
      var productId = url.searchParams.get('productId');
      if (productId) {
        return {
          match: true,
          strUrl: `${productUrlWithProductId}${productId}`
        };
      }
      var skuId = url.searchParams.get('skuId') || url.searchParams.get('skuid');
      if (skuId) {
        return {
          match: true,
          strUrl: `${productUrlWithSkuId}${skuId}`
        };
      }
      var idSku = url.searchParams.get('idsku');
      if (idSku) {
        return {
          match: true,
          strUrl: `${productUrlWithIdSku}${idSku}`
        };
      }
      var slug = url.pathname.replace(REGEX_PRODUCT_URL.REMOVE_INVALID_WORDS, '').replace(/^\//, '');
      if (slug) {
        return {
          match: true,
          strUrl: `${productUrlWithSlug}${slug}`
        };
      }
    }
    return defaultCustomMethodReturn;
  };
  var colectionUseCase = function colectionUseCase(initialUrl) {
    if (initialUrl.endsWith('colecao-reserva/ofertas')) {
      return {
        match: true,
        strUrl: `${baseTabUrl}/ofertas`
      };
    }
    return defaultCustomMethodReturn;
  };
  var newOffersPageUseCase = function newOffersPageUseCase(initialUrl) {
    if (initialUrl.endsWith('/colecao-ofertas')) {
      return {
        match: true,
        strUrl: `${baseTabUrl}/colecao-ofertas`
      };
    }
    return defaultCustomMethodReturn;
  };

  // const clusterCollectionUseCase = async (initialUrl: string):
  //  Promise<ICustomMethodReturnParams> => {
  //   const splitPath = initialUrl.split('//')[1];
  //   const res = await fetch(`https://www.usereserva.com/${splitPath}`);
  //   const clusterId = (await res?.text())?.split('productClusterIds')[0]
  //     ?.split('queryField')[1]
  //     ?.replace(/\\\"/g, '')
  //     .replace(':', '')
  //     .split(',')[0];

  // const $ = cheerio.load(html);

  // Procurar pelo productClusterId no HTML
  // Procurar pelo productClusterId no HTML
  // let clusterId;
  // $('script').each((i, script) => {
  //   const content = $(script).html();
  //   if (content.includes('productClusterIds')) {
  //     // Tentar analisar como JSON
  //     const jsonMatch = content.match(/\{.*"productClusterIds":\["(\d+)"\].*\}/);
  //     if (jsonMatch) {
  //       const jsonData = JSON.parse(jsonMatch[0]);
  //       clusterId = jsonData.productClusterIds[0];
  //       return false; // Interromper o loop quando encontrar
  //     }
  //   }
  // });
  // const clusterId = (await res?.text())?.split('productClusterIds')[0]
  //   ?.split('queryField')[1]
  //   ?.replace(/\\\"/g, '')
  //   .replace(':', '')
  //   .split(',')[0];

  // if (initialUrl.includes('/colecao-')) {
  //   return {
  //     match: true,
  //     strUrl: `usereserva://catalog/collection:${clusterId}`,
  //   };
  // }

  //   return defaultCustomMethodReturn;
  // };

  var accountWishListUseCase = function accountWishListUseCase(initialUrl) {
    if (initialUrl.includes('account#/wishlist')) {
      return {
        match: true,
        strUrl: `${baseTabUrl}/wishlist`
      };
    }
    return defaultCustomMethodReturn;
  };
  var accountUseCase = function accountUseCase(initialUrl) {
    if (initialUrl.includes('account#')) {
      return {
        match: true,
        strUrl: `${baseTabUrl}/profile`
      };
    }
    return defaultCustomMethodReturn;
  };
  var catalogCollectionUseCase = function catalogCollectionUseCase(initialUrl) {
    if (initialUrl.includes('catalog/collection')) {
      return {
        match: true,
        strUrl: initialUrl
      };
    }
    return defaultCustomMethodReturn;
  };
  var cartUseCase = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (initialUrl) {
      if (initialUrl.includes('#/cart')) {
        if (initialUrl.includes('?orderFormId')) {
          var splitOrderFormId = initialUrl.split('?orderFormId=')[1];
          if (splitOrderFormId) {
            var splitCart = splitOrderFormId.split('#/cart')[0] || '';
            yield (0, _$$_REQUIRE(_dependencyMap[6]).setAsyncStorageItem)('orderFormId', splitCart);
            return {
              match: true,
              strUrl: `usereserva://bag/${splitCart}`
            };
          }
        }
      }
      return defaultCustomMethodReturn;
    });
    return function cartUseCase(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var restoreCartUseCase = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)(function* (initialUrl) {
      if (initialUrl.includes('#/cart') && initialUrl.includes('checkout')) {
        var orderFormId = yield (0, _$$_REQUIRE(_dependencyMap[6]).getAsyncStorageItem)('orderFormId');
        if (orderFormId) {
          var _yield$getApolloClien = yield (0, _$$_REQUIRE(_dependencyMap[8]).getApolloClient)().query({
              query: _$$_REQUIRE(_dependencyMap[9]).OrderFormDocument,
              fetchPolicy: 'no-cache',
              variables: {
                orderFormId: orderFormId
              },
              context: {
                clientName: 'gateway'
              }
            }),
            data = _yield$getApolloClien.data;
          var packageItems = data.orderForm.packageItems;
          var mergedItems = (0, _$$_REQUIRE(_dependencyMap[10]).mergeItemsPackage)(packageItems);
          if (mergedItems.length) {
            return {
              match: true,
              strUrl: `usereserva://bag/${orderFormId}`
            };
          }
        }
      }
      return defaultCustomMethodReturn;
    });
    return function restoreCartUseCase(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var cartAddItemUseCase = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)(function* (initialUrl) {
      if (initialUrl.includes('/checkout/cart/add/?sku=')) {
        var url = initialUrl;
        var queryString = url.split('?')[1];
        var payload = {};
        var currentSkuId = null;
        queryString == null ? undefined : queryString.split('&').forEach(function (item) {
          var _item$split$map = item.split('=').map(decodeURIComponent),
            _item$split$map2 = (0, _slicedToArray2.default)(_item$split$map, 2),
            key = _item$split$map2[0],
            value = _item$split$map2[1];
          if (key === 'sku') {
            currentSkuId = value;
            payload[`${key}-${value}`] = {
              id: value
            };
          }
          if (key === 'qty') {
            payload[`sku-${currentSkuId}`] = Object.assign({}, payload[`sku-${currentSkuId}`], {
              quantity: Number(value)
            });
          }
          if (key === 'seller') {
            payload[`sku-${currentSkuId}`] = Object.assign({}, payload[`sku-${currentSkuId}`], {
              seller: value
            });
          }
        });
        var orderFormId = yield (0, _$$_REQUIRE(_dependencyMap[6]).getAsyncStorageItem)('orderFormId');
        var orderItems = Object.values(payload);
        if (orderFormId) {
          var input = {
            orderFormId: orderFormId,
            orderItems: orderItems
          };
          try {
            var _yield$getApolloClien2 = yield (0, _$$_REQUIRE(_dependencyMap[8]).getApolloClient)().mutate({
                mutation: _$$_REQUIRE(_dependencyMap[9]).OrderFormAddMultipleItemDocument,
                context: {
                  clientName: 'gateway'
                },
                variables: {
                  input: input
                }
              }),
              data = _yield$getApolloClien2.data;
            var _ref4 = data || {},
              orderForm = _ref4.orderFormAddMultipleItem;
            return {
              match: true,
              strUrl: `usereserva://bag/${orderForm == null ? undefined : orderForm.orderFormId}`
            };
          } catch (error) {
            _$$_REQUIRE(_dependencyMap[11]).ExceptionProvider.captureException(error);
            return defaultCustomMethodReturn;
          }
        }
      }
      return defaultCustomMethodReturn;
    });
    return function cartAddItemUseCase(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  var ditoRedirectCartUseCase = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2.default)(function* (initialUrl) {
      if (initialUrl.includes('dito.vc')) {
        var code = new (_$$_REQUIRE(_dependencyMap[7]).URL)(initialUrl).pathname.substring(1);
        if (code) {
          var _yield$getApolloClien3 = yield (0, _$$_REQUIRE(_dependencyMap[8]).getApolloClient)().query({
              query: _$$_REQUIRE(_dependencyMap[9]).DitoRedirectDocument,
              fetchPolicy: 'no-cache',
              variables: {
                code: code
              },
              context: {
                clientName: 'gateway'
              }
            }),
            dataDitoRedirect = _yield$getApolloClien3.data;
          var ditoRedirect = dataDitoRedirect.ditoRedirect;
          if ((ditoRedirect == null ? undefined : ditoRedirect.type) === _$$_REQUIRE(_dependencyMap[9]).DitoRedirectTypeEnum.RestoreCart) {
            var orderFormId = yield (0, _$$_REQUIRE(_dependencyMap[6]).getAsyncStorageItem)('orderFormId');
            if (orderFormId) {
              var _yield$getApolloClien4 = yield (0, _$$_REQUIRE(_dependencyMap[8]).getApolloClient)().query({
                  query: _$$_REQUIRE(_dependencyMap[9]).OrderFormDocument,
                  fetchPolicy: 'no-cache',
                  variables: {
                    orderFormId: orderFormId
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                dataOrderForm = _yield$getApolloClien4.data;
              var packageItems = dataOrderForm.orderForm.packageItems;
              var mergedItems = (0, _$$_REQUIRE(_dependencyMap[10]).mergeItemsPackage)(packageItems);
              if (mergedItems.length) {
                return {
                  match: true,
                  strUrl: `usereserva://bag/${orderFormId}`
                };
              }
            }
          }
        }
      }
      return defaultCustomMethodReturn;
    });
    return function ditoRedirectCartUseCase(_x4) {
      return _ref5.apply(this, arguments);
    };
  }();
  var abandonedBagUseCase = function abandonedBagUseCase(initialUrl) {
    if (initialUrl.includes('bag')) {
      return {
        match: true,
        strUrl: initialUrl
      };
    }
    return defaultCustomMethodReturn;
  };
  var webCatalogCollectionUseCase = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2.default)(function* (initialUrl) {
      if (!initialUrl) {
        return defaultCustomMethodReturn;
      }
      var searchRegExp = /\//g;
      var replacePathName = '|';
      var _URL = new (_$$_REQUIRE(_dependencyMap[7]).URL)(initialUrl),
        pathname = _URL.pathname;
      var noHasPathName = pathname === '/';
      if (noHasPathName) {
        return defaultCustomMethodReturn;
      }
      var newPathName = pathname == null ? undefined : pathname.replace(searchRegExp, replacePathName);
      if (newPathName !== '|') {
        return {
          match: true,
          strUrl: `usereserva://asyncDeepLink/CATALOG?params=${newPathName}&initialUrl=${(0, _$$_REQUIRE(_dependencyMap[12]).removeProtocol)(initialUrl)}`
        };
      }
      return defaultCustomMethodReturn;
    });
    return function webCatalogCollectionUseCase(_x5) {
      return _ref6.apply(this, arguments);
    };
  }();
  var webviewDeepLinkUseCase = function webviewDeepLinkUseCase(initialUrl) {
    if (_reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[13]).platformType.ANDROID) {
      var regexValidURL = new RegExp(REGEX_VALID_URL);
      var currentURl = initialUrl;
      if (regexValidURL.test(currentURl)) {
        currentURl = (0, _$$_REQUIRE(_dependencyMap[12]).removeProtocol)(currentURl);
        return {
          match: true,
          strUrl: `usereserva://webview/d?uri=${currentURl}`
        };
      }
    }
    return defaultCustomMethodReturn;
  };
  var webViewFacaVcUseCase = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2.default)(function* (initialUrl) {
      yield (0, _$$_REQUIRE(_dependencyMap[5]).syncRemoteConfig)();
      var showWebviewFacavc = getBoolean('show_webview_facavc');
      var facaVcPath = 'facavc/criar';
      if (initialUrl.includes(facaVcPath) && showWebviewFacavc) {
        var numbersOfPathParams = 3;
        var handleInitialUrlParams = linkingUtils.handlePathsParams(initialUrl, facaVcPath, numbersOfPathParams);
        var aditionalParams = linkingUtils.splitPathParams(handleInitialUrlParams, facaVcPath);
        return {
          match: true,
          strUrl: `usereserva://facavc/criar${aditionalParams}`
        };
      }
      return defaultCustomMethodReturn;
    });
    return function webViewFacaVcUseCase(_x6) {
      return _ref7.apply(this, arguments);
    };
  }();
  var registerMethods = exports.registerMethods = [newOffersPageUseCase, urlLandingPagePrime, newsLetterUseCase, urlSiteCase, webViewFacaVcUseCase, urlGoogleGclidCase, urlRon, urlProductCase, urlMetaProductCase, colectionUseCase, accountWishListUseCase, accountUseCase, cartAddItemUseCase, ditoRedirectCartUseCase, cartUseCase, restoreCartUseCase, catalogCollectionUseCase, abandonedBagUseCase, webCatalogCollectionUseCase, webviewDeepLinkUseCase
  // clusterCollectionUseCase,
  ];
