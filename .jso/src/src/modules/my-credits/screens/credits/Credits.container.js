  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CreditsContainer = CreditsContainer;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CreditsContainer(_ref) {
    var navigateBack = _ref.navigateBack;
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      creditsBalance = _useState2[0],
      setCreditsBalance = _useState2[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[5]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var convertCentsToReal = function convertCentsToReal(cents) {
      return cents / 100;
    };
    var getCreditBalance = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      if (!(profile != null && profile.document)) {
        return;
      }
      try {
        var customer = yield _$$_REQUIRE(_dependencyMap[6]).MyCreditsAPI.get(_$$_REQUIRE(_dependencyMap[6]).CashbackHttpUrl.GetCustomer, {
          cpf: profile == null ? undefined : profile.document
        });
        if (customer.data.SaldoMonetario) {
          setCreditsBalance(convertCentsToReal(Number(customer.data.SaldoMonetario)));
        }
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[7]).ExceptionProvider.captureException(error);
      }
    }), [profile]);
    (0, _react.useEffect)(function () {
      _EventProvider.default.logEvent('page_view', {
        item_brand: _$$_REQUIRE(_dependencyMap[8]).defaultBrand.picapau
      });
    }, []);
    (0, _react.useEffect)(function () {
      getCreditBalance();
    }, [getCreditBalance]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).TopBarBackButton, {
        loading: false,
        showShadow: true,
        backButtonPress: navigateBack
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).CreditsView, {
        creditsBalance: creditsBalance
      })]
    });
  }
