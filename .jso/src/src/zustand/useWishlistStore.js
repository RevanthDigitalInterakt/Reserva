  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var useWishlistStore = (0, _$$_REQUIRE(_dependencyMap[2]).create)(function (set, getState) {
    return {
      initialized: false,
      favorites: [],
      loading: false,
      onLoadFavorites: function () {
        var _onLoadFavorites = (0, _asyncToGenerator2.default)(function* () {
          set(function () {
            return {
              loading: true
            };
          });
          try {
            if (getState().initialized) return;
            var client = yield (0, _$$_REQUIRE(_dependencyMap[3]).getApolloClient)();
            var _yield$client$query = yield client.query({
                query: _$$_REQUIRE(_dependencyMap[4]).WishlistDocument,
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: 'no-cache'
              }),
              data = _yield$client$query.data;
            set(function () {
              return {
                favorites: data.wishlist || [],
                initialized: true
              };
            });
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(err);
          } finally {
            set(function () {
              return {
                loading: false
              };
            });
          }
        });
        function onLoadFavorites() {
          return _onLoadFavorites.apply(this, arguments);
        }
        return onLoadFavorites;
      }(),
      refreshFavorites: function () {
        var _refreshFavorites = (0, _asyncToGenerator2.default)(function* () {
          set(function () {
            return {
              loading: true
            };
          });
          try {
            var client = yield (0, _$$_REQUIRE(_dependencyMap[3]).getApolloClient)();
            var _yield$client$query2 = yield client.query({
                query: _$$_REQUIRE(_dependencyMap[4]).WishlistDocument,
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: 'no-cache'
              }),
              data = _yield$client$query2.data;
            set(function () {
              return {
                favorites: data.wishlist || []
              };
            });
            return data.wishlist || [];
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(err);
            return [];
          } finally {
            set(function () {
              return {
                loading: false
              };
            });
          }
        });
        function refreshFavorites() {
          return _refreshFavorites.apply(this, arguments);
        }
        return refreshFavorites;
      }(),
      onFavorite: function () {
        var _onFavorite = (0, _asyncToGenerator2.default)(function* (product) {
          set(function () {
            return {
              loading: true
            };
          });
          try {
            var client = yield (0, _$$_REQUIRE(_dependencyMap[3]).getApolloClient)();
            var _yield$client$mutate = yield client.mutate({
                mutation: _$$_REQUIRE(_dependencyMap[4]).WishlistAddProductDocument,
                context: {
                  clientName: 'gateway'
                },
                variables: {
                  input: {
                    productId: product.productId,
                    skuId: product.skuId
                  }
                }
              }),
              data = _yield$client$mutate.data;
            set(function () {
              return {
                favorites: (data == null ? undefined : data.wishlistAddProduct) || []
              };
            });
            return true;
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(err, {
              product: product
            });
            return false;
          } finally {
            set(function () {
              return {
                loading: false
              };
            });
          }
        });
        function onFavorite(_x) {
          return _onFavorite.apply(this, arguments);
        }
        return onFavorite;
      }(),
      onUnfavorite: function () {
        var _onUnfavorite = (0, _asyncToGenerator2.default)(function* (product) {
          set(function () {
            return {
              loading: true
            };
          });
          try {
            var client = yield (0, _$$_REQUIRE(_dependencyMap[3]).getApolloClient)();
            var _yield$client$mutate2 = yield client.mutate({
                mutation: _$$_REQUIRE(_dependencyMap[4]).WishlistRemoveProductDocument,
                context: {
                  clientName: 'gateway'
                },
                variables: {
                  input: {
                    productId: product.productId,
                    skuId: product.skuId
                  }
                }
              }),
              data = _yield$client$mutate2.data;
            set(function () {
              return {
                favorites: (data == null ? undefined : data.wishlistRemoveProduct) || []
              };
            });
            return true;
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(err, {
              product: product
            });
            return false;
          } finally {
            set(function () {
              return {
                loading: false
              };
            });
          }
        });
        function onUnfavorite(_x2) {
          return _onUnfavorite.apply(this, arguments);
        }
        return onUnfavorite;
      }()
    };
  });
  var _default = exports.default = (0, _$$_REQUIRE(_dependencyMap[6]).createZustandStoreWithSelectors)(useWishlistStore);
