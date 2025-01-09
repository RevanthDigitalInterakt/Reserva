  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MenuProfile = MenuProfile;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var React = _react;
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _firestore = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _ItemList = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _FormLink = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _CashBackBalance = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  var _excluded = ["profile"];
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function MenuProfile() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[13]).useNavigation)();
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      cashbackDropOpen = _useState2[0],
      setCashbackDropOpen = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      balanceCashbackInApp = _useState4[0],
      setBalanceCashbackInApp = _useState4[1];
    var _useState5 = (0, _react.useState)(),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      imageProfile = _useState6[0],
      setImageProfile = _useState6[1];
    var firebaseRef = new (_$$_REQUIRE(_dependencyMap[14]).FirebaseService)();
    var _useCheckConnection = (0, _$$_REQUIRE(_dependencyMap[15]).useCheckConnection)({}),
      WithoutInternet = _useCheckConnection.WithoutInternet;
    var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      hasThreeMonths = _useState8[0],
      setHasThreeMonths = _useState8[1];
    var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      setScreenCashbackInStoreActive = _useState10[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[16]).useAuthStore)(['profile', 'initialized']),
      profile = _useAuthStore.profile,
      authStore = (0, _objectWithoutProperties2.default)(_useAuthStore, _excluded);
    var _useAuthentication = (0, _$$_REQUIRE(_dependencyMap[17]).useAuthentication)({}),
      handleLogout = _useAuthentication.handleLogout;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[18]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean,
      getString = _useRemoteConfig.getString;
    var isLoading = (0, _react.useMemo)(function () {
      return !authStore.initialized;
    }, [authStore.initialized]);
    var showForm = (0, _react.useMemo)(function () {
      return getString('show_user_feedback_form');
    }, []);
    var setImageUrl = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (path) {
        try {
          if (!path) return;
          var response = yield firebaseRef.getUrlFS(path);
          setImageProfile(response);
        } catch (error) {
          _$$_REQUIRE(_dependencyMap[19]).ExceptionProvider.captureException(error);
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), [firebaseRef]);
    var onInitPage = (0, _react.useCallback)(function (initialized) {
      var _profile$customFields;
      if (!initialized) return;
      if (!(profile != null && profile.email)) {
        navigation.navigate('Login', {
          comeFrom: 'Profile'
        });
        return;
      }
      var image = profile == null ? undefined : (_profile$customFields = profile.customFields) == null ? undefined : _profile$customFields.find(function (item) {
        return (item == null ? undefined : item.key) === 'profileImagePath';
      });
      setImageUrl((image == null ? undefined : image.value) || '');
    }, [profile == null ? undefined : profile.email, profile == null ? undefined : profile.customFields, setImageUrl, navigation]);
    (0, _$$_REQUIRE(_dependencyMap[13]).useFocusEffect)((0, _react.useCallback)(function () {
      onInitPage(authStore.initialized);
    }, [authStore.initialized, onInitPage, profile]));
    var getIsScreenCashbackInStoreActive = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        var cashbackInStore = yield _$$_REQUIRE(_dependencyMap[20]).RemoteConfigService.getValue('FEATURE_CASHBACK_IN_STORE');
        setScreenCashbackInStoreActive(cashbackInStore);
      });
      return function getIsScreenCashbackInStoreActive() {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _$$_REQUIRE(_dependencyMap[13]).useFocusEffect)((0, _react.useCallback)(function () {
      var response = getBoolean('balance_cashback_in_app');
      setBalanceCashbackInApp(response);
      getIsScreenCashbackInStoreActive();
    }, []));
    (0, _react.useEffect)(function () {
      _EventProvider.default.logEvent('page_view', {
        item_brand: _$$_REQUIRE(_dependencyMap[21]).defaultBrand.picapau
      });
      _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack();
        return true;
      });
    }, [navigation]);
    var checkPhoneTime = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (userId) {
        var virifyPhoneCollection = (0, _firestore.default)().collection('verify-phone');
        var user = yield virifyPhoneCollection.where('userId', '==', userId).get();
        if (user.size > 0) {
          var _user$docs$;
          var serverDate = (_user$docs$ = user.docs[0]) == null ? undefined : _user$docs$.data().date.toDate().toISOString();
          var timeFirebase = _firestore.default.Timestamp.now().toDate();
          var differenceAmountInMonths = (0, _$$_REQUIRE(_dependencyMap[22]).differenceInMonths)(timeFirebase, new Date(serverDate));
          setHasThreeMonths(differenceAmountInMonths === 3);
        } else {
          setHasThreeMonths(true);
        }
      });
      return function checkPhoneTime(_x2) {
        return _ref3.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      if (profile != null && profile.id) {
        checkPhoneTime(profile == null ? undefined : profile.id);
      }
    }, [profile]);
    (0, _react.useEffect)(function () {
      _UxCam.default.tagScreen('Profile Screen');
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsxs)(_$$_REQUIRE(_dependencyMap[24]).Box, {
      flex: 1,
      backgroundColor: "white",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[25]).TopBarDefault, {
        loading: isLoading
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(WithoutInternet, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_reactNative.ScrollView, {
        showsVerticalScrollIndicator: false,
        children: !!profile && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsxs)(_$$_REQUIRE(_dependencyMap[24]).Box, {
          alignContent: "flex-start",
          pt: "xs",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsxs)(_$$_REQUIRE(_dependencyMap[24]).Box, {
            flexDirection: "row",
            alignItems: "center",
            paddingX: "xxxs",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              testID: "com.usereserva:id/menu_profile_avatar",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[26]).Avatar, Object.assign({
                imageStyle: {
                  width: 60,
                  height: 60,
                  borderRadius: 60
                },
                onPress: function onPress() {
                  _EventProvider.default.logEvent('profile_edit_click', {});
                  navigation.navigate('EditProfile');
                }
              }, imageProfile ? {
                imageSource: {
                  uri: imageProfile
                }
              } : {
                buttonEdit: true
              }))
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsxs)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              ml: "xxxs",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
                mb: "quarck",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[27]).Typography, {
                  variant: "tituloSessoes",
                  fontSize: 20,
                  children: "Perfil"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[27]).Typography, {
                variant: "subtituloSessoes",
                fontSize: 16,
                children: `Boas-vindas, ${profile.firstName || profile.email}.`
              })]
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
            style: {
              width: '88%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_CashBackBalance.default, {})
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsxs)(_$$_REQUIRE(_dependencyMap[24]).Box, {
            mt: "xxxs",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              paddingX: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_ItemList.default, {
                title: "Meus pedidos",
                descr: "Acompanhe seus pedidos",
                icon: "Handbag",
                onPress: function onPress() {
                  _EventProvider.default.logEvent('profile_my_orders_click', {});
                  navigation.navigate('OrderList');
                }
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              paddingX: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_ItemList.default, {
                title: "Favoritos",
                descr: "Veja os produtos que voc\xEA curtiu",
                icon: "Heart",
                onPress: function onPress() {
                  _EventProvider.default.logEvent('profile_favorites_click', {});
                  navigation.navigate('WishList');
                }
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              paddingX: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_ItemList.default, {
                title: "Minha conta",
                descr: "Visualize e edite suas informa\xE7\xF5es",
                icon: "Profile",
                onPress: function onPress() {
                  _EventProvider.default.logEvent('profile_my_account_click', {});
                  navigation.navigate('EditProfile');
                }
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              paddingX: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_ItemList.default, {
                title: "Meu Cashback",
                descr: "Veja sua carteira",
                icon: "Cashback",
                arrowDown: true,
                dropdownActive: cashbackDropOpen,
                onPress: function onPress() {
                  _EventProvider.default.logEvent('profile_my_cashback_click', {});
                  setCashbackDropOpen(!cashbackDropOpen);
                }
              })
            }), cashbackDropOpen && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              bg: "#F6F6F6",
              paddingX: "xxs",
              paddingY: "xxxs",
              testID: "com.usereserva:id/menu_profile_cash_back",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
                paddingX: "xxs",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[28]).TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/my_cashback_button'), {
                  onPress: function onPress() {
                    _EventProvider.default.logEvent('profile_my_portfolio_click', {});
                    navigation.navigate(_$$_REQUIRE(_dependencyMap[29]).MyCashbackScreensRoutes.MY_WALLET);
                  },
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[27]).Typography, {
                    fontFamily: "nunitoRegular",
                    fontSize: 14,
                    children: "Ver minha carteira"
                  })
                }))
              })
            }), balanceCashbackInApp && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              paddingX: "xxxs",
              testID: "com.usereserva:id/menu_profile_balance",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_ItemList.default, {
                title: "Meus cr\xE9ditos",
                descr: "Visualize seus cr\xE9ditos",
                icon: "Credit",
                onPress: function onPress() {
                  _EventProvider.default.logEvent('profile_my_credits_click', {});
                  navigation.navigate('credits');
                }
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              paddingX: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_ItemList.default, {
                title: "Meus endere\xE7os",
                descr: "Consulte e adicione seus endere\xE7os",
                icon: "Pin",
                onPress: function onPress() {
                  _EventProvider.default.logEvent('profile_my_addresses_click', {});
                  navigation.navigate('AddressList');
                }
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              paddingX: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_ItemList.default, {
                title: "Alterar senha",
                descr: "Altere a senha da sua conta",
                icon: "Lock",
                onPress: function onPress() {
                  _EventProvider.default.logEvent('profile_change_password_click', {});
                  navigation.navigate('EditPassword');
                }
              })
            }), showForm === 'profile' ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_FormLink.default, {}) : null, /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Box, {
              marginY: "xs",
              justifyContent: "flex-end",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(_$$_REQUIRE(_dependencyMap[30]).Button, {
                testID: "com.usereserva:id/profile_button_logout",
                width: 150,
                disabled: isLoading,
                onPress: function onPress() {
                  _EventProvider.default.logEvent('profile_logout_click', {});
                  handleLogout();
                },
                title: "LOGOUT",
                variant: "primarioEstreitoOutline"
              })
            })]
          })]
        })
      })]
    });
  }
