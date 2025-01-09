  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getItemPrice = undefined;
  var getItemPrice = exports.getItemPrice = function getItemPrice(item) {
    var _sellerWithInstallmen;
    if (!item) {
      return {
        listPrice: 0,
        sellingPrice: 0,
        installments: [],
        installmentsNumber: undefined,
        discountTag: undefined,
        cashPaymentPrice: 0,
        installmentPrice: undefined
      };
    }
    var sellerWithInstallments = item.sellers.find(function (seller) {
      var _seller$commertialOff, _seller$commertialOff2;
      return ((_seller$commertialOff = seller.commertialOffer) == null ? undefined : (_seller$commertialOff2 = _seller$commertialOff.Installments) == null ? undefined : _seller$commertialOff2.length) > 0;
    });
    var productIsSoldOut = item.sellers.every(function (seller) {
      var _seller$commertialOff3;
      return ((_seller$commertialOff3 = seller.commertialOffer) == null ? undefined : _seller$commertialOff3.AvailableQuantity) === 0;
    });
    if (!sellerWithInstallments && productIsSoldOut) {
      var _item$sellers$, _item$sellers$$commer, _item$sellers$2, _item$sellers$2$comme;
      return {
        listPrice: ((_item$sellers$ = item.sellers[0]) == null ? undefined : (_item$sellers$$commer = _item$sellers$.commertialOffer) == null ? undefined : _item$sellers$$commer.ListPrice) || 0,
        sellingPrice: ((_item$sellers$2 = item.sellers[0]) == null ? undefined : (_item$sellers$2$comme = _item$sellers$2.commertialOffer) == null ? undefined : _item$sellers$2$comme.Price) || 0,
        installments: [],
        installmentsNumber: undefined,
        discountTag: undefined,
        cashPaymentPrice: 0,
        installmentPrice: undefined
      };
    }
    var listPrice = (sellerWithInstallments == null ? undefined : sellerWithInstallments.commertialOffer.ListPrice) || 0;
    var sellingPrice = (sellerWithInstallments == null ? undefined : sellerWithInstallments.commertialOffer.Price) || 0;
    var installments = (sellerWithInstallments == null ? undefined : (_sellerWithInstallmen = sellerWithInstallments.commertialOffer) == null ? undefined : _sellerWithInstallmen.Installments) || [];
    var installmentsNumber = installments.reduce(function (prev, next) {
      return prev.NumberOfInstallments > next.NumberOfInstallments ? prev : next;
    }, {
      NumberOfInstallments: 0,
      Value: 0
    });
    var hasListPriceAndSellingPrice = listPrice && sellingPrice;
    var discountTag = hasListPriceAndSellingPrice && (0, _$$_REQUIRE(_dependencyMap[0]).getPercent)(sellingPrice, listPrice);
    var cashPaymentPrice = !!discountTag && discountTag > 0 ? sellingPrice : listPrice || 0;
    var installmentPrice = installments == null ? undefined : installments.reduce(function (prev, next) {
      return prev.NumberOfInstallments > next.NumberOfInstallments ? prev : next;
    }, {
      NumberOfInstallments: 0,
      Value: 0
    });
    return {
      listPrice: listPrice,
      sellingPrice: sellingPrice,
      installments: installments,
      installmentsNumber: installmentsNumber,
      discountTag: discountTag,
      cashPaymentPrice: cashPaymentPrice,
      installmentPrice: installmentPrice
    };
  };
