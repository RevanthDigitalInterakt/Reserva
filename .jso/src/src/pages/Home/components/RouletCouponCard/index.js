  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RouletCouponCard = RouletCouponCard;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _clipboard = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var HEADER_ICON_WIDTH = (0, _$$_REQUIRE(_dependencyMap[8]).scale)(16);
  var HEADER_ICON_HEIGHT = (0, _$$_REQUIRE(_dependencyMap[8]).scale)(16);
  var ICON_WIDTH = (0, _$$_REQUIRE(_dependencyMap[8]).scale)(12);
  var ICON_HEIGHT = (0, _$$_REQUIRE(_dependencyMap[8]).scale)(12);
  function RouletCouponCard() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[9]).useBagStore)(['rouletCoupon']),
      rouletCoupon = _useBagStore.rouletCoupon;
    var _useState = (0, _react.useState)(true),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      cardIsOpen = _useState2[0],
      setCardIsOpen = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isVisible = _useState4[0],
      setIsVisible = _useState4[1];
    var handleCopyCode = function handleCopyCode() {
      setIsVisible(true);
      _clipboard.default.setString(rouletCoupon.code || 'teste');
      _EventProvider.default.logEvent('click_cupom_roleta', {});
    };
    var handleCloseCard = function handleCloseCard() {
      return setCardIsOpen(false);
    };
    if (!rouletCoupon.code || !cardIsOpen) {
      return null;
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Modal, {
        isVisible: isVisible,
        handleClose: function handleClose() {
          return setIsVisible(false);
        },
        title: "Cupom Copiado",
        description: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).CopiedCupomDescription, {
          onPress: function onPress() {
            return setIsVisible(false);
          }
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
        style: _styles.default.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
          style: _styles.default.discountAlertTextWrapper,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_IconComponent.default, {
            width: HEADER_ICON_WIDTH,
            height: HEADER_ICON_HEIGHT,
            icon: "discountFlag"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.Text, {
            style: _styles.default.boldText,
            children: ["Voc\xEA ganhou", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
              style: _styles.default.normalText,
              children: "um"
            }), ' ', "cupom", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
              style: _styles.default.normalText,
              children: "ao girar a roleta!"
            })]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Pressable, {
          onPress: handleCloseCard,
          style: _styles.default.closeWrapper,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_IconComponent.default, {
            width: HEADER_ICON_WIDTH,
            height: HEADER_ICON_HEIGHT,
            icon: "close"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
          style: _styles.default.clipboardWrapper,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
            style: _styles.default.dottedBox,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
              style: _styles.default.couponText,
              children: rouletCoupon.code
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.TouchableOpacity, {
            onPress: handleCopyCode,
            style: _styles.default.copyBox,
            testID: "com.usereserva:id/clipboard-button",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_IconComponent.default, {
              width: ICON_WIDTH,
              height: ICON_HEIGHT,
              icon: "copy"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
              style: _styles.default.copyText,
              children: "Copiar"
            })]
          })]
        })]
      })]
    });
  }
