  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function PricesSelectBoxes(_ref) {
    var _selectedSize$install, _selectedSize$install2, _selectedSize$prime2, _selectedSize$prime3;
    var selectedSize = _ref.selectedSize,
      hasPrime = _ref.hasPrime;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isNormalPriceSelected = _useState2[0],
      setIsNormalPriceSelected = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isPrimePriceSelected = _useState4[0],
      setIsPrimePriceSelected = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isModalSignInVisible = _useState6[0],
      setIsModalSignInVisible = _useState6[1];
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[5]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime;
    var _usePrimeStore = (0, _$$_REQUIRE(_dependencyMap[6]).usePrimeStore)(['animationBag', 'handleClickContinue', 'isVisibleModalWelcome', 'changeStateAnimationBag', 'changeStateIsVisibleModalWelcome']),
      animationBag = _usePrimeStore.animationBag,
      handleClickContinue = _usePrimeStore.handleClickContinue,
      isVisibleModalWelcome = _usePrimeStore.isVisibleModalWelcome,
      changeStateAnimationBag = _usePrimeStore.changeStateAnimationBag,
      changeStateIsVisibleModalWelcome = _usePrimeStore.changeStateIsVisibleModalWelcome;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[7]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var hasDiscount = selectedSize == null ? undefined : selectedSize.hasDiscount;
    var selectNormalPrice = (0, _react.useCallback)(function () {
      setIsNormalPriceSelected(true);
      setIsPrimePriceSelected(false);
    }, []);
    var selectPrimePrice = (0, _react.useCallback)(function () {
      setIsNormalPriceSelected(false);
      setIsPrimePriceSelected(true);
    }, []);
    var selectPriceBasedOnUser = (0, _react.useCallback)(function () {
      if (!hasDiscount && (profile != null && profile.isPrime || isPrime)) {
        selectPrimePrice();
      } else {
        selectNormalPrice();
      }
    }, [hasDiscount, isPrime, profile == null ? undefined : profile.isPrime]);
    (0, _react.useLayoutEffect)(function () {
      selectPriceBasedOnUser();
    }, [hasDiscount, isPrime, isModalSignInVisible, selectPriceBasedOnUser]);
    var handleSelectBoxesPress = (0, _react.useCallback)(function (option) {
      if (option === 'priceNormal' && !isNormalPriceSelected) {
        selectNormalPrice();
      } else if (option === 'pricePrime' && !isPrimePriceSelected) {
        selectPrimePrice();
        if (!(profile != null && profile.isPrime) && !isPrime) {
          setIsModalSignInVisible(true);
        }
      }
    }, [isPrime, isNormalPriceSelected, isPrimePriceSelected, profile == null ? undefined : profile.isPrime]);
    var savedValueProduct = function savedValueProduct() {
      var _selectedSize$prime;
      var currentPriceProduct = (selectedSize == null ? undefined : selectedSize.currentPrice) || 0;
      var pricePrime = (selectedSize == null ? undefined : (_selectedSize$prime = selectedSize.prime) == null ? undefined : _selectedSize$prime.price) || 0;
      if (!currentPriceProduct && !pricePrime) return 0;
      return currentPriceProduct - pricePrime;
    };
    var handleOnModalHide = (0, _react.useCallback)(function () {
      if (isPrime) {
        changeStateIsVisibleModalWelcome(true);
      }
    }, [changeStateIsVisibleModalWelcome, isPrime]);
    var handleOnModalHideSignIn = (0, _react.useCallback)(function () {
      if (isPrime) {
        changeStateAnimationBag(true);
      }
    }, [changeStateAnimationBag, isPrime]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.View, Object.assign({}, (0, _testProps.default)('com.usereserva:id/prices_select_boxes'), {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).ModalSignIn, {
        isVisible: isModalSignInVisible,
        onClose: function onClose() {
          return setIsModalSignInVisible(false);
        },
        onModalHide: handleOnModalHideSignIn
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).ModalWelcomePrime, {
        isVisible: isVisibleModalWelcome,
        onClose: handleClickContinue
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).ModalBag, {
        isVisible: animationBag,
        onBackdropPress: function onBackdropPress() {
          return changeStateAnimationBag(false);
        },
        onModalHide: handleOnModalHide
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).SelectBoxNormal, {
        installmentsNumber: (_selectedSize$install = selectedSize == null ? undefined : selectedSize.installment.number) != null ? _selectedSize$install : 1,
        installmentsPrice: (_selectedSize$install2 = selectedSize == null ? undefined : selectedSize.installment.value) != null ? _selectedSize$install2 : 0,
        installmentsEqualPrime: selectedSize == null ? undefined : selectedSize.installmentEqualPrime,
        isChecked: isNormalPriceSelected,
        onPress: handleSelectBoxesPress,
        price: hasDiscount ? selectedSize.currentPrice : selectedSize == null ? undefined : selectedSize.listPrice
      }), selectedSize != null && selectedSize.hasDiscount ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
        fontFamily: "reservaSansRegular",
        color: "fullBlack",
        style: _$$_REQUIRE(_dependencyMap[14]).styles.textWrapper,
        children: ["O desconto do", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
          fontFamily: "reservaDisplayRegular",
          variant: "descontoTag2",
          fontSize: 20,
          color: "vermelhoRSV",
          children: [' ', "Prime", ' ']
        }), "n\xE3o \xE9 cumulativo com produtos em liquida\xE7\xE3o."]
      }) : hasPrime !== false && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[15]).SelectBoxPrime, {
        installment: selectedSize == null ? undefined : (_selectedSize$prime2 = selectedSize.prime) == null ? undefined : _selectedSize$prime2.installment,
        isChecked: isPrimePriceSelected,
        onPress: handleSelectBoxesPress,
        savedValue: savedValueProduct(),
        price: selectedSize == null ? undefined : (_selectedSize$prime3 = selectedSize.prime) == null ? undefined : _selectedSize$prime3.price
      })]
    }));
  }
  var _default = exports.default = PricesSelectBoxes;
