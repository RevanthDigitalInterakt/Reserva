  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HomeTabs = HomeTabs;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _Home = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _ProductCatalog = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _WishList = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  var _WebViewFacaVoce = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[6]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[7]));
  var _OffersPage = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[8]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var Tab = (0, _$$_REQUIRE(_dependencyMap[10]).createBottomTabNavigator)();
  function HomeTabs() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[11]).useBagStore)(['rouletCoupon', 'actions']),
      rouletCoupon = _useBagStore.rouletCoupon,
      actions = _useBagStore.actions;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[12]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var showRoulet = getBoolean('show_roulet');
    var showLabelFacavc = getBoolean('show_label_facavc');
    var _useHomeStore = (0, _$$_REQUIRE(_dependencyMap[13]).useHomeStore)(['hasTabBar']),
      hasTabBar = _useHomeStore.hasTabBar;
    var showNewOffersPage = (0, _react.useMemo)(function () {
      return getBoolean('new_offers_page');
    }, [getBoolean]);
    var getOffersPage = (0, _react.useMemo)(function () {
      return showNewOffersPage ? _OffersPage.default : _ProductCatalog.default;
    }, [showNewOffersPage]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Modal, {
        description: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(_$$_REQUIRE(_dependencyMap[16]).BlockedRouletDescription, {
          onPress: function onPress() {
            return actions.UNBLOCK_ROULET_COUPON();
          }
        }),
        isVisible: rouletCoupon.blocked,
        handleClose: function handleClose() {
          return actions.UNBLOCK_ROULET_COUPON();
        },
        title: "Roleta Reserva"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(_reactNative.SafeAreaView, {
        style: {
          backgroundColor: _$$_REQUIRE(_dependencyMap[17]).theme.colors.white,
          marginBottom: hasTabBar ? 0 : -42
        },
        flex: 1,
        testID: "com.usereserva:id/home_tabs_buttons",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsxs)(Tab.Navigator, {
          tabBar: function tabBar(props) {
            return hasTabBar ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(_$$_REQUIRE(_dependencyMap[18]).TabBar, Object.assign({}, props)) : null;
          },
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(Tab.Screen, {
            name: "Home",
            component: _Home.default,
            initialParams: {
              label: 'Início'
            },
            options: {
              headerShown: false
            },
            listeners: {
              tabPress: function tabPress() {
                _EventProvider.default.logScreenViewEvent('/home');
                _EventProvider.default.logEvent('home_tab_click', {});
              }
            }
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(Tab.Screen, {
            name: "Offers",
            component: getOffersPage,
            listeners: {
              tabPress: function tabPress() {
                _EventProvider.default.logScreenViewEvent('/offers');
                _EventProvider.default.logEvent('offers_tab_click', {});
                _UxCam.default.tagScreen('Offers Screen');
              }
            },
            initialParams: {
              safeArea: false,
              label: 'Promoções'
            },
            options: {
              headerShown: false
            }
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(Tab.Screen, {
            name: "NewOffersPage",
            component: _OffersPage.default,
            listeners: {
              tabPress: function tabPress() {
                _EventProvider.default.logScreenViewEvent('/new-offers-page');
                _EventProvider.default.logEvent('new_offers_page_click', {});
              }
            },
            options: {
              headerShown: false
            }
          }), showRoulet ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(Tab.Screen, {
            name: "Roulet",
            component: _Home.default,
            initialParams: {
              label: 'Roleta'
            },
            listeners: {
              tabPress: function tabPress() {
                _EventProvider.default.logScreenViewEvent('/roulet');
                _EventProvider.default.logEvent('roulet_tab_click', {});
              }
            },
            options: {
              headerShown: false
            }
          }) : null, /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(Tab.Screen, {
            name: "WishList",
            component: _WishList.default,
            initialParams: {
              label: 'Favoritos'
            },
            options: {
              headerShown: false
            },
            listeners: {
              tabPress: function tabPress() {
                _EventProvider.default.logScreenViewEvent('/wishlist');
                _EventProvider.default.logEvent('wishlist_tab_click', {});
              }
            }
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(Tab.Screen, {
            name: "Profile",
            component: _$$_REQUIRE(_dependencyMap[19]).MenuProfile,
            initialParams: {
              label: 'Perfil'
            },
            options: {
              headerShown: false
            },
            listeners: {
              tabPress: function tabPress() {
                _EventProvider.default.logScreenViewEvent('/profile');
                _EventProvider.default.logEvent('profile_tab_click', {});
              }
            }
          }), !showRoulet ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(Tab.Screen, {
            name: "FacaVc",
            component: _WebViewFacaVoce.default,
            initialParams: {
              label: showLabelFacavc ? 'Faca.VC' : 'Personalize'
            },
            options: {
              headerShown: false
            },
            listeners: {
              tabPress: function tabPress() {
                _EventProvider.default.logScreenViewEvent('/facavc');
                if (showLabelFacavc) {
                  _EventProvider.default.logEvent('faca_vc_tab_click', {});
                  return;
                }
                _EventProvider.default.logEvent('personalize_tab_click', {});
              }
            }
          }) : null]
        })
      })]
    });
  }
