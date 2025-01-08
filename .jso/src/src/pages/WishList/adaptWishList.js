  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.mapProductToFavoriteItem = exports.getHighestInstallment = undefined;
  // TODO move to BFF when create New WishList
  var getHighestInstallment = exports.getHighestInstallment = function getHighestInstallment(installments) {
    return installments == null ? undefined : installments.reduce(function (prev, next) {
      return prev.NumberOfInstallments > next.NumberOfInstallments ? prev : next;
    }, {
      NumberOfInstallments: 0,
      Value: 0
    });
  };
  var mapProductToFavoriteItem = exports.mapProductToFavoriteItem = function mapProductToFavoriteItem(product, wishSkus) {
    return product.items.flatMap(function (item) {
      if (wishSkus.includes(item.itemId)) {
        var _item$sellers$, _item$sellers$$commer, _item$sellers$2, _item$sellers$2$comme, _item$sellers$3, _item$variations$, _item$variations$2, _item$images$;
        var availableProduct = (item == null ? undefined : (_item$sellers$ = item.sellers[0]) == null ? undefined : (_item$sellers$$commer = _item$sellers$.commertialOffer) == null ? undefined : _item$sellers$$commer.AvailableQuantity) > 0;
        var highestInstallment = getHighestInstallment(item == null ? undefined : (_item$sellers$2 = item.sellers[0]) == null ? undefined : (_item$sellers$2$comme = _item$sellers$2.commertialOffer) == null ? undefined : _item$sellers$2$comme.Installments);
        var sellerId = item == null ? undefined : (_item$sellers$3 = item.sellers[0]) == null ? undefined : _item$sellers$3.sellerId;
        var colorName = (_item$variations$ = item.variations[3]) == null ? undefined : _item$variations$.values[0];
        var size = (_item$variations$2 = item.variations[0]) == null ? undefined : _item$variations$2.values[0];
        var imageUrl = item == null ? undefined : (_item$images$ = item.images[0]) == null ? undefined : _item$images$.imageUrl;
        return [{
          id: item.itemId,
          product: product,
          colorName: colorName,
          size: size,
          imageUrl: imageUrl,
          sellerId: sellerId,
          skuName: item.name,
          skuId: item.itemId,
          availableProduct: availableProduct,
          installmentsNumber: highestInstallment.NumberOfInstallments,
          installmentPrice: highestInstallment.Value
        }];
      }
      return [];
    });
  };
