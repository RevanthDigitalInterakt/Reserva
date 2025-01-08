  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SelectBoxNormal = SelectBoxNormal;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function SelectBoxNormal(_ref) {
    var installmentsNumber = _ref.installmentsNumber,
      installmentsPrice = _ref.installmentsPrice,
      isChecked = _ref.isChecked,
      _onPress = _ref.onPress,
      installmentsEqualPrime = _ref.installmentsEqualPrime,
      _ref$price = _ref.price,
      price = _ref$price === undefined ? 0 : _ref$price;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[5]).useRemoteConfig)(),
      getString = _useRemoteConfig.getString;
    var typeInstallments = (0, _react.useMemo)(function () {
      return getString('installments_prime');
    }, [getString]);
    var showInstallments = typeInstallments !== 'hide_installments' && installmentsEqualPrime || !installmentsEqualPrime;
    var separator = _reactNative.StyleSheet.flatten([_$$_REQUIRE(_dependencyMap[6]).styles.separator, typeInstallments === 'hide_installments' ? _$$_REQUIRE(_dependencyMap[6]).styles.mDefaultSeparator : _$$_REQUIRE(_dependencyMap[6]).styles.mtSeparator]);
    var pricesWrapper = _reactNative.StyleSheet.flatten([_$$_REQUIRE(_dependencyMap[6]).styles.priceContainer, _$$_REQUIRE(_dependencyMap[6]).styles.marginText, typeInstallments === 'hide_installments' ? _$$_REQUIRE(_dependencyMap[6]).styles.mDefaultPrice : _$$_REQUIRE(_dependencyMap[6]).styles.mtPrice]);
    var containerSelectBoxes = _reactNative.StyleSheet.flatten([_$$_REQUIRE(_dependencyMap[6]).styles.checkBoxContainer, typeInstallments === 'hide_installments' && _$$_REQUIRE(_dependencyMap[6]).styles.minHeight]);
    var renderPrice = (0, _react.useCallback)(function () {
      if (typeInstallments === 'show_prime_equal_to_regular' && installmentsEqualPrime) {
        return (installmentsEqualPrime == null ? undefined : installmentsEqualPrime.value) || 0;
      }
      if (!showInstallments) {
        return price;
      }
      return installmentsPrice;
    }, [installmentsEqualPrime, installmentsPrice, price, showInstallments, typeInstallments]);
    var renderInstallments = (0, _react.useCallback)(function () {
      if (typeInstallments === 'show_prime_equal_to_regular' && installmentsEqualPrime) {
        return installmentsEqualPrime == null ? undefined : installmentsEqualPrime.number;
      }
      return installmentsNumber;
    }, [installmentsEqualPrime, installmentsNumber, typeInstallments]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, Object.assign({
      style: _$$_REQUIRE(_dependencyMap[6]).styles.normalPrice,
      onPress: function onPress() {
        _EventProvider.default.logEvent('normal_price_box_click', {});
        _onPress('priceNormal');
      },
      disabled: isChecked
    }, (0, _testProps.default)('com.usereserva:id/select_box_price_normal'), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
        style: containerSelectBoxes,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[6]).styles.normalCheckBox,
          children: isChecked && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, Object.assign({
            style: _$$_REQUIRE(_dependencyMap[6]).styles.normalCheckBoxFill
          }, (0, _testProps.default)('com.usereserva:id/select_box_price_normal_checked')))
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[6]).styles.priceDataWrapper,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            fontFamily: "reservaSansRegular",
            style: _$$_REQUIRE(_dependencyMap[6]).styles.normalTextGray,
            children: "Pre\xE7o Normal"
          }), showInstallments && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[6]).styles.priceContainer,
            children: [showInstallments && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "reservaSansRegular",
              style: _$$_REQUIRE(_dependencyMap[6]).styles.normalText,
              children: [renderInstallments(), "x", ' ']
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              style: _$$_REQUIRE(_dependencyMap[6]).styles.integerPart,
              fontFamily: "reservaSansRegular",
              children: ["R$", ' ', `${(0, _$$_REQUIRE(_dependencyMap[9]).integerPart)(renderPrice())},`]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              style: _$$_REQUIRE(_dependencyMap[6]).styles.decimalPart,
              fontFamily: "reservaSansRegular",
              children: (0, _$$_REQUIRE(_dependencyMap[9]).decimalPart)(renderPrice())
            })]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: separator
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[6]).styles.priceDataWrapper,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
            style: pricesWrapper,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              style: [_$$_REQUIRE(_dependencyMap[6]).styles.integerPart, _$$_REQUIRE(_dependencyMap[6]).styles.normalTextBlack],
              fontFamily: "reservaSansRegular",
              children: ["R$", ' ', `${(0, _$$_REQUIRE(_dependencyMap[9]).integerPart)(price)},`]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              style: _$$_REQUIRE(_dependencyMap[6]).styles.normalTextBlack,
              fontWeight: "bold",
              fontFamily: "reservaSansRegular",
              children: (0, _$$_REQUIRE(_dependencyMap[9]).decimalPart)(price)
            })]
          })
        })]
      })
    }));
  }
