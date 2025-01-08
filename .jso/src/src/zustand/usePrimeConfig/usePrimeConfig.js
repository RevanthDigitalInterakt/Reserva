  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getDefaultSeller = getDefaultSeller;
  exports.usePrimeConfig = exports.primeConfig = exports.hasPrimeConditions = exports.getPrime = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  /* TODO when refactoring the PDC and NewSearch, you should remove this logic */

  var primeConfig = exports.primeConfig = (0, _$$_REQUIRE(_dependencyMap[2]).create)(function (set, getState) {
    return {
      promo: null,
      onPrimeConfig: function () {
        var _onPrimeConfig = (0, _asyncToGenerator2.default)(function* () {
          try {
            var _yield$getApolloClien = yield (0, _$$_REQUIRE(_dependencyMap[3]).getApolloClient)().query({
                query: _$$_REQUIRE(_dependencyMap[4]).PrimeConfigDocument,
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: 'no-cache'
              }),
              data = _yield$getApolloClien.data;
            set(Object.assign({}, getState(), {
              promo: data.primeConfig
            }));
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(err);
          }
        });
        function onPrimeConfig() {
          return _onPrimeConfig.apply(this, arguments);
        }
        return onPrimeConfig;
      }()
    };
  });
  var usePrimeConfig = exports.usePrimeConfig = (0, _$$_REQUIRE(_dependencyMap[6]).createZustandStoreWithSelectors)(primeConfig);
  function getDefaultSeller(sellers) {
    if (!(sellers != null && sellers.length)) {
      return undefined;
    }
    var defaultSeller = sellers.find(function (seller) {
      return seller.sellerDefault === true;
    });
    if (defaultSeller != null && defaultSeller.sellerId) {
      return defaultSeller.sellerId;
    }
    return sellers[0].sellerId;
  }
  var hasPrimeConditions = exports.hasPrimeConditions = function hasPrimeConditions(product, promo) {
    var _product$items$, _product$items$$selle, _product$items$$selle2, _product$items$2, _product$items$2$sell, _product$items$2$sell2, _product$productClust;
    if ((product == null ? undefined : (_product$items$ = product.items[0]) == null ? undefined : (_product$items$$selle = _product$items$.sellers[0]) == null ? undefined : (_product$items$$selle2 = _product$items$$selle.commertialOffer) == null ? undefined : _product$items$$selle2.ListPrice) !== (product == null ? undefined : (_product$items$2 = product.items[0]) == null ? undefined : (_product$items$2$sell = _product$items$2.sellers[0]) == null ? undefined : (_product$items$2$sell2 = _product$items$2$sell.commertialOffer) == null ? undefined : _product$items$2$sell2.Price)) {
      return false;
    }
    if (!product || !(promo != null && promo.percentualDiscountValue)) {
      return false;
    }
    var categories = promo == null ? undefined : promo.categories.map(function (c) {
      return String(c.id);
    });
    var categoriesHasPrime = promo != null && promo.categoriesAreInclusive ? categories.includes(String(product.categoryId)) : !categories.includes(String(product.categoryId));
    if (!categoriesHasPrime) {
      return false;
    }
    var brands = promo == null ? undefined : promo.brands.map(function (c) {
      return String(c.id);
    });
    var brandsHasPrime = promo != null && promo.brandsAreInclusive ? brands.includes(String(product.brandId)) : !brands.includes(String(product.brandId));
    if (!brandsHasPrime) {
      return false;
    }
    var collections = promo == null ? undefined : promo.collections.map(function (c) {
      return String(c.id);
    });
    var productCollections = product == null ? undefined : (_product$productClust = product.productClusters) == null ? undefined : _product$productClust.map(function (c) {
      return String(c.id);
    });
    var hasAnyCollectionInCluster = collections.reduce(function (acc, cur) {
      return acc || !!(productCollections != null && productCollections.length) && productCollections.includes(cur);
    }, false);
    var collectionsHasPrime = promo != null && promo.collectionsIsInclusive ? hasAnyCollectionInCluster : !hasAnyCollectionInCluster;
    if (!collectionsHasPrime) {
      return false;
    }
    var sellers = product.items.map(function (item) {
      var seller = getDefaultSeller(item.sellers);
      return seller;
    });
    var sellersPrime = sellers.reduce(function (acc, cur) {
      var seller = promo == null ? undefined : promo.idSeller.includes(cur);
      return acc || seller;
    }, false);
    var sellerIsPrime = promo != null && promo.idSellerIsInclusive ? sellersPrime : !sellersPrime;
    if (!sellerIsPrime) {
      return false;
    }
    return true;
  };
  var getPrimeInstallments = function getPrimeInstallments(Installments, price) {
    var _maxInstallmentOption;
    var maxInstallmentOption = Installments != null && Installments.length ? Installments[0] : null;
    var installments = (_maxInstallmentOption = maxInstallmentOption == null ? undefined : maxInstallmentOption.NumberOfInstallments) != null ? _maxInstallmentOption : 1;
    new Array(12).fill(0).forEach(function (_, index) {
      if (price / (index + 1) >= 60) {
        installments = index + 1;
      }
    });
    return {
      number: installments,
      value: parseFloat((price / installments).toFixed(2))
    };
  };
  var getPrime = exports.getPrime = function getPrime(item, promo) {
    var hasPrime = hasPrimeConditions(item, promo);
    if (hasPrime) {
      var _item$items$, _seller$commertialOff, _seller$commertialOff2, _seller$commertialOff3;
      var seller = item == null ? undefined : (_item$items$ = item.items[0]) == null ? undefined : _item$items$.sellers[0];
      var priceWithDiscount = (_seller$commertialOff = seller == null ? undefined : (_seller$commertialOff2 = seller.commertialOffer) == null ? undefined : _seller$commertialOff2.Price) != null ? _seller$commertialOff : 0;
      var Installments = seller == null ? undefined : (_seller$commertialOff3 = seller.commertialOffer) == null ? undefined : _seller$commertialOff3.Installments;
      var primePercentualDiscount = (promo == null ? undefined : promo.percentualDiscountValue) || 0;
      var primePrice = priceWithDiscount * ((100 - primePercentualDiscount) / 100);
      var primeInstallments = getPrimeInstallments(Installments, primePrice);
      return {
        primePrice: primePrice,
        primeInstallments: primeInstallments
      };
    }
    return null;
  };
