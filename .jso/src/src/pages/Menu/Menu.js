  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeDeviceInfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _MenuItem = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _MenuFixedItem = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _MenuBreadcrumb = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _NewMenuFixedItem = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  var _FormLink = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[13]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[14]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Menu() {
    var _data$appMenu;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[15]).useNavigation)();
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isTesting = _useState2[0],
      setIsTesting = _useState2[1];
    var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      openedIndex = _useState4[0],
      setOpenedIndex = _useState4[1];
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[16]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[17]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[18]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean,
      getString = _useRemoteConfig.getString;
    var linkTo = (0, _$$_REQUIRE(_dependencyMap[15]).useLinkTo)();
    var showForm = (0, _react.useMemo)(function () {
      return getString('show_user_feedback_form');
    }, []);
    var showOnep5p = (0, _react.useMemo)(function () {
      return getBoolean('show_onep5p_menu');
    }, []);
    var _useAppMenuQuery = (0, _$$_REQUIRE(_dependencyMap[19]).useAppMenuQuery)({
        fetchPolicy: getFetchPolicyPerKey('appMenu'),
        notifyOnNetworkStatusChange: true,
        context: {
          clientName: 'gateway'
        }
      }),
      data = _useAppMenuQuery.data,
      loadingMenu = _useAppMenuQuery.loading;
    var regionalizationActive = (0, _react.useMemo)(function () {
      return getBoolean('regionalization');
    }, [getBoolean]);
    var trackEventAccessedDepartmentDito = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (openedCategories) {
        if (!openedCategories) return;
        var id = yield (0, _$$_REQUIRE(_dependencyMap[20]).getDitoUserID)(profile == null ? undefined : profile.email);
        _EventProvider.default.sendTrackEvent('acessou-departamento', {
          id: id,
          action: 'acessou-departamento',
          data: {
            nome_departamento: openedCategories,
            origem: 'app'
          }
        });
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), [profile == null ? undefined : profile.email]);
    var getTestEnvironment = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var res = yield _asyncStorage.default.getItem('isTesting');
      setIsTesting(res === 'true');
    }), []);
    var navigateFromMenu = (0, _react.useCallback)(function (routeName) {
      navigation.navigate(routeName, {
        comeFrom: 'Menu'
      });
    }, [navigation]);
    var onSelectFixedMenuItem = function onSelectFixedMenuItem(fixedMenuName) {
      _EventProvider.default.logEvent('item_fixed_menu', {
        itemName: fixedMenuName
      });
    };
    var onSelectMenuItem = (0, _react.useCallback)(function (index, selectedItem) {
      trackEventAccessedDepartmentDito(selectedItem.name);
      // TODO: ADICIONAR EVENTO DE CLIQUE NO MENU

      _EventProvider.default.logEvent(`item_menu-${selectedItem.name}`, {
        itemName: selectedItem.name
      });
      if (selectedItem.type === _$$_REQUIRE(_dependencyMap[19]).MenuItemTypeEnum.ParentCategory) {
        setOpenedIndex(openedIndex === index ? undefined : index);
        return;
      }
      _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.dispatch(_$$_REQUIRE(_dependencyMap[15]).StackActions.popToTop());
        navigation.navigate('Menu');
        return true;
      });
      if (selectedItem.type === _$$_REQUIRE(_dependencyMap[19]).MenuItemTypeEnum.Category || selectedItem.type === _$$_REQUIRE(_dependencyMap[19]).MenuItemTypeEnum.Collection) {
        var _selectedItem$filters, _selectedItem$filters2, _selectedItem$filters3, _selectedItem$filters4, _selectedItem$filters5, _selectedItem$filters6;
        var navigateParams = {
          facetInput: selectedItem.facets,
          referenceId: selectedItem.referenceId,
          title: selectedItem.name,
          comeFrom: 'Menu',
          indexMenuOpened: index
        };
        if (((_selectedItem$filters = selectedItem.filters) != null && (_selectedItem$filters2 = _selectedItem$filters.priceFilter) != null && _selectedItem$filters2.from || ((_selectedItem$filters3 = selectedItem.filters) == null ? undefined : (_selectedItem$filters4 = _selectedItem$filters3.priceFilter) == null ? undefined : _selectedItem$filters4.from) === null) && (_selectedItem$filters5 = selectedItem.filters) != null && (_selectedItem$filters6 = _selectedItem$filters5.priceFilter) != null && _selectedItem$filters6.to) {
          var _selectedItem$filters7, _selectedItem$filters8, _selectedItem$filters9, _selectedItem$filters10;
          navigateParams.filters = {
            priceFilter: {
              from: ((_selectedItem$filters7 = selectedItem.filters) == null ? undefined : (_selectedItem$filters8 = _selectedItem$filters7.priceFilter) == null ? undefined : _selectedItem$filters8.from) || 0,
              to: ((_selectedItem$filters9 = selectedItem.filters) == null ? undefined : (_selectedItem$filters10 = _selectedItem$filters9.priceFilter) == null ? undefined : _selectedItem$filters10.to) || 0
            }
          };
        }
        navigation.navigate('ProductCatalog', navigateParams);
        return;
      }
      if (selectedItem.type === _$$_REQUIRE(_dependencyMap[19]).MenuItemTypeEnum.Deeplink && selectedItem.deeplinkUrl) {
        var numberOfPathParams = 3;
        var facaVcPath = '/facavc/criar';
        var linkUrl;
        switch (true) {
          case selectedItem.deeplinkUrl.indexOf(facaVcPath) !== -1:
            linkUrl = (0, _$$_REQUIRE(_dependencyMap[21]).handlePathsParams)(selectedItem.deeplinkUrl, facaVcPath, numberOfPathParams);
            break;
          default:
            linkUrl = selectedItem.deeplinkUrl;
            break;
        }
        linkTo(linkUrl);
      }
    }, [linkTo, navigation, openedIndex, trackEventAccessedDepartmentDito]);
    (0, _react.useEffect)(function () {
      getTestEnvironment();
    }, [getTestEnvironment]);
    (0, _react.useEffect)(function () {
      _UxCam.default.tagScreen('Side Menu');
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_$$_REQUIRE(_dependencyMap[23]).SafeAreaView, Object.assign({
      style: {
        backgroundColor: _$$_REQUIRE(_dependencyMap[24]).theme.colors.white,
        flex: 1
      }
    }, (0, _testProps.default)('com.usereserva:id/menu_container'), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsxs)(_$$_REQUIRE(_dependencyMap[25]).Box, {
        flex: 1,
        backgroundColor: "backgroundApp",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_$$_REQUIRE(_dependencyMap[26]).TopBarMenu, {
          loading: loadingMenu
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsxs)(_reactNative.ScrollView, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_$$_REQUIRE(_dependencyMap[25]).Box, {
            paddingX: "nano",
            paddingTop: "micro"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_MenuBreadcrumb.default, {
            title: "P\xE1gina Inicial",
            onPress: function onPress() {
              return navigation.navigate('Home');
            }
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_$$_REQUIRE(_dependencyMap[27]).Divider, {
            variant: "fullWidth",
            marginBottom: "nano",
            marginTop: "nano"
          }), (data == null ? undefined : (_data$appMenu = data.appMenu) == null ? undefined : _data$appMenu.length) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsxs)(_$$_REQUIRE(_dependencyMap[22]).Fragment, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsxs)(_reactNative.View, {
              children: [data.appMenu.map(function (item, index) {
                return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_MenuItem.default, {
                  data: item,
                  onPress: function onPress(pressedItem) {
                    return onSelectMenuItem(index, pressedItem);
                  },
                  opened: openedIndex === index
                }, `${item.name}-${item.type}-${item.children.length}`);
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_$$_REQUIRE(_dependencyMap[27]).Divider, {
                variant: "fullWidth",
                marginBottom: "nano",
                marginTop: "nano"
              }), regionalizationActive && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_MenuFixedItem.default, {
                iconName: "Pin",
                testID: "com.usereserva:id/menu_button_cep",
                title: "Inserir ou alterar CEP",
                onPress: function onPress() {
                  navigation.navigate('ChangeRegionalization');
                  onSelectFixedMenuItem('Inserir ou alterar CEP');
                }
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_NewMenuFixedItem.default, {
                iconName: "profile",
                testID: "com.usereserva:id/menu_button_account",
                title: profile != null && profile.email ? `Olá, ${(profile == null ? undefined : profile.firstName) || (profile == null ? undefined : profile.email)}` : 'Acessar Conta',
                onPress: function onPress() {
                  onSelectFixedMenuItem('perfil');
                  if (profile != null && profile.email) {
                    navigation.navigate('Profile');
                    return;
                  }
                  navigation.navigate('Login', {
                    comeFrom: 'Profile'
                  });
                }
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_NewMenuFixedItem.default, {
                iconName: "heart",
                testID: "com.usereserva:id/menu_button_favorites",
                title: "Favoritos",
                onPress: function onPress() {
                  navigation.navigate('WishList');
                  onSelectFixedMenuItem('favoritos');
                }
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_NewMenuFixedItem.default, {
                iconName: "faq",
                testID: "com.usereserva:id/menu_button_callcenter",
                title: "D\xFAvidas Frequentes",
                onPress: function onPress() {
                  onSelectFixedMenuItem('faq');
                  navigateFromMenu('HelpCenter');
                }
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_NewMenuFixedItem.default, {
                iconName: "chat",
                testID: "com.usereserva:id/menu_button_callcenter",
                title: "Central de Atendimento",
                onPress: function onPress() {
                  onSelectFixedMenuItem('chat');
                  navigateFromMenu('CallCenter');
                }
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_NewMenuFixedItem.default, {
                iconName: "pinPlace",
                testID: "com.usereserva:id/menu_button_stores",
                title: "Lojas",
                onPress: function onPress() {
                  onSelectFixedMenuItem('lojas');
                  _reactNative.Linking.openURL('https://whts.co/reserva');
                }
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_NewMenuFixedItem.default, {
                iconName: "document",
                testID: "com.usereserva:id/menu_button_privacy",
                title: "Pol\xEDtica de Privacidade",
                onPress: function onPress() {
                  onSelectFixedMenuItem('politica-privacidade');
                  navigateFromMenu('PrivacyPolicy');
                }
              }), showOnep5p && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_NewMenuFixedItem.default, {
                iconName: "cutlery",
                testID: "com.usereserva:id/menu_button_privacy",
                title: "1P=5P",
                onPress: function onPress() {
                  onSelectFixedMenuItem('1P=5P');
                  navigation.navigate('PageOneP5P', {
                    comeFrom: 'Menu'
                  });
                }
              })]
            }), showForm === 'menu' ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsxs)(_$$_REQUIRE(_dependencyMap[22]).Fragment, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_$$_REQUIRE(_dependencyMap[27]).Divider, {
                variant: "fullWidth",
                marginBottom: "nano",
                marginTop: "xxs",
                marginX: "micro"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_FormLink.default, {})]
            }) : null]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_$$_REQUIRE(_dependencyMap[25]).Box, {
            mt: "xs",
            alignItems: "center",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[22]).jsx)(_$$_REQUIRE(_dependencyMap[28]).Typography, {
              color: "neutroFrio2",
              fontFamily: "nunitoRegular",
              fontSize: 11,
              children: `Versão ${_reactNativeDeviceInfo.default.getVersion()} ${isTesting ? ' - Teste' : ''}`
            })
          })]
        })]
      })
    }));
  }
  var _default = exports.default = Menu;
