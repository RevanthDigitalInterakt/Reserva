  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createNavigateToProductParams = createNavigateToProductParams;
  function createNavigateToProductParams(params) {
    var defaultParams = {
      productId: '',
      hasCep: '',
      idsku: '',
      skuId: '',
      itemId: '',
      colorSelected: '',
      sizeSelected: '',
      selectedSize: ''
    };
    return Object.assign({}, defaultParams, params);
  }
