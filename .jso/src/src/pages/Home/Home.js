  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeDeviceInfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _dayjs = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _timezone = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _utc = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _AbandonedCart = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _NewBanner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _ModalSignUpComplete = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _OneP5P = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[13]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[14]));
  var _useAuthModalStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[15]));
  var _useHomeHeader2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[16]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[17]));
  var _ShowcaseDrawerContent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[18]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[19]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  _dayjs.default.extend(_utc.default);
  _dayjs.default.extend(_timezone.default);
  function RouletWebview() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[20]).useBagStore)(['actions', 'rouletIsOpen', 'rouletIsLoading']),
      actions = _useBagStore.actions,
      rouletIsOpen = _useBagStore.rouletIsOpen,
      rouletIsLoading = _useBagStore.rouletIsLoading;
    var onHandleMessage = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (ev) {
        var _ev$nativeEvent;
        actions.SET_ROULET_LOADING(false);
        if (ev != null && (_ev$nativeEvent = ev.nativeEvent) != null && _ev$nativeEvent.data) {
          var _ev$nativeEvent2, _parsed$data, _parsed$data$reward;
          var parsed = JSON.parse(ev == null ? undefined : (_ev$nativeEvent2 = ev.nativeEvent) == null ? undefined : _ev$nativeEvent2.data);
          if (parsed != null && (_parsed$data = parsed.data) != null && (_parsed$data$reward = _parsed$data.reward) != null && _parsed$data$reward.code) {
            var _parsed$data2, _parsed$data2$reward, _parsed$data3, _parsed$data3$reward, _parsed$data4;
            actions.SAVE_ROULET_COUPON(parsed == null ? undefined : (_parsed$data2 = parsed.data) == null ? undefined : (_parsed$data2$reward = _parsed$data2.reward) == null ? undefined : _parsed$data2$reward.code, parsed == null ? undefined : parsed.timestamp);
            yield _asyncStorage.default.setItem('rouletCoupon', JSON.stringify({
              code: parsed == null ? undefined : (_parsed$data3 = parsed.data) == null ? undefined : (_parsed$data3$reward = _parsed$data3.reward) == null ? undefined : _parsed$data3$reward.code,
              timestamp: parsed == null ? undefined : parsed.timestamp,
              blocked: false
            }));
            if ((parsed == null ? undefined : (_parsed$data4 = parsed.data) == null ? undefined : _parsed$data4.closeMethod) === 'button-click') {
              actions.CLOSE_ROULET();
            }
          }
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), []);
    var webViewUri = (0, _react.useMemo)(function () {
      return `https://www.usereserva.com/files/popconvert.html?${new Date().getTime()}`;
    }, []);
    (0, _react.useEffect)(function () {
      setTimeout(function () {
        actions.SET_ROULET_LOADING(false);
      }, 5000);
    }, [rouletIsOpen]);
    return rouletIsOpen ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
      style: _styles.default.rouletWrapper,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[22]).WebView, {
        source: {
          uri: webViewUri
        },
        javaScriptEnabled: true,
        style: _styles.default.webView,
        cacheEnabled: false,
        cacheMode: "LOAD_NO_CACHE",
        onMessage: function onMessage(event) {
          onHandleMessage(event);
        },
        injectedJavaScript: `
          (function() {
            // Listener para capturar mensagens enviadas pelo React Native
            document.addEventListener('message', function(event) {
              console.log('Message from React Native:', event.data);
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'window-event',
                data: event
              }));
            });
      
            // Listener para capturar mensagens do escopo global (window)
            window.addEventListener('message', function(event) {
              console.log('Window message:', event.data);
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'window-event',
                data: event
              }));
            });
      
            // Enviar mensagem de inicialização para testar conexão
            setTimeout(function() {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'init',
                message: 'WebView initialized successfully'
              }));
            }, 1000);
          })();
          true; // Assegura que o script é validado no Android
        `
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
        style: [{
          display: rouletIsLoading ? 'flex' : 'none'
        }, _styles.default.loaderWrapper],
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.ActivityIndicator, {
          color: _$$_REQUIRE(_dependencyMap[23]).COLORS.RED,
          size: "large"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.TouchableOpacity, {
        style: _styles.default.closeButton,
        onPress: function onPress() {
          return actions.CLOSE_ROULET();
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
          style: _styles.default.closeButtonText,
          children: "Fechar"
        })
      })]
    }) : null;
  }
  function ListHeader() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
      style: {
        overflow: 'hidden'
      },
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[25]).NewHomeCarousels, {})
    });
  }
  function ListFooter() {
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[26]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var showOneP5P = getBoolean('show_onep5p_home');
    var showAbandonedCart = getBoolean('show_abandoned_cart');
    var _useBagStore2 = (0, _$$_REQUIRE(_dependencyMap[20]).useBagStore)(['allItemsQuantity']),
      allItemsQuantity = _useBagStore2.allItemsQuantity;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
      children: [allItemsQuantity > 0 && showAbandonedCart && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_AbandonedCart.default, {}), showOneP5P && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_OneP5P.default, {
        comingFrom: "home"
      })]
    });
  }
  function Home() {
    var _useHomeStore = (0, _$$_REQUIRE(_dependencyMap[27]).useHomeStore)(['onLoad', 'medias', 'loading', 'shelfOffers', 'setHasTabBar']),
      onLoad = _useHomeStore.onLoad,
      medias = _useHomeStore.medias,
      loading = _useHomeStore.loading,
      shelfOffers = _useHomeStore.shelfOffers,
      setHasTabBar = _useHomeStore.setHasTabBar;
    var _useBagStore3 = (0, _$$_REQUIRE(_dependencyMap[20]).useBagStore)(['rouletIsOpen']),
      rouletIsOpen = _useBagStore3.rouletIsOpen;
    var _useAuthModalStore = (0, _useAuthModalStore2.default)(['showModalSignUpComplete']),
      showModalSignUpComplete = _useAuthModalStore.showModalSignUpComplete;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[28]).useProductDetailStore)(['drawerIsOpen']),
      drawerIsOpen = _useProductDetailStor.drawerIsOpen;
    var _useShelfStore = (0, _$$_REQUIRE(_dependencyMap[29]).useShelfStore)(['shelfItemData']),
      shelfItemData = _useShelfStore.shelfItemData;
    var _useShelfOffersStore = (0, _$$_REQUIRE(_dependencyMap[30]).useShelfOffersStore)(['onLoadOffersShelf']),
      onLoadOffersShelf = _useShelfOffersStore.onLoadOffersShelf;
    var _useRemoteConfig2 = (0, _$$_REQUIRE(_dependencyMap[26]).useRemoteConfig)(),
      getString = _useRemoteConfig2.getString;
    var _useHomeHeader = (0, _useHomeHeader2.default)(),
      handleScroll = _useHomeHeader.handleScroll,
      topBarDefaultAnimated = _useHomeHeader.topBarDefaultAnimated,
      transparentTopBarAnimated = _useHomeHeader.transparentTopBarAnimated,
      whiteTopBarAnimated = _useHomeHeader.whiteTopBarAnimated;
    (0, _react.useEffect)(function () {
      var doRequest = /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)(function* () {
          return onLoad();
        });
        return function doRequest() {
          return _ref2.apply(this, arguments);
        };
      }();
      doRequest();
    }, []);
    (0, _react.useEffect)(function () {
      if (shelfOffers) {
        onLoadOffersShelf(shelfOffers);
      }
    }, [shelfOffers]);
    (0, _react.useEffect)(function () {
      _$$_REQUIRE(_dependencyMap[31]).trackPageViewStore.getState().onTrackPageView('home', _$$_REQUIRE(_dependencyMap[32]).TrackPageTypeEnum.Home);
      _EventProvider.default.logEvent('page_view', {
        item_brand: _$$_REQUIRE(_dependencyMap[33]).defaultBrand.picapau
      });
      _reactNativeDeviceInfo.default.isLocationEnabled().then(function (enabled) {
        _EventProvider.default.logEvent('device_info', {
          locationEnabled: enabled ? 'enabled' : 'disabled'
        });
      });
      _UxCam.default.tagScreen('Home Screen');
    }, []);
    (0, _react.useEffect)(function () {
      if (rouletIsOpen) {
        setHasTabBar(false);
      } else {
        setHasTabBar(true);
      }
    }, [rouletIsOpen]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_$$_REQUIRE(_dependencyMap[21]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[34]).ActivityTracking, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_$$_REQUIRE(_dependencyMap[24]).Box, Object.assign({
        flex: 1,
        bg: "white"
      }, (0, _testProps.default)('home_container'), {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Animated.View, {
          style: [_styles.default.topBarDefault, topBarDefaultAnimated],
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[35]).TopBarDefault, {})
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Animated.View, {
          style: [_styles.default.transparentTopBar, transparentTopBarAnimated],
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[36]).NewTransparentTopBarDefault, {})
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Animated.View, {
          style: [_styles.default.whiteTopBar, whiteTopBarAnimated],
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[37]).NewWhiteTopBarDefault, {})
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.SafeAreaView, Object.assign({}, (0, _testProps.default)('home_count_down_container'), {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(RouletWebview, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.FlatList, {
            ListHeaderComponent: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(ListHeader, {}),
            bounces: true,
            onScroll: handleScroll,
            contentContainerStyle: {
              paddingBottom: 100
            },
            keyExtractor: function keyExtractor(item, index) {
              return index === 2 && getString('count_down_position') === 'B' ? 'home-carousel' : `home-media-${item.image.url.toString()}-${item.image.title}=${index}`;
            },
            data: medias,
            renderItem: function renderItem(_ref3) {
              var _item$headerImage3;
              var item = _ref3.item,
                index = _ref3.index;
              if (index === 2 && getString('count_down_position') === 'B') {
                var _item$headerImage;
                return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_$$_REQUIRE(_dependencyMap[21]).Fragment, {
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[38]).NewHomeCountDown, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_NewBanner.default, {
                    facets: item.facets,
                    image: item.image.url,
                    orderBy: item.orderBy,
                    reference: item == null ? undefined : item.reference,
                    reservaMini: item.reservaMini,
                    deepLinkNewsletter: item == null ? undefined : item.deepLinkNewsletter,
                    deepLink: item == null ? undefined : item.deepLink,
                    headerImageUrl: item == null ? undefined : (_item$headerImage = item.headerImage) == null ? undefined : _item$headerImage.url
                  })]
                });
              }
              if (index === medias.length - 1 && getString('count_down_position') === 'C') {
                var _item$headerImage2;
                return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_$$_REQUIRE(_dependencyMap[21]).Fragment, {
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_NewBanner.default, {
                    facets: item.facets,
                    image: item.image.url,
                    orderBy: item.orderBy,
                    reference: item == null ? undefined : item.reference,
                    reservaMini: item.reservaMini,
                    deepLinkNewsletter: item == null ? undefined : item.deepLinkNewsletter,
                    deepLink: item == null ? undefined : item.deepLink,
                    headerImageUrl: item == null ? undefined : (_item$headerImage2 = item.headerImage) == null ? undefined : _item$headerImage2.url
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[38]).NewHomeCountDown, {})]
                });
              }
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_NewBanner.default, {
                facets: item.facets,
                image: item.image.url,
                orderBy: item.orderBy,
                reference: item == null ? undefined : item.reference,
                reservaMini: item.reservaMini,
                deepLinkNewsletter: item == null ? undefined : item.deepLinkNewsletter,
                deepLink: item == null ? undefined : item.deepLink,
                headerImageUrl: item == null ? undefined : (_item$headerImage3 = item.headerImage) == null ? undefined : _item$headerImage3.url
              });
            },
            ListFooterComponent: !loading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(ListFooter, {}) : null
          })]
        })), !!showModalSignUpComplete && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_ModalSignUpComplete.default, {})]
      })), drawerIsOpen && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[39]).Drawer, {
        isOpen: drawerIsOpen,
        snapPoints: ['10%', '53%'],
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_ShowcaseDrawerContent.default, {
          productData: shelfItemData
        })
      })]
    });
  }
  var _default = exports.default = Home;
