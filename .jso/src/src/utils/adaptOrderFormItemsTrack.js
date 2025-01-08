  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.adaptOrderFormItemsTrack = adaptOrderFormItemsTrack;
  function adaptOrderFormItemsTrack(items) {
    return (items || []).map(function (item) {
      return {
        price: item.price / 100,
        item_id: item.productId,
        quantity: item.quantity,
        item_name: item.name,
        item_variant: item.skuName,
        item_category: 'product'
      };
    });
  }
