  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ListAddress;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _ListAddress = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _ListAddressItem = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _ModalConfirmDelete = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  /* eslint-disable no-param-reassign */

  function ListAddress(_ref) {
    var _ref$navigation = _ref.navigation,
      goBack = _ref$navigation.goBack,
      navigate = _ref$navigation.navigate,
      addListener = _ref$navigation.addListener;
    var animationValue = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[10]).useAuthStore)(['profile', 'onGetProfile']),
      profile = _useAuthStore.profile,
      onGetProfile = _useAuthStore.onGetProfile;
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[11]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showContent = _useState2[0],
      setShowContent = _useState2[1];
    var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      addressData = _useState4[0],
      setAddressData = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];
    var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      modalVisible = _useState8[0],
      setModalVisible = _useState8[1];
    var _useState9 = (0, _react.useState)(''),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      addressID = _useState10[0],
      setAddressID = _useState10[1];
    var _useState11 = (0, _react.useState)(false),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      isLoadCompleted = _useState12[0],
      setIsLoadCompleted = _useState12[1];
    var _useState13 = (0, _react.useState)(),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      mainAddress = _useState14[0],
      setMainAddress = _useState14[1];
    var toggleListItem = (0, _react.useCallback)(function () {
      _reactNative.Animated.timing(animationValue, {
        duration: 300,
        toValue: showContent ? 0 : 1,
        useNativeDriver: true
      }).start();
      _reactNative.LayoutAnimation.configureNext(_$$_REQUIRE(_dependencyMap[12]).toggleAnimation);
      setShowContent(!showContent);
    }, [animationValue, showContent]);
    var modalController = (0, _react.useCallback)(function (idAddress) {
      if (idAddress) {
        setAddressID(idAddress);
        setModalVisible(!modalVisible);
        return;
      }
      setModalVisible(!modalVisible);
    }, [modalVisible]);
    var _useProfileAddressRem = (0, _$$_REQUIRE(_dependencyMap[13]).useProfileAddressRemoveMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useProfileAddressRem2 = (0, _slicedToArray2.default)(_useProfileAddressRem, 1),
      removeAddress = _useProfileAddressRem2[0];
    var dropdownController = (0, _react.useCallback)(function (itemId) {
      toggleListItem();
      var arr = addressData;
      arr.forEach(function (element) {
        if (element.id === itemId) {
          element.selected = !element.selected;
        }
        if (element.id !== itemId) {
          element.selected = false;
        }
      });
      setAddressData((0, _toConsumableArray2.default)(arr));
    }, [addressData, toggleListItem]);
    var onGoToEditAddress = (0, _react.useCallback)(function (id) {
      navigate('CreateAddress', {
        id: id
      });
    }, [navigate]);
    var getAddresses = (0, _react.useCallback)(function () {
      var _profile$customFields, _profile$customFields2;
      var mainAddressProfile = profile == null ? undefined : (_profile$customFields = profile.customFields) == null ? undefined : (_profile$customFields2 = _profile$customFields.find(function (item) {
        return (item == null ? undefined : item.cacheId) === 'mainAddressId';
      })) == null ? undefined : _profile$customFields2.value;
      setMainAddress(mainAddressProfile);
      var arr = profile == null ? undefined : profile.addresses.slice().sort(function (itemA, itemB) {
        if ((itemA == null ? undefined : itemA.id) === mainAddressProfile) {
          return 1;
        }
        if ((itemB == null ? undefined : itemB.id) === mainAddressProfile) {
          return 1;
        }
        return 0;
      });
      var newArr = arr == null ? undefined : arr.map(function (element) {
        return Object.assign({}, element, {
          selected: false
        });
      });
      setAddressData(newArr);
    }, [profile == null ? undefined : profile.addresses, profile == null ? undefined : profile.customFields]);
    (0, _react.useEffect)(function () {
      getAddresses();
    }, [getAddresses]);
    var requestAddressList = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        setLoading(true);
        yield onGetProfile();
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(e);
      } finally {
        setLoading(false);
        setIsLoadCompleted(true);
      }
    }), [onGetProfile]);
    (0, _react.useEffect)(function () {
      if (isLoadCompleted && startLoadingTime > 0) onFinishLoad();
    }, [isLoadCompleted, onFinishLoad, startLoadingTime]);
    var onDeleteAddress = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (id) {
        try {
          setLoading(true);
          yield removeAddress({
            variables: {
              input: {
                addressId: id
              }
            }
          });
        } catch (err) {
          _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(err);
        } finally {
          setLoading(false);
          modalController();
          requestAddressList();
        }
      });
      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }(), [removeAddress, requestAddressList, modalController]);
    (0, _react.useEffect)(function () {
      var unsubscribe = addListener('focus', /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
        yield requestAddressList();
      }));
      return unsubscribe;
    }, [addListener, requestAddressList]);
    (0, _react.useEffect)(function () {
      _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
        goBack();
        return true;
      });
    }, [goBack]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.SafeAreaView, {
      style: _ListAddress.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).TopBarBackButton, {
        loading: loading,
        showShadow: true,
        backButtonPress: goBack
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.View, {
        style: _ListAddress.default.content,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, {
          style: _ListAddress.default.title,
          children: "Meus endere\xE7os"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.FlatList, {
        keyExtractor: function keyExtractor(item) {
          return String(item == null ? undefined : item.id);
        },
        data: addressData,
        renderItem: function renderItem(_ref5) {
          var item = _ref5.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_ListAddressItem.default, {
            mainAddress: mainAddress,
            item: item,
            animationListController: dropdownController,
            onNavigate: onGoToEditAddress,
            onShowModalConfirmDelete: modalController
          });
        },
        contentContainerStyle: _ListAddress.default.listContainer,
        ListEmptyComponent: loading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.ActivityIndicator, {
          size: "large",
          color: "#333333"
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, {
          testID: "com.usereserva:id/empty_list_message",
          style: _ListAddress.default.emptyListAddressText,
          children: "Voc\xEA ainda n\xE3o tem endere\xE7os cadastrados, clique em Novo Endere\xE7o e cadastre um"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.View, {
        style: _ListAddress.default.content,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/action_button_navigate_create_address'), {
          onPress: function onPress() {
            return navigate('CreateAddress');
          },
          style: _ListAddress.default.actionButton,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, {
            style: _ListAddress.default.actionButtonText,
            children: "novo endere\xE7o"
          })
        }))
      }), modalVisible && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_ModalConfirmDelete.default, {
        showModal: modalVisible,
        onCloseModal: modalController,
        onDeleteAddress: onDeleteAddress,
        addressID: addressID
      })]
    });
  }
