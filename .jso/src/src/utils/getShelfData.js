  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getShelfData = undefined;
  var getShelfData = exports.getShelfData = function getShelfData(data) {
    var newArr = data.map(function (item) {
      return {
        brand: item.brand,
        categoryTree: [],
        flags: [{
          type: 'savings',
          value: item.discountPercentage
        }],
        image: item.image,
        prices: {
          listPrice: item.listPrice,
          salePrice: item.currentPrice
        },
        productId: item.productId,
        productLink: '',
        productName: item.productName,
        sku: [{
          colorHex: '',
          colorName: '',
          colorRefId: '',
          sizes: [{
            skuId: item.skuId,
            disabled: false,
            value: ''
          }]
        }]
      };
    });
    return newArr;
  };
