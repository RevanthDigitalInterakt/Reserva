  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Credits = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var Credits = exports.Credits = function Credits(_ref) {
    var navigation = _ref.navigation;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[5]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loadingCredit = _useState2[0],
      setLoadingCredit = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isAcceptedConditions = _useState4[0],
      setIsAcceptConditions = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      cashbackInStore = _useState6[0],
      setCashbackInStore = _useState6[1];
    var _useState7 = (0, _react.useState)(),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      profile = _useState8[0],
      setProfile = _useState8[1];
    var _useState9 = (0, _react.useState)(0),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      credit = _useState10[0],
      setCredit = _useState10[1];
    var _useState11 = (0, _react.useState)({
        loading: true,
        data: {}
      }),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      _useState12$ = _useState12[0],
      data = _useState12$.data,
      loading = _useState12$.loading,
      setProfileData = _useState12[1];
    var _useLazyQuery = (0, _$$_REQUIRE(_dependencyMap[6]).useLazyQuery)(_$$_REQUIRE(_dependencyMap[7]).profileQuery),
      _useLazyQuery2 = (0, _slicedToArray2.default)(_useLazyQuery, 1),
      getProfile = _useLazyQuery2[0];
    (0, _react.useEffect)(function () {
      getProfile().then(function (response) {
        return setProfileData({
          loading: false,
          data: response.data
        });
      });
    }, []);
    (0, _react.useEffect)(function () {
      _$$_REQUIRE(_dependencyMap[8]).StorageService.getItem({
        key: _$$_REQUIRE(_dependencyMap[8]).StorageServiceKeys.PROFILE,
        isJSON: true
      }).then(function (value) {
        setProfile(value);
      });
    }, [data]);
    (0, _react.useEffect)(function () {
      setCashbackInStore(getBoolean('cashback_in_store'));
    }, []);
    var getCustomer = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        if (profile) {
          setLoadingCredit(true);
          return _$$_REQUIRE(_dependencyMap[9]).cashbackService.getCustomer(profile.document).then(function (response) {
            setIsAcceptConditions(response.data.Fidelizado);
            setCredit(response.data.SaldoMonetario);
            setLoadingCredit(false);
          });
        }
      });
      return function getCustomer() {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      getCustomer();
    }, [profile]);
    (0, _react.useEffect)(function () {
      _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack();
        return true;
      });
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).SafeAreaView, {
      flex: 1,
      backgroundColor: "white",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).TopBarBackButton, {
        loading: loading || loadingCredit,
        showShadow: true,
        backButtonPress: function backButtonPress() {
          return navigation.goBack();
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
        mx: 20,
        mt: "sm",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
          mb: "nano",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
            variant: "tituloSessoes",
            children: "Meus cr\xE9ditos"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
          fontFamily: "nunitoRegular",
          fontSize: 14,
          children: "Use o cr\xE9dito na sua pr\xF3xima compra. Ele aparecer\xE1 automaticamente no ato do pagamento."
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
          mt: 20,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Divider, {
            variant: "fullWidth"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            py: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              variant: "subtituloSessoes",
              children: "Cr\xE9ditos e cashback"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[16]).PriceCustom, {
              fontFamily: "nunitoBold",
              num: credit,
              sizeDecimal: 13,
              sizeInterger: 20
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Divider, {
            variant: "fullWidth"
          }), cashbackInStore && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            flexDirection: "row",
            mt: "xxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Button, {
              flexDirection: "row",
              onPress: function onPress() {
                navigation.navigate('Cashback', {
                  isAcceptedConditions: isAcceptedConditions
                });
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Fragment, {
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
                  name: "Cashback",
                  size: 20,
                  color: "preto",
                  mr: "xxxs"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                  fontFamily: "nunitoBold",
                  fontSize: 16,
                  children: "Cashback em Lojas"
                })]
              })
            })
          })]
        })]
      })]
    });
  };
