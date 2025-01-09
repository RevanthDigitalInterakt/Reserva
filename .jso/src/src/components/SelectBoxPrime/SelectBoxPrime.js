  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SelectBoxPrime = SelectBoxPrime;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function SelectBoxPrime(_ref) {
    var installment = _ref.installment,
      isChecked = _ref.isChecked,
      _onPress = _ref.onPress,
      _ref$price = _ref.price,
      price = _ref$price === undefined ? 0 : _ref$price,
      savedValue = _ref.savedValue;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[5]).useRemoteConfig)(),
      getString = _useRemoteConfig.getString;
    var typeInstallments = (0, _react.useMemo)(function () {
      return getString('installments_prime');
    }, [getString]);
    var containerSelectBoxes = _reactNative.StyleSheet.flatten([_$$_REQUIRE(_dependencyMap[6]).styles.checkBoxContainer, typeInstallments === 'hide_installments' ? _$$_REQUIRE(_dependencyMap[6]).styles.start : _$$_REQUIRE(_dependencyMap[6]).styles.between, typeInstallments === 'hide_installments' && _$$_REQUIRE(_dependencyMap[6]).styles.minHeight]);
    var containerPrices = _reactNative.StyleSheet.flatten([_$$_REQUIRE(_dependencyMap[6]).styles.priceDataWrapper, typeInstallments === 'hide_installments' && _$$_REQUIRE(_dependencyMap[6]).styles.ml]);
    var separator = _reactNative.StyleSheet.flatten([_$$_REQUIRE(_dependencyMap[6]).styles.separator, typeInstallments === 'hide_installments' ? _$$_REQUIRE(_dependencyMap[6]).styles.mDefault : _$$_REQUIRE(_dependencyMap[6]).styles.mt]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.TouchableOpacity, Object.assign({
      style: _$$_REQUIRE(_dependencyMap[6]).styles.primePrice,
      onPress: function onPress() {
        _EventProvider.default.logEvent('prime_price_box_click', {});
        _onPress('pricePrime');
      },
      disabled: isChecked
    }, (0, _testProps.default)('select_box_price_prime'), {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
        style: containerSelectBoxes,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[6]).styles.primeCheckBox,
          children: isChecked && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, Object.assign({
            style: _$$_REQUIRE(_dependencyMap[6]).styles.primeCheckBoxFill
          }, (0, _testProps.default)('select_box_price_prime_checked')))
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: containerPrices,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            fontFamily: "reservaSansRegular",
            style: _$$_REQUIRE(_dependencyMap[6]).styles.normalTextRed,
            children: ["Clientes", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "descontoTag2",
              fontSize: 20,
              children: [' ', "Prime"]
            })]
          }), typeInstallments !== 'hide_installments' && installment && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[6]).styles.priceContainer,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "reservaSansRegular",
              style: _$$_REQUIRE(_dependencyMap[6]).styles.normalTextRed,
              children: [installment == null ? undefined : installment.number, "x", ' ']
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              style: _$$_REQUIRE(_dependencyMap[6]).styles.integerPartPrime,
              fontFamily: "reservaSansRegular",
              children: ["R$", ' ', `${(0, _$$_REQUIRE(_dependencyMap[9]).integerPart)(installment.value)},`]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              style: _$$_REQUIRE(_dependencyMap[6]).styles.decimalText,
              fontWeight: "bold",
              fontFamily: "reservaSansRegular",
              children: (0, _$$_REQUIRE(_dependencyMap[9]).decimalPart)(installment.value)
            })]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: separator
        }), typeInstallments !== 'hide_installments' && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[6]).styles.priceDataEconomy,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.ImageBackground, {
            source: _$$_REQUIRE(_dependencyMap[10]),
            resizeMode: "cover",
            style: _$$_REQUIRE(_dependencyMap[6]).styles.imageBackgroundBadge,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "reservaSansItalic",
              style: _$$_REQUIRE(_dependencyMap[6]).styles.textRedBadge,
              children: ["Economize", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
                fontFamily: "reservaSansRegular",
                style: {
                  fontWeight: 'bold'
                },
                children: [' ', "R$", savedValue.toFixed(2)]
              })]
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
            style: [_$$_REQUIRE(_dependencyMap[6]).styles.priceContainer, _$$_REQUIRE(_dependencyMap[6]).styles.negativeMarginText],
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              style: _$$_REQUIRE(_dependencyMap[6]).styles.integerPartPrime,
              fontFamily: "reservaSansRegular",
              children: ["R$", ' ', `${(0, _$$_REQUIRE(_dependencyMap[9]).integerPart)(price)},`]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              style: _$$_REQUIRE(_dependencyMap[6]).styles.decimalText,
              fontWeight: "bold",
              fontFamily: "reservaSansRegular",
              children: (0, _$$_REQUIRE(_dependencyMap[9]).decimalPart)(price)
            })]
          })]
        }), typeInstallments === 'hide_installments' && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            style: _$$_REQUIRE(_dependencyMap[6]).styles.integerPartPrime,
            fontFamily: "reservaSansRegular",
            children: ["R$", ' ', `${(0, _$$_REQUIRE(_dependencyMap[9]).integerPart)(price)},`]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            style: _$$_REQUIRE(_dependencyMap[6]).styles.decimalText,
            fontWeight: "bold",
            fontFamily: "reservaSansRegular",
            children: (0, _$$_REQUIRE(_dependencyMap[9]).decimalPart)(price)
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[6]).styles.bePrimeBadge,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
          fontFamily: "reservaSansRegular",
          style: _$$_REQUIRE(_dependencyMap[6]).styles.textWhite,
          children: ["Seja", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            variant: "descontoTag2",
            fontSize: 18,
            children: [' ', "Prime"]
          })]
        })
      })]
    }));
  }
