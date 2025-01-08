  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = KitLookFooter;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function KitLookFooter() {
    var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      btnDisabled = _useState2[0],
      setBtnDisabled = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      showAnimationBag = _useState4[0],
      setShowAnimationBag = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isClick = _useState6[0],
      setIsClick = _useState6[1];
    var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      loading = _useState8[0],
      setLoading = _useState8[1];
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[7]).useProductDetailStore)(['itemsTotalizer', 'selectedKitItems']),
      itemsTotalizer = _useProductDetailStor.itemsTotalizer,
      selectedKitItems = _useProductDetailStor.selectedKitItems;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[8]).useBagStore)(['actions', 'orderFormId', 'installmentInfo']),
      actions = _useBagStore.actions,
      orderFormId = _useBagStore.orderFormId,
      installmentInfo = _useBagStore.installmentInfo;
    var onAddProductToCart = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        if (!selectedKitItems || loading) return;
        setLoading(true);
        yield actions.ADD_MULTIPLE_ITEMS(selectedKitItems);
        yield actions.REFETCH_ORDER_FORM();
        setShowAnimationBag(true);
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[9]).ExceptionProvider.captureException(err);
        _reactNative.Alert.alert('Ocorreu um erro', err.message);
      } finally {
        setLoading(false);
        setIsClick(true);
      }
    }), [actions, loading, orderFormId, selectedKitItems]);
    var disabledBtn = (0, _react.useCallback)(function () {
      setBtnDisabled((selectedKitItems == null ? undefined : selectedKitItems.orderItems.length) === 0);
    }, [selectedKitItems]);
    (0, _react.useEffect)(function () {
      disabledBtn();
    }, [selectedKitItems]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
      style: _styles.default.mainContainer,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).ModalBag, {
        isVisible: showAnimationBag,
        onBackdropPress: function onBackdropPress() {
          return setShowAnimationBag(false);
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
        style: _styles.default.boxBody,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
            style: _styles.default.textFinalValue,
            children: "Valor Final:"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).PriceCustom, {
            fontFamily: "nunitoBold",
            sizeInterger: 18,
            sizeDecimal: 11,
            num: itemsTotalizer,
            color: "verdeSucesso"
          })]
        }), isClick && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
          alignItems: "flex-end",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
            style: _styles.default.textLabelInstallments,
            children: "em at\xE9"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            flexDirection: "row",
            children: [installmentInfo.installmentsNumber > 1 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.Text, {
              style: _styles.default.textInstallments,
              children: [installmentInfo.installmentsNumber, "x de", ' ']
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).PriceCustom, {
              fontFamily: "reservaSansBold",
              color: "preto",
              sizeInterger: 14,
              sizeDecimal: 11,
              num: installmentInfo.installmentPrice
            })]
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.TouchableOpacity, {
        disabled: btnDisabled || loading,
        testID: "com.usereserva:id/bag_button_go_to_delivery",
        onPress: function onPress() {
          return onAddProductToCart();
        },
        style: btnDisabled || loading ? _styles.default.btnTouchAddToBagDisabled : _styles.default.btnTouchAddToBag,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
          style: _styles.default.btnTextAddToBag,
          children: "Adicionar \xE0 sacola"
        })
      }), !!loading && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
        style: _styles.default.containerLoading,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_lottieReactNative.default, {
          source: _$$_REQUIRE(_dependencyMap[14]).loadingSpinner,
          style: {
            width: 16,
            height: 16
          },
          autoPlay: true,
          loop: true
        })
      })]
    });
  }
