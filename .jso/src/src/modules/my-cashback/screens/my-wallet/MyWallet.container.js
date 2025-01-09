  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FilterOptions = exports.BalanceType = undefined;
  exports.MyWalletContainer = MyWalletContainer;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var FilterOptions = exports.FilterOptions = /*#__PURE__*/function (FilterOptions) {
    FilterOptions["ALL"] = "ALL";
    FilterOptions["CONFIRMED"] = "CONFIRMED";
    FilterOptions["EXPIRED"] = "EXPIRED";
    FilterOptions["PENDING"] = "PENDING";
    FilterOptions["CANCELED"] = "CANCELED";
    return FilterOptions;
  }({});
  var BalanceType = exports.BalanceType = /*#__PURE__*/function (BalanceType) {
    BalanceType["EXPIRE"] = "expire";
    BalanceType["ACTIVE"] = "active";
    BalanceType["FUTURE"] = "future";
    return BalanceType;
  }({});
  function MyWalletContainer(_ref) {
    var navigateBack = _ref.navigateBack;
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      balance = _useState2[0],
      setBalance = _useState2[1];
    var _useState3 = (0, _react.useState)(FilterOptions.ALL),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      operationFilter = _useState4[0],
      setOperationFilter = _useState4[1];
    var _useState5 = (0, _react.useState)(null),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      userOperations = _useState6[0],
      setUserOperations = _useState6[1];
    var _useState7 = (0, _react.useState)(null),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      userExpireBalance = _useState8[0],
      setUserExpireBalance = _useState8[1];
    var _useState9 = (0, _react.useState)(0),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      totalPending = _useState10[0],
      setTotalPending = _useState10[1];
    var _useState11 = (0, _react.useState)(null),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      userOperationsFiltered = _useState12[0],
      setUserOperationsFiltered = _useState12[1];
    var _useState13 = (0, _react.useState)(BalanceType.ACTIVE),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      selectedBalance = _useState14[0],
      setSelectedBalance = _useState14[1];
    var _useState15 = (0, _react.useState)(true),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      balanceVisible = _useState16[0],
      setBalanceVisible = _useState16[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[6]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[7]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;
    var _useCashbackLazyQuery = (0, _$$_REQUIRE(_dependencyMap[8]).useCashbackLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'cache-and-network'
      }),
      _useCashbackLazyQuery2 = (0, _slicedToArray2.default)(_useCashbackLazyQuery, 2),
      getCashback = _useCashbackLazyQuery2[0],
      loading = _useCashbackLazyQuery2[1].loading;
    var handleToggleBalanceVisibility = function handleToggleBalanceVisibility() {
      setBalanceVisible(!balanceVisible);
    };
    (0, _react.useEffect)(function () {
      _EventProvider.default.logEvent('page_view', {
        item_brand: _$$_REQUIRE(_dependencyMap[9]).defaultBrand.picapau
      });
    }, []);

    // covert cents to real
    var convertCentsToReal = function convertCentsToReal(cents) {
      var result = cents / 100;
      return result;
    };
    var changeOperationFilter = function changeOperationFilter(filter) {
      setOperationFilter(filter);
    };
    var changeSelectedBalance = function changeSelectedBalance(balanceChange) {
      if (balanceChange === BalanceType.FUTURE) {
        setOperationFilter(FilterOptions.PENDING);
      }
      setSelectedBalance(balanceChange);
    };
    var getCashbackData = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var _yield$getCashback = yield getCashback(),
          data = _yield$getCashback.data;
        if (!(data != null && data.cashback)) return;
        var _data$cashback = data == null ? undefined : data.cashback,
          wallet = _data$cashback.wallet,
          operations = _data$cashback.operations,
          expiration = _data$cashback.expiration;
        setBalance(wallet == null ? undefined : wallet.balanceInCents);
        setUserOperations(operations);
        setUserExpireBalance(expiration);
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(error, {
          currentProfileDocument: profile == null ? undefined : profile.document
        });
        _reactNative.Alert.alert('Ops!', 'Ocorreu um erro ao carregar o saldo de cashback.', [{
          text: 'Voltar',
          onPress: navigateBack
        }]);
      }
    }), [getCashback, profile]);
    (0, _react.useEffect)(function () {
      if (!loading && startLoadingTime > 0) {
        onFinishLoad();
      }
    }, [loading, startLoadingTime, onFinishLoad]);
    var operationsFiltered = function operationsFiltered(filter) {
      switch (filter) {
        case FilterOptions.ALL:
          return userOperations == null ? undefined : userOperations.filter(function (operation) {
            return (operation.appliedBalanceInCents > 0 || operation.cashbackAmountInCents > 0) && operation.status !== 'pending';
          });
        case FilterOptions.DEBIT:
          return userOperations == null ? undefined : userOperations.filter(function (operation) {
            return operation.appliedBalanceInCents > 0 && operation.status !== 'pending';
          });
        case FilterOptions.PENDING:
          var filtered = userOperations == null ? undefined : userOperations.filter(function (operation) {
            return operation.status === 'pending';
          });
          var initialValue = 0;
          var sumWithInitial = filtered == null ? undefined : filtered.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue.cashbackAmountInCents;
          }, initialValue);
          setTotalPending(sumWithInitial);
          return filtered;
        case FilterOptions.CREDIT:
          return userOperations == null ? undefined : userOperations.filter(function (operation) {
            return (operation == null ? undefined : operation.cashbackAmountInCents) > 0 && (operation == null ? undefined : operation.status) !== 'pending';
          });
        case FilterOptions.CONFIRMED:
          return userOperations == null ? undefined : userOperations.filter(function (operation) {
            return (operation == null ? undefined : operation.status) === 'available' || (operation == null ? undefined : operation.status) === 'fulfilled';
          });
        case FilterOptions.EXPIRED:
          return userOperations == null ? undefined : userOperations.filter(function (operation) {
            return (operation == null ? undefined : operation.status) === 'expired';
          });
        case FilterOptions.CANCELED:
          return userOperations == null ? undefined : userOperations.filter(function (operation) {
            return (operation == null ? undefined : operation.status) === 'canceled';
          });
        default:
          return userOperations == null ? undefined : userOperations.filter(function (operation) {
            return (operation == null ? undefined : operation.status) !== 'pending';
          });
      }
    };
    (0, _react.useEffect)(function () {
      if (profile != null && profile.document) {
        getCashbackData();
        var filtered = operationsFiltered(operationFilter);
        setUserOperationsFiltered(filtered);
      }
    }, [profile == null ? undefined : profile.document]);
    (0, _react.useEffect)(function () {
      var filtered = operationsFiltered(operationFilter);
      setUserOperationsFiltered(filtered);
    }, [userOperations, operationFilter]);
    var formatDate = function formatDate(date) {
      var dateFormated = new Date(date);
      var day = dateFormated.getDate();
      var month = (dateFormated.getMonth() + 1).toString().padStart(2, '0');
      var year = dateFormated.getFullYear();
      return `${day}/${month}/${year}`;
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).TopBarBackButton, {
        loading: loading,
        showShadow: true,
        backButtonPress: navigateBack
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).MyWalletView, {
        balanceVisible: balanceVisible,
        balance: balance,
        userOperationsFiltered: userOperationsFiltered,
        convertCentsToReal: convertCentsToReal,
        formatDate: formatDate,
        totalPending: totalPending,
        userExpireBalance: userExpireBalance,
        operationFilter: operationFilter,
        selectedBalance: selectedBalance,
        changeSelectedBalance: changeSelectedBalance,
        handleToggleBalanceVisibility: handleToggleBalanceVisibility,
        changeOperationFilter: changeOperationFilter
      })]
    });
  }
