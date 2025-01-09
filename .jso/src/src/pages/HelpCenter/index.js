  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = HelpCenter;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _useAsyncStorageProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function HelpCenter(_ref) {
    var route = _ref.route;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[10]).useNavigation)();
    var _useHelpCenterStore = (0, _$$_REQUIRE(_dependencyMap[11]).useHelpCenterStore)(['actions', 'titleHelpCenter', 'loading', 'itemsHelpCenter']),
      actions = _useHelpCenterStore.actions,
      titleHelpCenter = _useHelpCenterStore.titleHelpCenter,
      loading = _useHelpCenterStore.loading,
      itemsHelpCenter = _useHelpCenterStore.itemsHelpCenter;
    var _useAsyncStorageProvi = (0, _useAsyncStorageProvider.default)(),
      getItem = _useAsyncStorageProvi.getItem;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[12]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];
    var loadingData = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      yield actions.INITIAL_LOADING();
    }), [actions]);
    (0, _react.useEffect)(function () {
      loadingData();
    }, []);
    (0, _react.useEffect)(function () {
      setFilter(itemsHelpCenter);
    }, [itemsHelpCenter]);
    var navigateGoBack = function navigateGoBack() {
      var _route$params;
      navigation.goBack();
      if ((route == null ? undefined : (_route$params = route.params) == null ? undefined : _route$params.comeFrom) === 'Menu') {
        navigation.navigate('Menu');
      }
    };
    var handleClickSession = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)(function* (_ref3) {
        var title = _ref3.title,
          data = _ref3.data,
          url = _ref3.url;
        if (title) {
          var ditoId = profile != null && profile.email ? yield getItem('@Dito:userRef') : yield _asyncStorage.default.getItem('@Dito:anonymousID');
          _EventProvider.default.sendTrackEvent('acessou-central-de-ajuda', {
            id: ditoId,
            action: 'acessou-central-de-ajuda',
            data: {
              pagina: title.toLowerCase()
            }
          });
        }
        if (url) {
          navigation.navigate('Exchange', {
            url: url
          });
        } else {
          if (!title || !data) return;
          navigation.navigate('PageHelpCenter', {
            title: title,
            data: data
          });
        }
      });
      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }(), []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.SafeAreaView, Object.assign({
      style: _styles.default.safeContainer
    }, (0, _testProps.default)('com.usereserva:id/help_center_container'), {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[14]).TopBarBackButton, {
        loading: loading,
        backButtonPress: function backButtonPress() {
          return navigateGoBack();
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.View, {
        style: _styles.default.mainContainer,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.View, {
          style: _styles.default.titleContainer,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.Text, {
            style: _styles.default.txtTitle,
            children: titleHelpCenter
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.View, {
          style: _styles.default.searchContainer,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[15]).SearchBar, {
            testID: "com.usereserva:id/help_center_input",
            height: 36,
            placeholder: "Buscar",
            onValueChange: function onValueChange(text) {
              var newFilter = itemsHelpCenter == null ? undefined : itemsHelpCenter.filter(function (item) {
                var _item$sessionTitle;
                var regex = new RegExp(text, 'gi');
                return (item == null ? undefined : (_item$sessionTitle = item.sessionTitle) == null ? undefined : _item$sessionTitle.match(regex)) != null;
              });
              setFilter(newFilter);
            }
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.ScrollView, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.View, {
            children: filter == null ? undefined : filter.map(function (item, index) {
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.View, {
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/item_list_help_center'), {
                  onPress: function onPress() {
                    var _item$sessionBodyColl;
                    return handleClickSession({
                      title: item.sessionTitle,
                      data: (_item$sessionBodyColl = item.sessionBodyCollection) == null ? undefined : _item$sessionBodyColl.items,
                      url: item.linkUrl
                    });
                  },
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.View, {
                    style: _styles.default.sessionTitleContainer,
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.View, {
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.Text, {
                        style: _styles.default.txtSessionTitle,
                        children: item.sessionTitle
                      })
                    })
                  })
                }), `item-list-${item.sessionTitle}`), index !== filter.length - 1 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Divider, {
                  variant: "fullWidth"
                })]
              }, `item-list-container-${item.sessionTitle}`);
            })
          })
        })]
      })]
    }));
  }
