  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sumQuantity = exports.getQuantity = exports.getAFQuantity = exports.getAFContentType = exports.getAFContentId = exports.getAFContent = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var getAFContentId = exports.getAFContentId = function getAFContentId(items) {
    return items.map(function (i) {
      return i.productId;
    });
  };
  var getAFContentType = exports.getAFContentType = function getAFContentType(items) {
    return items.map(function (i) {
      return (0, _$$_REQUIRE(_dependencyMap[2]).CategoriesParserString)(i.productCategories);
    });
  };
  var getQuantity = exports.getQuantity = function getQuantity(items) {
    var arr = items.reduce(function (acc, cur) {
      var curId = cur.productId,
        curQuantity = cur.quantity;
      var indexOfExistingItem = acc.findIndex(function (item) {
        return item.productId === curId;
      });
      if (indexOfExistingItem > -1) {
        var _acc$indexOfExistingI = acc[indexOfExistingItem],
          productId = _acc$indexOfExistingI.productId,
          quantity = _acc$indexOfExistingI.quantity;
        acc[indexOfExistingItem] = {
          productId: productId,
          quantity: quantity + curQuantity
        };
        return acc;
      }
      acc = [].concat((0, _toConsumableArray2.default)(acc), [cur]);
      return acc;
    }, []);
    return arr;
  };
  var getAFContent = exports.getAFContent = function getAFContent(items) {
    return items.map(function (i) {
      return {
        id: i.productId,
        price: i.price / 100 || 0,
        quantity: i.quantity
      };
    });
  };
  var getAFQuantity = exports.getAFQuantity = function getAFQuantity(items) {
    return JSON.stringify(items.map(function (i) {
      return {
        id: i.productId,
        quantity: i.quantity
      };
    }));
  };
  var sumQuantity = exports.sumQuantity = function sumQuantity(items) {
    return items.reduce(function (acc, value) {
      return acc + value.quantity;
    }, 0);
  };
