  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IfRenderShippingMessage = IfRenderShippingMessage;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _shippingMessage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _IconGreenCheckMark = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function IfRenderShippingMessage(_ref) {
    var sumPriceShipping = _ref.sumPriceShipping,
      sumPrice = _ref.sumPrice,
      freeShippingValue = _ref.freeShippingValue;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[5]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime;
    if (isPrime) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        style: _shippingMessage.default.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
          style: _shippingMessage.default.container,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_IconGreenCheckMark.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
            style: _shippingMessage.default.text,
            children: "Cliente "
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
          style: _shippingMessage.default.textPrime,
          children: "PRIME"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
          style: _shippingMessage.default.text,
          children: "j\xE1 tem "
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
          style: _shippingMessage.default.greenText,
          children: "FRETE GR\xC1TIS!"
        })]
      });
    }
    if (sumPriceShipping < freeShippingValue) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        style: _shippingMessage.default.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
            children: "Faltam apenas "
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).PriceCustom, {
          fontFamily: "nunitoBold",
          sizeInterger: 3,
          sizeDecimal: 1,
          num: -sumPrice
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
          style: _shippingMessage.default.text,
          children: " para ganhar "
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
          style: _shippingMessage.default.redText,
          children: "FRETE GR\xC1TIS"
        })]
      });
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
      style: _shippingMessage.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_IconGreenCheckMark.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
        style: _shippingMessage.default.darkGreenText,
        children: "Voc\xEA ganhou "
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
        style: _shippingMessage.default.greenText,
        children: "FRETE GR\xC1TIS!"
      })]
    });
  }
