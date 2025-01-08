  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _defineProperty2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _IsTestingModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _ReviewYourDataComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _FormEditProfileComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function EditProfileRefactor(_ref) {
    var _route$params2, _route$params3, _route$params4;
    var route = _ref.route;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[8]).useNavigation)();
    var _useState = (0, _react.useState)(true),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isLoading = _useState2[0],
      setLoading = _useState2[1];
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[9]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;
    var _useState3 = (0, _react.useState)({
        testingModal: {
          show: false,
          parans: {}
        },
        changeFileModal: {
          show: false,
          parans: {}
        }
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      modalsState = _useState4[0],
      setModalsState = _useState4[1];
    var handleToggleModalState = (0, _react.useCallback)(function (key) {
      setModalsState(function (oldValue) {
        return Object.assign({}, oldValue, (0, _defineProperty2.default)({}, key, Object.assign({}, oldValue[key], {
          show: !oldValue[key].show
        })));
      });
    }, []);
    var handleTopBarGoBackButton = (0, _react.useCallback)(function () {
      var _route$params;
      if ((_route$params = route.params) != null && _route$params.isRegister) {
        navigation.navigate('Home');
        return;
      }
      navigation.goBack();
    }, [(_route$params2 = route.params) == null ? undefined : _route$params2.isRegister]);
    var handleToogleLoading = (0, _react.useCallback)(function () {
      var newLoadingValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      setLoading(newLoadingValue);
    }, []);
    (0, _react.useEffect)(function () {
      if (!isLoading && startLoadingTime > 0) {
        onFinishLoad();
      }
    }, [isLoading, onFinishLoad, startLoadingTime]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.SafeAreaView, {
      style: _$$_REQUIRE(_dependencyMap[11]).editProfileStyles.safeArea,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.KeyboardAvoidingView, {
        keyboardVerticalOffset: _$$_REQUIRE(_dependencyMap[12]).KEYBOARD_VERTICAL_OFFSET_VALUE,
        behavior: (0, _$$_REQUIRE(_dependencyMap[13]).getBehaviorValue)(_reactNative.Platform.OS),
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[14]).TopBarBackButton, {
          loading: isLoading,
          backButtonPress: handleTopBarGoBackButton
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.ScrollView, {
          showsVerticalScrollIndicator: false,
          style: _$$_REQUIRE(_dependencyMap[11]).editProfileStyles.fullHeight,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[15]).Box, {
            alignContent: "flex-start",
            pt: "xs",
            paddingX: "xxxs",
            pb: "xxl",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_IsTestingModal.default, {
              isVisible: modalsState.testingModal.show,
              setIsVisible: function setIsVisible() {
                return handleToggleModalState('testingModal');
              }
            }), ((_route$params3 = route.params) == null ? undefined : _route$params3.isRegister) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_ReviewYourDataComponent.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_FormEditProfileComponent.default, {
              showChangeFileModal: modalsState.changeFileModal.show,
              handleModal: function handleModal(key) {
                return handleToggleModalState(key);
              },
              isRegister: (_route$params4 = route.params) == null ? undefined : _route$params4.isRegister,
              handleToogleLoading: handleToogleLoading
            })]
          })
        })]
      })
    });
  }
  var _default = exports.default = EditProfileRefactor;
