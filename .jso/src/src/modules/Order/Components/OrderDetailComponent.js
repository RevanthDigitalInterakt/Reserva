  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _OrderProduct = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function OrderDetailComponent(_ref) {
    var _data$items, _data$totals, _data$totals$find, _data$totals2, _data$totals2$find, _data$totals3, _data$totals3$find;
    var data = _ref.data;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        mt: "xxs",
        flexDirection: "row",
        justifyContent: "space-between",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
          fontFamily: "reservaDisplayRegular",
          fontSize: 20,
          color: "vermelhoRSV",
          children: (data == null ? undefined : data.orderId) && (data == null ? undefined : data.orderId)
        })
      }), (data == null ? undefined : (_data$items = data.items) == null ? undefined : _data$items.length) > 0 && data.items.map(function (item) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_OrderProduct.default, {
          orderItem: item
        }, item.productId);
      }), data && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        mt: "xs",
        flexDirection: "row",
        justifyContent: "space-between",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
          variant: "precoAntigo3",
          children: "Subtotal"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).PriceCustom, {
          fontFamily: "nunitoSemiBold",
          sizeInterger: 15,
          sizeDecimal: 11,
          num: ((data == null ? undefined : (_data$totals = data.totals) == null ? undefined : (_data$totals$find = _data$totals.find(function (_ref2) {
            var id = _ref2.id;
            return id === 'Items';
          })) == null ? undefined : _data$totals$find.value) || 0) / 100 || 0
        })]
      }), data && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        mt: "micro",
        flexDirection: "row",
        justifyContent: "space-between",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
          variant: "precoAntigo3",
          children: "Frete"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).PriceCustom, {
          fontFamily: "nunitoSemiBold",
          sizeInterger: 15,
          sizeDecimal: 11,
          num: ((data == null ? undefined : (_data$totals2 = data.totals) == null ? undefined : (_data$totals2$find = _data$totals2.find(function (_ref3) {
            var id = _ref3.id;
            return id === 'Shipping';
          })) == null ? undefined : _data$totals2$find.value) || 0) / 100 || 0
        })]
      }), data && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        mt: "micro",
        flexDirection: "row",
        justifyContent: "space-between",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
          variant: "precoAntigo3",
          children: "Descontos"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).PriceCustom, {
          fontFamily: "nunitoSemiBold",
          sizeInterger: 15,
          negative: true,
          sizeDecimal: 11,
          num: Math.abs((((_data$totals3 = data.totals) == null ? undefined : (_data$totals3$find = _data$totals3.find(function (_ref4) {
            var id = _ref4.id;
            return id === 'Discounts';
          })) == null ? undefined : _data$totals3$find.value) || 0) / 100 || 0)
        })]
      }), data && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        mt: "xxxs",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
          variant: "precoAntigo3",
          children: "Total"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).PriceCustom, {
          fontFamily: "nunitoBold",
          sizeInterger: 20,
          sizeDecimal: 11,
          num: data.value / 100
        })]
      })]
    });
  }
  var _default = exports.default = OrderDetailComponent;
