  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = CardCashback;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _IconWoodpecker = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CardCashback() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      balance = _useState2[0],
      setBalance = _useState2[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[8]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useCashbackLazyQuery = (0, _$$_REQUIRE(_dependencyMap[9]).useCashbackLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'cache-and-network'
      }),
      _useCashbackLazyQuery2 = (0, _slicedToArray2.default)(_useCashbackLazyQuery, 1),
      getCashback = _useCashbackLazyQuery2[0];
    var getCashbackData = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var _yield$getCashback = yield getCashback(),
          data = _yield$getCashback.data;
        if (!(data != null && data.cashback)) return;
        var wallet = data.cashback.wallet;
        setBalance(wallet == null ? undefined : wallet.balanceInCents);
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(error, {
          currentProfileDocument: profile == null ? undefined : profile.document
        });
      }
    }), [getCashback, profile]);
    (0, _react.useEffect)(function () {
      if (profile != null && profile.document) {
        getCashbackData();
      }
    }, [profile == null ? undefined : profile.document]);
    var handleClick = function handleClick() {
      _EventProvider.default.logEvent('click_card_cashback', {
        value: balance
      });
      navigation.navigate(_$$_REQUIRE(_dependencyMap[11]).MyCashbackScreensRoutes.MY_WALLET);
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsxs)(_reactNative.TouchableOpacity, {
      style: _$$_REQUIRE(_dependencyMap[13]).styles.card,
      onPress: handleClick,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[13]).styles.textsContainer,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[13]).styles.title,
          children: "Saldo Cashback"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[14]).PriceCustom, {
          fontFamily: _$$_REQUIRE(_dependencyMap[15]).FONTS.RESERVA_SANS_MEDIUM,
          sizeInteger: 12,
          sizeDecimal: 10,
          num: balance || 0,
          color: "white"
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_IconWoodpecker.default, {})]
    });
  }
