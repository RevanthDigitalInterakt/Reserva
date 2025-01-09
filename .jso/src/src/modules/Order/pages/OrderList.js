  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  var React = _react;
  var _reactNative = _$$_REQUIRE(_dependencyMap[6]);
  var _Order = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function OrderList() {
    var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      ordersList = _useState2[0],
      setOrdersList = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];
    var _useState5 = (0, _react.useState)(0),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      totalOrders = _useState6[0],
      setTotalOrders = _useState6[1];
    var _useState7 = (0, _react.useState)(1),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      page = _useState8[0],
      setPage = _useState8[1];
    var navigation = (0, _$$_REQUIRE(_dependencyMap[10]).useNavigation)();
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[11]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[12]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;
    var fetchOrders = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        if (!(profile != null && profile.email) || !(profile != null && profile.authCookie)) return;
        setLoading(true);
        var _yield$SearchNewOrder = yield (0, _$$_REQUIRE(_dependencyMap[13]).SearchNewOrders)(page.toString(), profile.email, profile.authCookie),
          data = _yield$SearchNewOrder.data;
        if (data) {
          setOrdersList([].concat((0, _toConsumableArray2.default)(ordersList), (0, _toConsumableArray2.default)(data.list)));
          setTotalOrders(data.paging.total);
          setPage(page + 1);
          setLoading(false);
        }
      });
      return function fetchOrders() {
        return _ref.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      _EventProvider.default.logEvent('page_view', {
        item_brand: _$$_REQUIRE(_dependencyMap[14]).defaultBrand.picapau
      });
      _UxCam.default.tagScreen('Orders Screen');
      _UxCam.default.logEvent('orders view');
      fetchOrders();
    }, []);
    (0, _react.useEffect)(function () {}, [totalOrders]);
    (0, _react.useEffect)(function () {}, [ordersList]);
    (0, _react.useEffect)(function () {
      _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack();
        return true;
      });
    }, []);
    (0, _react.useEffect)(function () {
      if (!loading && startLoadingTime > 0) {
        onFinishLoad();
      }
    }, [loading, onFinishLoad, startLoadingTime]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.SafeAreaView, {
      flex: 1,
      backgroundColor: "white",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).TopBarBackButton, {
        loading: loading,
        showShadow: true
      }), ordersList && ordersList.length > 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.FlatList, {
        onEndReached: function onEndReached() {
          if (ordersList.length !== totalOrders) {
            fetchOrders();
          }
        },
        onEndReachedThreshold: 0.1,
        ListHeaderComponent: function ListHeaderComponent() {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
            mb: "xs",
            paddingHorizontal: 20,
            justifyContent: "flex-start",
            paddingTop: "md",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Typography, {
              variant: "tituloSessoes",
              fontSize: 20,
              children: "Meus pedidos"
            })
          });
        },
        ListFooterComponent: function ListFooterComponent() {
          if (!loading) return null;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
            width: "100%",
            height: 80,
            color: "verdeSucesso",
            justifyContent: "center",
            alignItems: "center",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_lottieReactNative.default, {
              source: _$$_REQUIRE(_dependencyMap[19]).loadingSpinner,
              style: {
                width: 40
              },
              autoPlay: true,
              loop: true
            })
          });
        },
        data: ordersList,
        renderItem: function renderItem(_ref2) {
          var item = _ref2.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
            paddingX: "xxxs",
            bg: "white",
            width: "100%",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_Order.default, {
              data: item
            })
          });
        },
        keyExtractor: function keyExtractor(item) {
          return item.orderId.toString();
        }
      }), !loading && ordersList.length === 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Box, {
        flex: 1,
        alignItems: "center",
        paddingTop: "60%",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
          mx: 37,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Typography, {
            fontFamily: "reservaSerifRegular",
            fontSize: 23,
            children: "Voc\xEA ainda n\xE3o tem pedidos realizados :("
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
          mx: 58,
          my: 28,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 14,
            textAlign: "center",
            children: "Navegue pelo nosso app e compre os produtos que s\xE3o a sua cara!"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[20]).Button, {
          title: "NAVEGAR",
          variant: "primarioEstreito",
          width: 258,
          onPress: function onPress() {
            return navigation.navigate('Home');
          }
        })]
      })]
    });
  }
  var _default = exports.default = OrderList;
