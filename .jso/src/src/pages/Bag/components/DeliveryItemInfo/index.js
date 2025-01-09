  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = DeliveryItemInfo;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function DeliveryItemInfo(_ref) {
    var friendlyName = _ref.friendlyName,
      shippingEstimate = _ref.shippingEstimate;
    var estimateText = (0, _react.useMemo)(function () {
      return shippingEstimate > 1 ? `Em até ${shippingEstimate} dias úteis.` : `Em até ${shippingEstimate} dia útil.`;
    }, [shippingEstimate]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[5]).deliveryItemInfoStyles.container,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[5]).deliveryItemInfoStyles.containerWrap,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_IconComponent.default, {
          icon: "greenCheck",
          style: _$$_REQUIRE(_dependencyMap[5]).deliveryItemInfoStyles.iconRight
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[5]).deliveryItemInfoStyles.textWrap,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[5]).deliveryItemInfoStyles.title,
            children: friendlyName
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[5]).deliveryItemInfoStyles.subTitle,
            children: estimateText
          })]
        })]
      })
    });
  }
