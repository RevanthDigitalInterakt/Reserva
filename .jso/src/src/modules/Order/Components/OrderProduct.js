  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function OrderProduct(_ref) {
    var _orderItem$imageUrl, _orderItem$imageUrl$s, _orderItem$name2;
    var orderItem = _ref.orderItem;
    var _useNavigation = (0, _$$_REQUIRE(_dependencyMap[5]).useNavigation)(),
      navigate = _useNavigation.navigate;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
      flexDirection: "row",
      mt: "xxs",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        children: orderItem && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
          onPress: function onPress() {
            var _orderItem$productId, _orderItem$id, _orderItem$name, _orderItem$name$split;
            _EventProvider.default.logEvent('page_view', {
              item_brand: _$$_REQUIRE(_dependencyMap[9]).defaultBrand.picapau
            });
            _EventProvider.default.logEvent('select_item', {
              item_list_id: orderItem == null ? undefined : orderItem.id,
              item_list_name: orderItem == null ? undefined : orderItem.name,
              item_brand: _$$_REQUIRE(_dependencyMap[9]).defaultBrand.reserva
            });
            navigate('ProductDetail', {
              productId: orderItem == null ? undefined : (_orderItem$productId = orderItem.productId) == null ? undefined : _orderItem$productId.trim(),
              itemId: orderItem == null ? undefined : (_orderItem$id = orderItem.id) == null ? undefined : _orderItem$id.trim(),
              sizeSelected: (orderItem == null ? undefined : (_orderItem$name = orderItem.name) == null ? undefined : (_orderItem$name$split = _orderItem$name.split('-')[1]) == null ? undefined : _orderItem$name$split.trim()) || ''
            });
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_ImageComponent.default, {
            height: 152,
            width: _configDeviceSizes.default.DEVICE_WIDTH * 0.25,
            source: {
              uri: orderItem == null ? undefined : (_orderItem$imageUrl = orderItem.imageUrl) == null ? undefined : (_orderItem$imageUrl$s = _orderItem$imageUrl.split('-55-55')) == null ? undefined : _orderItem$imageUrl$s.join('')
            }
          })
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        ml: "micro",
        flex: 1,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          mb: "nano",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            fontSize: 13,
            fontFamily: "nunitoBold",
            children: orderItem == null ? undefined : (_orderItem$name2 = orderItem.name) == null ? undefined : _orderItem$name2.split(' - ')[0]
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          flexDirection: "row",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            color: "neutroFrio2",
            fontSize: 11,
            fontFamily: "nunitoRegular",
            children: ["De:", ' ']
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[11]).PriceCustom, {
            fontFamily: "nunitoSemiBold",
            sizeInterger: 15,
            sizeDecimal: 11,
            num: orderItem != null && orderItem.listPrice ? (orderItem == null ? undefined : orderItem.listPrice) / 100 : 0
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[11]).PriceCustom, {
          fontFamily: "nunitoSemiBold",
          sizeInterger: 15,
          sizeDecimal: 11,
          num: orderItem.price / 100
        })]
      })]
    });
  }
  var _default = exports.default = OrderProduct;
