  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _formatString = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var useController = function useController() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)();
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loadingStatusBar = _useState2[0],
      setLoadingStatusBar = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isVisibleDeleteModal = _useState4[0],
      setIsVisibleDeleteModal = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isVisibleSuccessModal = _useState6[0],
      setIsVisibleSuccessModal = _useState6[1];
    var _useState7 = (0, _react.useState)(''),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      addressId = _useState8[0],
      setAddressId = _useState8[1];
    var _useState9 = (0, _react.useState)(null),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      selectedAddress = _useState10[0],
      setSelectedAddress = _useState10[1];
    var _useState11 = (0, _react.useState)(false),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      hasDeleteAddressError = _useState12[0],
      setHasDeleteAddressError = _useState12[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[7]).useAuthStore)(['profile', 'onGetProfile']),
      profile = _useAuthStore.profile,
      onGetProfile = _useAuthStore.onGetProfile;
    var _useState13 = (0, _react.useState)(false),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      isLoadCompleted = _useState14[0],
      setIsLoadCompleted = _useState14[1];
    var _useProfileAddressRem = (0, _$$_REQUIRE(_dependencyMap[8]).useProfileAddressRemoveMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useProfileAddressRem2 = (0, _slicedToArray2.default)(_useProfileAddressRem, 1),
      profileAddressRemove = _useProfileAddressRem2[0];
    var goBack = function goBack() {
      return navigation.goBack();
    };
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[9]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;
    var requestAddressList = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        setLoadingStatusBar(true);
        yield onGetProfile();
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(e);
      } finally {
        setLoadingStatusBar(false);
        setIsLoadCompleted(true);
      }
    }), []);
    (0, _react.useEffect)(function () {
      if (isLoadCompleted && startLoadingTime > 0) onFinishLoad();
    }, [isLoadCompleted, onFinishLoad, startLoadingTime]);
    var openSuccessModal = (0, _react.useCallback)(function () {
      setIsVisibleSuccessModal(true);
    }, []);
    var closeSuccessModal = (0, _react.useCallback)(function () {
      setIsVisibleSuccessModal(false);
    }, []);
    var closeDeleteModal = (0, _react.useCallback)(function () {
      setIsVisibleDeleteModal(false);
    }, []);
    var openModalDeleteAddress = (0, _react.useCallback)(function (id) {
      setIsVisibleDeleteModal(true);
      setAddressId(id);
    }, []);
    var openErrorModal = (0, _react.useCallback)(function () {
      setHasDeleteAddressError(true);
    }, [setHasDeleteAddressError]);
    var closeErrorModal = (0, _react.useCallback)(function () {
      setHasDeleteAddressError(false);
    }, [setHasDeleteAddressError]);
    var doDeleteAddress = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      setLoadingStatusBar(true);
      try {
        yield profileAddressRemove({
          variables: {
            input: {
              addressId: addressId
            }
          }
        });
        closeDeleteModal();
        yield requestAddressList();
      } catch (e) {
        setHasDeleteAddressError(true);
      } finally {
        setLoadingStatusBar(false);
        openSuccessModal();
      }
    }), [addressId, profile == null ? undefined : profile.email]);
    (0, _react.useEffect)(function () {
      var unsubscribe = navigation.addListener('focus', /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
        yield requestAddressList();
      }));
      return unsubscribe;
    }, [navigation, requestAddressList]);
    (0, _react.useEffect)(function () {
      _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack();
        return true;
      });
    }, [navigation]);
    var onAddressChosen = function onAddressChosen(item) {
      setSelectedAddress(Object.assign({}, item, {
        addressType: 'residential'
      }));
    };
    var checkSelectedAddress = function checkSelectedAddress(item) {
      var selected = false;
      var id = item.id;
      if (profile != null && profile.authCookie) {
        if (selectedAddress) {
          selected = id === selectedAddress.id && !!item;
        }
      } else if (selectedAddress) {
        selected = id === selectedAddress.addressId && !!item;
      }
      return selected;
    };
    var navigateToNewAddress = (0, _react.useCallback)(function () {
      return navigation.navigate('CreateAddress');
    }, [navigation]);
    var navigateToEditAddress = (0, _react.useCallback)(function (data) {
      navigation.navigate('NewAddress', {
        edit: true,
        editAddress: Object.assign({}, data)
      });
    }, [navigation.navigate]);
    var formatAddress = (0, _react.useCallback)(function (_ref4) {
      var street = _ref4.street,
        number = _ref4.number,
        complement = _ref4.complement,
        neighborhood = _ref4.neighborhood,
        city = _ref4.city,
        state = _ref4.state;
      return _formatString.default.address({
        street: street,
        number: number,
        complement: complement,
        neighborhood: neighborhood,
        city: city,
        state: state
      });
    }, []);
    return {
      loadingStatusBar: loadingStatusBar,
      profileData: profile,
      goBack: goBack,
      navigateToNewAddress: navigateToNewAddress,
      navigateToEditAddress: navigateToEditAddress,
      formatAddress: formatAddress,
      doDeleteAddress: doDeleteAddress,
      onAddressChosen: onAddressChosen,
      checkSelectedAddress: checkSelectedAddress,
      hasDeleteAddressError: hasDeleteAddressError,
      openModalDeleteAddress: openModalDeleteAddress,
      openSuccessModal: openSuccessModal,
      openErrorModal: openErrorModal,
      closeErrorModal: closeErrorModal,
      isVisibleDeleteModal: isVisibleDeleteModal,
      isVisibleSuccessModal: isVisibleSuccessModal,
      closeDeleteModal: closeDeleteModal,
      closeSuccessModal: closeSuccessModal
    };
  };
  var _default = exports.default = useController;
