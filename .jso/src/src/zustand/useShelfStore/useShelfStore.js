  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useShelfStore = undefined;
  var shelfStore = (0, _$$_REQUIRE(_dependencyMap[0]).create)(function (set) {
    return {
      showShelfDrawer: false,
      shelfItemData: {
        brand: '',
        productName: '',
        productId: '',
        productLink: '',
        image: '',
        categoryTree: [''],
        flags: [],
        sku: [],
        prices: {
          listPrice: 0,
          salePrice: 0
        }
      },
      onShowShelfProductDetails: function onShowShelfProductDetails(value) {
        return set(function () {
          return {
            showShelfDrawer: value
          };
        });
      },
      onHideShelfProductDetails: function onHideShelfProductDetails(value) {
        return set(function () {
          return {
            showShelfDrawer: value
          };
        });
      },
      onGetShelfItemData: function onGetShelfItemData(value) {
        set(function () {
          return {
            shelfItemData: value
          };
        });
      }
    };
  });
  var useShelfStore = exports.useShelfStore = (0, _$$_REQUIRE(_dependencyMap[1]).createZustandStoreWithSelectors)(shelfStore);
