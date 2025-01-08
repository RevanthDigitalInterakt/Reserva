  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = BagFooter;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));
  var _PrimeDiscount = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function BagFooter() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[3]).useBagStore)(['appTotalizers', 'topBarLoading', 'installmentInfo', 'packageItems', 'prime']),
      packageItems = _useBagStore.packageItems,
      appTotalizers = _useBagStore.appTotalizers,
      installmentInfo = _useBagStore.installmentInfo,
      prime = _useBagStore.prime;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[4]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[5]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[6]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var _useNavigationToDeliv = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigationToDelivery)(),
      handleNavigateToDelivery = _useNavigationToDeliv.handleNavigateToDelivery,
      navigateToDeliveryDisable = _useNavigationToDeliv.navigateToDeliveryDisable;
    var items = (0, _react.useMemo)(function () {
      return (0, _$$_REQUIRE(_dependencyMap[8]).mergeItemsPackage)(packageItems);
    }, [packageItems]);
    var showPrimeDiscount = (0, _react.useMemo)(function () {
      return getBoolean('show_prime_discount');
    }, [getBoolean]);
    var totalDiscountPrime = (0, _react.useMemo)(function () {
      return prime == null ? undefined : prime.totalDiscount;
    }, [prime == null ? undefined : prime.totalDiscount]);
    var totalPrime = (0, _react.useMemo)(function () {
      return prime == null ? undefined : prime.total;
    }, [prime == null ? undefined : prime.total]);
    if (!(items != null && items.length)) {
      return null;
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
      width: "100%",
      bg: "white",
      height: isPrime ? 200 : 145,
      px: "xxs",
      style: {
        elevation: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[11]).platformType.ANDROID ? 10 : 0
      },
      boxShadow: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[11]).platformType.ANDROID ? null : 'bottomBarShadow',
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        flexDirection: "row",
        justifyContent: "space-between",
        py: "xxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 13,
            children: "Total:"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).PriceCustom, {
            fontFamily: "nunitoBold",
            sizeInterger: 15,
            sizeDecimal: 11,
            num: appTotalizers.total
          })]
        }), installmentInfo.totalPrice > 0 && appTotalizers.total > 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          alignItems: "flex-end",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 13,
            children: "em at\xE9"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
            flexDirection: "row",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              color: "vermelhoRSV",
              children: [installmentInfo.installmentsNumber, "x de", ' ']
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).PriceCustom, {
              fontFamily: "nunitoBold",
              color: "vermelhoRSV",
              sizeInterger: 15,
              sizeDecimal: 11,
              num: installmentInfo.installmentPrice
            })]
          })]
        })]
      }), showPrimeDiscount && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_PrimeDiscount.default, {
        type: _PrimeDiscount.PrimeDiscountType.BagFooter,
        setNegativeValue: true,
        totalPrime: totalPrime,
        discountPrime: totalDiscountPrime
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
        disabled: items.length === 0 || navigateToDeliveryDisable,
        onPress: function onPress() {
          return handleNavigateToDelivery(profile);
        },
        title: "IR PARA ENTREGA",
        variant: "primarioEstreito",
        inline: true,
        testID: "com.usereserva:id/bag_button_go_to_delivery"
      })]
    });
  }
