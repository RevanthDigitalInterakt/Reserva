  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getMessageErrorWhenUpdateItem = getMessageErrorWhenUpdateItem;
  function getMessageErrorWhenUpdateItem(info) {
    var updateItemResponse = info.updateItemResponse,
      currentItem = info.currentItem,
      mergeItems = info.mergeItems,
      appTotalizers = info.appTotalizers,
      currValueItem = info.currentUpdateValueItem;
    if (!updateItemResponse) return '';
    var messages = updateItemResponse.messages.filter(function (error) {
      return error.includes(currentItem.name);
    })[0] || '';
    var newQtyAndTotalizerItemInfo = mergeItems.reduce(function (previousValue, currentValue) {
      return currentItem.id === currentValue.id ? {
        quantity: previousValue.quantity + currentValue.quantity,
        totalizerItem: previousValue.totalizerItem + 1
      } : Object.assign({}, previousValue);
    }, {
      quantity: 0,
      totalizerItem: 0
    });
    if (newQtyAndTotalizerItemInfo.totalizerItem) {
      if (appTotalizers.total === newQtyAndTotalizerItemInfo.quantity) {
        return messages;
      }
    } else if (newQtyAndTotalizerItemInfo.quantity !== currValueItem && currValueItem > 0) {
      return messages;
    }
    return '';
  }
