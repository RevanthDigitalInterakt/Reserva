  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = PickUpHeader;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _AddZipCodeDelivery = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function PickUpHeader(_ref) {
    var _addressDelivery$deli, _addressDelivery$deli2, _addressDelivery$deli3, _addressDelivery$deli4, _addressDelivery$deli5, _addressDelivery$stor;
    var addressDelivery = _ref.addressDelivery,
      showHeader = _ref.showHeader;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[5]).useBagStore)(['actions']),
      actions = _useBagStore.actions;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)();
    var handleClickDeliveryToResidence = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        yield actions.ADD_DELIVERY_TO_RESIDENCE(addressDelivery.delivery.deliveryOptions, addressDelivery.delivery.address);
        actions.ADD_DELIVERY_TYPE('Receba em casa');
        navigation.goBack();
      });
      return function handleClickDeliveryToResidence() {
        return _ref2.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
      children: [showHeader && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.containerMarginTop,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.deliveryText,
            children: "Receba em casa"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.containerMarginTop,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_AddZipCodeDelivery.default, {
            icon: "greenCheck",
            label: addressDelivery == null ? undefined : (_addressDelivery$deli = addressDelivery.delivery) == null ? undefined : (_addressDelivery$deli2 = _addressDelivery$deli.address) == null ? undefined : _addressDelivery$deli2.street,
            description: `${addressDelivery == null ? undefined : (_addressDelivery$deli3 = addressDelivery.delivery.address) == null ? undefined : _addressDelivery$deli3.neighborhood} - ${addressDelivery == null ? undefined : (_addressDelivery$deli4 = addressDelivery.delivery.address) == null ? undefined : _addressDelivery$deli4.city} - ${addressDelivery == null ? undefined : (_addressDelivery$deli5 = addressDelivery.delivery.address) == null ? undefined : _addressDelivery$deli5.state}`,
            onPress: handleClickDeliveryToResidence
          })
        })]
      }), !!(addressDelivery != null && (_addressDelivery$stor = addressDelivery.storeList) != null && _addressDelivery$stor.stores.length) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
        children: [showHeader && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.dividerWrap,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.divider
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.dividerText,
            children: "OU"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.divider
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.containerMarginTop,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.deliveryText,
              children: "Retirada em loja"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
            style: [_$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.containerMarginTop, _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.containerMarginBottom],
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.pickUpText,
              children: ["Selecione uma das lojas abaixo para buscar seu pedido e ganhe", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
                style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.pickUpDiscountStoreText,
                children: `${addressDelivery.storeList.discountStorePickup} % off `
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
                style: _$$_REQUIRE(_dependencyMap[8]).pickUpHeaderStyles.pickUpTextBold,
                children: "em uma nova compra no ato da retirada."
              })]
            })
          })]
        })]
      })]
    });
  }
