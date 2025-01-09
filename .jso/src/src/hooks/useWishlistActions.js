  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useWishlistActions = useWishlistActions;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[3]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _useWishlistStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function useWishlistActions() {
    var _useWishlistStore = (0, _useWishlistStore2.default)(['favorites', 'onLoadFavorites', 'onFavorite', 'onUnfavorite']),
      favorites = _useWishlistStore.favorites,
      onLoadFavorites = _useWishlistStore.onLoadFavorites,
      onUnfavorite = _useWishlistStore.onUnfavorite,
      onFavorite = _useWishlistStore.onFavorite;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loadingSkuId = _useState2[0],
      setLoadingSkuId = _useState2[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[6]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    (0, _react.useEffect)(function () {
      if (profile != null && profile.email) {
        onLoadFavorites();
      }
    }, [profile == null ? undefined : profile.email]);
    var verifyAuthentication = (0, _react.useCallback)(function () {
      if (!(profile != null && profile.email)) {
        (0, _$$_REQUIRE(_dependencyMap[7]).navigateUsingRef)('Login', {
          comeFrom: 'Favorite'
        });
        return false;
      }
      return true;
    }, [profile == null ? undefined : profile.email]);
    var checkIsFavorite = (0, _react.useCallback)(function (skuId) {
      return favorites.includes(skuId);
    }, [favorites]);
    var onToggleFavorite = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (product) {
        try {
          var _product$lowPrice;
          if (!verifyAuthentication()) return;
          setLoadingSkuId(product.skuId);
          var isFavorite = checkIsFavorite(product.skuId);
          var newItem = {
            price: (_product$lowPrice = product.lowPrice) != null ? _product$lowPrice : 0,
            item_id: product == null ? undefined : product.productId,
            quantity: 1,
            item_name: product == null ? undefined : product.productName,
            item_variant: product == null ? undefined : product.skuName,
            item_category: 'product'
          };
          if (isFavorite) {
            yield onUnfavorite(product);
            _EventProvider.default.logEvent('remove_from_wishlist', {
              value: product.lowPrice,
              currency: 'BRL',
              items: [newItem]
            });
            return;
          }
          (0, _$$_REQUIRE(_dependencyMap[8]).trackEventDitoAddWishlist)(product);
          _EventProvider.default.logEvent('add_to_wishlist', {
            value: product.lowPrice,
            currency: 'BRL',
            items: [newItem]
          });
          var _useSearchStore$getSt = _$$_REQUIRE(_dependencyMap[9]).useSearchStore.getState(),
            queryID = _useSearchStore$getSt.queryID;
          _$$_REQUIRE(_dependencyMap[10]).trackClickAlgoliaStore.getState().onTrack({
            typeEvent: _$$_REQUIRE(_dependencyMap[11]).TrackEventTypeEnum.Conversion,
            nameEvent: queryID ? _$$_REQUIRE(_dependencyMap[11]).TrackEventNameEnum.ConvertedItemsSearch : _$$_REQUIRE(_dependencyMap[11]).TrackEventNameEnum.ConvertedItems,
            sku: [(product == null ? undefined : product.ean) || ''],
            queryID: queryID,
            dataObject: [{
              discount: 0,
              price: product.lowPrice || 1,
              quantity: 1
            }],
            totalPrice: product.lowPrice || 1
          });
          yield onFavorite(product);
        } catch (err) {
          _$$_REQUIRE(_dependencyMap[12]).ExceptionProvider.captureException(err, {
            product: product
          });
        } finally {
          setLoadingSkuId(undefined);
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), [verifyAuthentication, checkIsFavorite, onFavorite, onUnfavorite]);
    return {
      onToggleFavorite: onToggleFavorite,
      checkIsFavorite: checkIsFavorite,
      loadingSkuId: loadingSkuId
    };
  }
