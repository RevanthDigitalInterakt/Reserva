  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var parseProductsGatewayToVtex = function parseProductsGatewayToVtex(products) {
    var vtexProducts = products.map(function (product) {
      var _product$categoryTree;
      return Object.assign({}, product, {
        skuSpecifications: [],
        categoryTree: (_product$categoryTree = product.categoryTree) == null ? undefined : _product$categoryTree.map(function (category) {
          return {
            name: category
          };
        }),
        items: product.items.map(function (item) {
          return Object.assign({}, item, {
            images: item.images.map(function (image) {
              return {
                imageUrl: image
              };
            }),
            sellers: item.sellers.map(function (seller) {
              var _seller$commertialOff, _seller$commertialOff2, _seller$commertialOff3, _seller$commertialOff4, _seller$commertialOff5, _seller$commertialOff6, _seller$commertialOff7, _seller$commertialOff8;
              return Object.assign({}, seller, {
                commertialOffer: {
                  Price: seller == null ? undefined : (_seller$commertialOff = seller.commertialOffer) == null ? undefined : _seller$commertialOff.price,
                  Installments: (seller == null ? undefined : (_seller$commertialOff2 = seller.commertialOffer) == null ? undefined : _seller$commertialOff2.installments.map(function (installment) {
                    return {
                      Value: installment == null ? undefined : installment.value,
                      TotalValuePlusInterestRate: installment == null ? undefined : installment.totalValuePlusInterestRate,
                      NumberOfInstallments: installment == null ? undefined : installment.numberOfInstallments
                    };
                  })) || [],
                  ListPrice: seller == null ? undefined : (_seller$commertialOff3 = seller.commertialOffer) == null ? undefined : _seller$commertialOff3.listPrice,
                  PriceWithoutDiscount: seller == null ? undefined : (_seller$commertialOff4 = seller.commertialOffer) == null ? undefined : _seller$commertialOff4.priceWithoutDiscount,
                  AvailableQuantity: seller == null ? undefined : (_seller$commertialOff5 = seller.commertialOffer) == null ? undefined : _seller$commertialOff5.availableQuantity,
                  Tax: seller == null ? undefined : (_seller$commertialOff6 = seller.commertialOffer) == null ? undefined : _seller$commertialOff6.tax,
                  discountHighlights: [],
                  teasers: [],
                  spotPrice: (_seller$commertialOff7 = seller.commertialOffer) == null ? undefined : _seller$commertialOff7.spotPrice,
                  taxPercentage: (_seller$commertialOff8 = seller.commertialOffer) == null ? undefined : _seller$commertialOff8.taxPercentage
                }
              });
            })
          });
        })
      });
    });
    return vtexProducts;
  };
  var useRecommendation = (0, _$$_REQUIRE(_dependencyMap[0]).create)(function (set) {
    return {
      showSection: true,
      products: [],
      setShowSection: function setShowSection(value) {
        return set(function () {
          return {
            showSection: value
          };
        });
      },
      setProducts: function setProducts(value) {
        return set(function () {
          return {
            products: parseProductsGatewayToVtex(value)
          };
        });
      }
    };
  });
  var _default = exports.default = useRecommendation;
