  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FirstPurchaseDiscount = FirstPurchaseDiscount;
  exports.TotalDiscountFirstPurchase = TotalDiscountFirstPurchase;
  exports.decimalPart = decimalPart;
  exports.integerPart = integerPart;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function FirstPurchaseDiscount(_ref) {
    var discountText = _ref.discountText;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Box, {
      paddingBottom: "nano",
      testID: "com.usereserva:id/ShowFirstPurchaseDiscount",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Typography, {
        fontFamily: "nunitoRegular",
        fontSize: 11,
        color: "verdeSucesso",
        children: discountText
      })
    });
  }
  function TotalDiscountFirstPurchase(_ref2) {
    var priceDiscount = _ref2.priceDiscount;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Box, {
      position: "absolute",
      zIndex: 5,
      top: 84,
      right: 21,
      testID: "com.usereserva:id/ShowTotalDiscountFirstPurchase",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Typography, {
        color: "verdeSucesso",
        fontFamily: "nunitoRegular",
        fontSize: 11,
        children: ["-R$", ' ', priceDiscount]
      })
    });
  }
  function integerPart(num) {
    return Math.floor(num);
  }
  function decimalPart(num) {
    return `${num == null ? undefined : num.toFixed(2)}`.split('.')[1];
  }
