  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ZipCodeDelivery;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _reactNativeReanimated = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomInputForm = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _ProductUnavailable = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _PickUpHeader = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _PickUpItem = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var getDeliveryAddressSchema = Yup.object().shape({
    postalCode: _$$_REQUIRE(_dependencyMap[12]).postalCodeSchema
  });
  var _worklet_17311368907228_init_data = {
    code: "function anonymous(){const{Platform,platformType,withTiming,hasPostalCode}=this._closure;const isIOS=Platform.OS===platformType.IOS;if(isIOS){return{shadowColor:withTiming(hasPostalCode?'#000':'transparent',{duration:500}),shadowOffset:{width:0,height:withTiming(hasPostalCode?2:0,{duration:500})},shadowOpacity:withTiming(hasPostalCode?0.27:0,{duration:500}),borderRadius:withTiming(hasPostalCode?8:0,{duration:500}),shadowRadius:withTiming(hasPostalCode?3:0,{duration:500}),elevation:withTiming(hasPostalCode?5:0,{duration:500})};}return{elevation:withTiming(hasPostalCode?5:0,{duration:500}),borderRadius:withTiming(hasPostalCode?8:0,{duration:500})};}",
    location: "C:\\Workspace\\vendas-omni.mobile-reserva.app.frontend\\src\\pages\\ZipCodeDelivery\\index.tsx"
  };
  function ZipCodeDelivery(_ref) {
    var _addressDelivery$deli, _addressDelivery$stor, _addressDelivery$stor2, _addressDelivery$deli2, _addressDelivery$deli3, _addressDelivery$stor3, _addressDelivery$stor4;
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      hasPostalCode = _useState2[0],
      setHasPostalCode = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];
    var _useState5 = (0, _react.useState)(null),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      addressDelivery = _useState6[0],
      setAddressDelivery = _useState6[1];
    var inputCEPRef = (0, _react.useRef)(null);
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[13]).useBagStore)(['packageItems', 'topBarLoading']),
      packageItems = _useBagStore.packageItems,
      topBarLoading = _useBagStore.topBarLoading;
    var mergeItems = (0, _react.useMemo)(function () {
      var mergedItems = (0, _$$_REQUIRE(_dependencyMap[14]).mergeItemsPackage)(packageItems);
      return mergedItems.map(function (item) {
        return {
          id: item.id,
          quantity: String(item.quantity),
          seller: item.seller
        };
      });
    }, [packageItems]);
    var _useShippingSimulatio = (0, _$$_REQUIRE(_dependencyMap[15]).useShippingSimulationLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useShippingSimulatio2 = (0, _slicedToArray2.default)(_useShippingSimulatio, 1),
      getShippingSimulation = _useShippingSimulatio2[0];
    var handleTopBarGoBackButton = (0, _react.useCallback)(function () {
      navigation.goBack();
    }, []);
    var checkPostalCode = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (value, setFieldValue) {
        if (value.length < 8) return;
        var newValue = (0, _$$_REQUIRE(_dependencyMap[16]).postalCodeMask)(value) || value;
        setFieldValue('postalCode', newValue);
      });
      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), []);
    var handleGetShippingSimulation = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (ctx, values) {
        var postalCode = values.postalCode,
          items = values.items;
        if (postalCode.length !== 9) {
          ctx.setFieldError('postalCode', 'Insira um CEP');
          return;
        }
        _reactNative.Keyboard.dismiss();
        setLoading(true);
        try {
          var _yield$getShippingSim = yield getShippingSimulation({
              variables: {
                input: {
                  postalCode: postalCode.replace('-', ''),
                  items: items
                }
              }
            }),
            data = _yield$getShippingSim.data;
          if (data) {
            setAddressDelivery(data.shippingSimulation);
          }
        } catch (error) {
          _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(error);
        } finally {
          setLoading(false);
        }
      });
      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }(), []);
    var shadowColorStyle = (0, _reactNativeReanimated.useAnimatedStyle)(function () {
      var _f = function _f() {
        var isIOS = _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[18]).platformType.IOS;
        if (isIOS) {
          return {
            shadowColor: (0, _reactNativeReanimated.withTiming)(hasPostalCode ? '#000' : 'transparent', {
              duration: 500
            }),
            // Ajuste a duração conforme necessário
            shadowOffset: {
              width: 0,
              height: (0, _reactNativeReanimated.withTiming)(hasPostalCode ? 2 : 0, {
                duration: 500
              })
            },
            shadowOpacity: (0, _reactNativeReanimated.withTiming)(hasPostalCode ? 0.27 : 0, {
              duration: 500
            }),
            borderRadius: (0, _reactNativeReanimated.withTiming)(hasPostalCode ? 8 : 0, {
              duration: 500
            }),
            shadowRadius: (0, _reactNativeReanimated.withTiming)(hasPostalCode ? 3 : 0, {
              duration: 500
            }),
            elevation: (0, _reactNativeReanimated.withTiming)(hasPostalCode ? 5 : 0, {
              duration: 500
            })
          };
        }
        return {
          elevation: (0, _reactNativeReanimated.withTiming)(hasPostalCode ? 5 : 0, {
            duration: 500
          }),
          borderRadius: (0, _reactNativeReanimated.withTiming)(hasPostalCode ? 8 : 0, {
            duration: 500
          })
        };
      };
      _f._closure = {
        Platform: _reactNative.Platform,
        platformType: _$$_REQUIRE(_dependencyMap[18]).platformType,
        withTiming: _reactNativeReanimated.withTiming,
        hasPostalCode: hasPostalCode
      };
      _f.__initData = _worklet_17311368907228_init_data;
      _f.__workletHash = 17311368907228;
      return _f;
    }(), [hasPostalCode]);
    var renderHeader = function renderHeader(showHeader) {
      return addressDelivery && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_PickUpHeader.default, {
        showHeader: showHeader,
        addressDelivery: addressDelivery
      });
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_reactNative.SafeAreaView, {
      style: _$$_REQUIRE(_dependencyMap[20]).zipCodeStyles.safeArea,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsxs)(_reactNative.KeyboardAvoidingView, {
        keyboardVerticalOffset: _$$_REQUIRE(_dependencyMap[21]).KEYBOARD_VERTICAL_OFFSET_VALUE,
        behavior: (0, _$$_REQUIRE(_dependencyMap[22]).getBehaviorValue)(_reactNative.Platform.OS),
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[23]).TopBarBackButton, {
          backButtonPress: handleTopBarGoBackButton,
          loading: topBarLoading
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsxs)(_reactNativeReanimated.default.View, {
          style: [_$$_REQUIRE(_dependencyMap[20]).zipCodeStyles.boxContainer, shadowColorStyle],
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_reactNative.View, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[20]).zipCodeStyles.titleCep,
              children: "Op\xE7\xF5es de entrega"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[20]).zipCodeStyles.containerMarginTop,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsxs)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[20]).zipCodeStyles.descriptionText,
              children: ["Digite seu", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsxs)(_reactNative.Text, {
                style: _$$_REQUIRE(_dependencyMap[20]).zipCodeStyles.descriptionTextCep,
                children: ["CEP", ' ']
              }), "abaixo e escolha se prefere receber os produtos em casa ou retirar em uma das nossas lojas mais pr\xF3ximas de voc\xEA."]
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[20]).zipCodeStyles.containerMarginTop,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Formik, {
              initialValues: {
                postalCode: ''
              },
              onSubmit: function onSubmit(_ref4, ctx) {
                var postalCode = _ref4.postalCode;
                return handleGetShippingSimulation(ctx, {
                  postalCode: postalCode,
                  items: mergeItems
                });
              },
              validationSchema: getDeliveryAddressSchema,
              children: function children(_ref5) {
                var handleChange = _ref5.handleChange,
                  handleSubmit = _ref5.handleSubmit,
                  values = _ref5.values,
                  errors = _ref5.errors,
                  touched = _ref5.touched,
                  setFieldTouched = _ref5.setFieldTouched,
                  setFieldValue = _ref5.setFieldValue;
                return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_reactNative.View, {
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_CustomInputForm.default, {
                    maxLength: 9,
                    loading: loading,
                    placeholder: "Digite seu CEP",
                    onTextChange: handleChange('postalCode'),
                    inputValue: values.postalCode,
                    inputRef: inputCEPRef,
                    inputName: "postalCode",
                    fieldTouched: function fieldTouched() {
                      return setFieldTouched('postalCode');
                    },
                    error: errors.postalCode,
                    isEditable: true,
                    textInputType: "number-pad",
                    checkPostalCode: checkPostalCode,
                    setFieldValue: setFieldValue,
                    inputID: (0, _testProps.default)('com.usereserva:id/shipping_simulation_input_postal_code'),
                    touched: touched.postalCode,
                    buttonLabel: "OK",
                    testID: "com.usereserva:id/shipping_simulation_button_submit",
                    onPress: function onPress() {
                      return handleSubmit();
                    }
                  })
                });
              }
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[20]).zipCodeStyles.containerPaddingX,
          children: [!loading && ((addressDelivery == null ? undefined : (_addressDelivery$deli = addressDelivery.delivery) == null ? undefined : _addressDelivery$deli.address) || !!(addressDelivery != null && (_addressDelivery$stor = addressDelivery.storeList) != null && (_addressDelivery$stor2 = _addressDelivery$stor.stores) != null && _addressDelivery$stor2.length)) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_reactNative.FlatList, {
            contentContainerStyle: {
              paddingBottom: 550,
              marginBottom: 550
            },
            showsVerticalScrollIndicator: false,
            data: addressDelivery.storeList.stores,
            keyExtractor: function keyExtractor(item) {
              return item.friendlyName;
            },
            ListHeaderComponent: renderHeader(!!(addressDelivery != null && (_addressDelivery$deli2 = addressDelivery.delivery) != null && _addressDelivery$deli2.address)),
            renderItem: function renderItem(_ref6) {
              var item = _ref6.item;
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_PickUpItem.default, {
                store: item,
                deliveryOptions: addressDelivery.delivery.deliveryOptions,
                deliveryOptionsStore: addressDelivery.storeList.deliveryOptions
              });
            }
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_ProductUnavailable.default, {
            type: "ZIPCODE",
            showCard: !loading && addressDelivery && !(addressDelivery != null && (_addressDelivery$deli3 = addressDelivery.delivery) != null && _addressDelivery$deli3.address) && !(addressDelivery != null && (_addressDelivery$stor3 = addressDelivery.storeList) != null && (_addressDelivery$stor4 = _addressDelivery$stor3.stores) != null && _addressDelivery$stor4.length)
          })]
        })]
      })
    });
  }
