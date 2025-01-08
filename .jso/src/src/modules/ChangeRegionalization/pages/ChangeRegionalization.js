  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ChangeRegionalization = ChangeRegionalization;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ChangeRegionalization(_ref) {
    var route = _ref.route;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      cepInputText = _useState2[0],
      setCepInputText = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isCepAddress = _useState4[0],
      setIsCepAddress = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isCepProductDetail = _useState6[0],
      setIsCepProductDetail = _useState6[1];
    var _useState7 = (0, _react.useState)(),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      address = _useState8[0],
      setAddress = _useState8[1];
    var navigate = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)();
    var _useState9 = (0, _react.useState)([]),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      states = _useState10[0],
      setStates = _useState10[1];
    var _useState11 = (0, _react.useState)([]),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      cities = _useState12[0],
      setCities = _useState12[1];
    var _useState13 = (0, _react.useState)(false),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      isVisibleStatePicker = _useState14[0],
      setIsVisibleStatePicker = _useState14[1];
    var _useState15 = (0, _react.useState)(false),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      isVisibleCityPicker = _useState16[0],
      setIsVisibleCityPicker = _useState16[1];
    var scrollViewRef = _react.default.useRef(null);
    var cepBlackList = ['00000000', '11111111', '22222222', '33333333', '44444444', '55555555', '66666666', '77777777', '88888888', '99999999'];
    (0, _react.useEffect)(function () {
      if (route) {
        var _route$params, _route$params2;
        if (route != null && (_route$params = route.params) != null && _route$params.isCepAddress || route != null && (_route$params2 = route.params) != null && _route$params2.isCepProductDetail) {
          var _route$params3 = route == null ? undefined : route.params,
            _isCepAddress = _route$params3.isCepAddress,
            _isCepProductDetail = _route$params3.isCepProductDetail;
          setIsCepAddress(_isCepAddress);
          setIsCepProductDetail(_isCepProductDetail);
        }
      }
    }, [route]);
    var _useState17 = (0, _react.useState)({
        cep: ''
      }),
      _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
      formState = _useState18[0],
      setFormState = _useState18[1];
    var formRef = (0, _react.useRef)(null);
    var validation = Yup.object().shape({
      cep: Yup.string().matches(/[0-9]{5}-[\d]{3}/g, {
        message: 'Insira um Cep valido'
      }).required('CEP é obrigatório').test('black-list', 'Insira um Cep valido', function (val) {
        if (val) {
          var parsedCep = val.replace(/(-)|(\.)/g, '');
          return !cepBlackList.includes(parsedCep);
        }
        return true;
      })
    });
    var handleSubmit = function handleSubmit() {
      formRef.current.submitForm();
    };
    (0, _$$_REQUIRE(_dependencyMap[6]).useFocusEffect)((0, _react.useCallback)(function () {
      formRef.current.resetForm();
    }, [formRef]));
    var fetchCepInfo = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (cep) {
        var response = yield fetch(`https://viacep.com.br/ws/${cep}/json/`);
        return response.json();
      });
      return function fetchCepInfo(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var fetchAddressInfo = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* () {
        var _address$city, _address$street;
        var response = yield fetch(`https://viacep.com.br/ws/${address == null ? undefined : address.uf}/${address == null ? undefined : (_address$city = address.city) == null ? undefined : _address$city.replace(/\s/g, '%20')}/${address == null ? undefined : (_address$street = address.street) == null ? undefined : _address$street.replace(/\s/g, '%20')}/json/`);
        return response.json();
      });
      return function fetchAddressInfo() {
        return _ref3.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      fetch('https://brasilapi.com.br/api/ibge/uf/v1').then(/*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)(function* (response) {
          var parsedStates = yield response.json();
          setStates(parsedStates.sort(function (a, b) {
            return a.nome.localeCompare(b.nome);
          }).map(function (state) {
            return {
              text: state.sigla,
              subText: state.nome
            };
          }));
        });
        return function (_x2) {
          return _ref4.apply(this, arguments);
        };
      }());
    }, []);
    (0, _react.useEffect)(function () {
      fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${address == null ? undefined : address.uf}`).then(/*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)(function* (response) {
          var parsedCities = yield response.json();
          setCities(parsedCities.sort(function (a, b) {
            return a.nome.localeCompare(b.nome);
          }).map(function (city) {
            return {
              text: city.nome
            };
          }));
        });
        return function (_x3) {
          return _ref5.apply(this, arguments);
        };
      }());
    }, [address == null ? undefined : address.uf]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).SafeAreaView, {
      style: {
        flex: 1,
        backgroundColor: '#FFF'
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).TopBarBackButtonWithoutLogo, {
        loading: false,
        backButtonPress: function backButtonPress() {
          navigate.goBack();
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).ScrollView, {
        ref: scrollViewRef,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[11]).KeyboardAwareScrollView, {
          enableOnAndroid: true,
          enableAutomaticScroll: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[12]).platformType.IOS,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            flex: 1,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Formik, {
              innerRef: formRef,
              initialValues: formState,
              validationSchema: validation,
              validateOnBlur: true,
              validateOnChange: true,
              onSubmit: (/*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2.default)(function* (values) {
                  var data = yield fetchCepInfo(values.cep);
                  navigate.navigate('CEPList', {
                    list: [data],
                    searchTerm: cepInputText,
                    isCepAddress: isCepAddress || false,
                    isCepProductDetail: isCepProductDetail || false
                  });
                });
                return function (_x4) {
                  return _ref6.apply(this, arguments);
                };
              }()),
              children: function children(_ref7) {
                var values = _ref7.values;
                return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                  paddingX: 34,
                  paddingTop: 26,
                  backgroundColor: "white",
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Typography, {
                    fontFamily: "reservaSerifBold",
                    fontSize: 26,
                    children: "Usar meu CEP"
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Typography, {
                    fontFamily: "reservaSansLight",
                    fontSize: 18,
                    style: {
                      marginTop: 29,
                      marginBottom: 12
                    },
                    children: "Digite seu CEP"
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[16]).FormikTextInput, {
                    field: "cep",
                    maskType: "zip-code",
                    placeholder: "Digite seu CEP",
                    keyboardType: "number-pad",
                    maskOptions: {
                      mask: '99999-999'
                    }
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Button, {
                    disabled: values.cep.length < 9,
                    marginTop: 40,
                    width: "100%",
                    title: "PESQUISAR",
                    onPress: function onPress() {
                      handleSubmit();
                    },
                    variant: "primarioEstreito"
                  })]
                });
              }
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
              paddingX: 34,
              paddingTop: 26,
              backgroundColor: "white",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Typography, {
                fontFamily: "reservaSerifBold",
                fontSize: 26,
                children: "Descobrir meu CEP"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Typography, {
                fontFamily: "reservaSansLight",
                fontSize: 18,
                style: {
                  marginTop: 29,
                  marginBottom: 12
                },
                children: "Selecione o estado e cidade"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                flexDirection: "row",
                flexGrow: 1,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).TouchableOpacity, {
                  onPress: function onPress() {
                    return setIsVisibleStatePicker(true);
                  },
                  style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 60,
                    width: 99,
                    borderWidth: 1,
                    borderColor: '#000'
                  },
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                    flexGrow: 1,
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Typography, {
                      fontFamily: "reservaSansLight",
                      fontSize: 20,
                      textAlign: "center",
                      children: address != null && address.uf ? address.uf : 'UF'
                    })
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 7,
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                      marginTop: 11,
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
                        name: "ArrowDown",
                        size: 22,
                        color: "preto"
                      })
                    })
                  })]
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                  flexGrow: 1,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).TouchableOpacity, {
                    disabled: !(address != null && address.uf) && cities.length == 0,
                    onPress: function onPress() {
                      return setIsVisibleCityPicker(true);
                    },
                    style: {
                      flexDirection: 'row',
                      height: 60,
                      width: '100%',
                      marginLeft: 9,
                      borderWidth: 1,
                      borderColor: '#000'
                    },
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                      height: "100%",
                      flexGrow: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 2,
                      flexGrow: 1,
                      flex: 1,
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Typography, {
                        fontFamily: "reservaSansLight",
                        fontSize: 20,
                        textAlign: "center",
                        children: address != null && address.city ? address.city : 'Selecione a cidade...'
                      })
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 7,
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                        marginTop: 11,
                        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
                          name: "ArrowDown",
                          size: 22,
                          color: "preto"
                        })
                      })
                    })]
                  })
                })]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Typography, {
                fontFamily: "reservaSansLight",
                fontSize: 18,
                style: {
                  marginTop: 29,
                  marginBottom: 12
                },
                children: "Digite o nome da rua"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[19]).TextField, {
                onFocus: function onFocus(event) {
                  var _scrollViewRef$curren;
                  return _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[12]).platformType.ANDROID ? (_scrollViewRef$curren = scrollViewRef.current) == null ? undefined : _scrollViewRef$curren.scrollToEnd() : null;
                },
                value: address == null ? undefined : address.street,
                onChangeText: function onChangeText(text) {
                  return setAddress(Object.assign({}, address, {
                    street: text
                  }));
                },
                placeholder: "Rua da Luz"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Typography, {
                fontFamily: "reservaSansLight",
                fontSize: 15,
                style: {
                  marginTop: 14
                },
                children: "N\xE3o utilize n\xFAmero de casa, apartamento, lote, pr\xE9dio ou abreviatura."
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Button, {
                marginTop: 40,
                marginBottom: 40,
                width: "100%",
                title: "BUSCAR",
                disabled: !(address != null && address.street && address != null && address.city && address != null && address.uf),
                onPress: function onPress() {
                  fetchAddressInfo().then(function (data) {
                    navigate.navigate('CEPList', {
                      list: data,
                      searchTerm: `${address == null ? undefined : address.street}, ${address == null ? undefined : address.city} - ${address == null ? undefined : address.uf}`,
                      isCepAddress: isCepAddress || false,
                      isCepProductDetail: isCepProductDetail || false
                    });
                  });
                },
                variant: "primarioEstreito"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[20]).Picker, {
                swipeDirection: false,
                isVisible: isVisibleStatePicker,
                onBackDropPress: function onBackDropPress() {
                  return setIsVisibleStatePicker(false);
                },
                onAndroidBackButtonPress: function onAndroidBackButtonPress() {},
                onClose: function onClose() {
                  return setIsVisibleStatePicker(false);
                },
                onSelect: function onSelect(selected) {
                  setAddress({
                    uf: selected.text
                  });
                },
                title: "Selecione o estado",
                items: states
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[20]).Picker, {
                swipeDirection: false,
                isVisible: isVisibleCityPicker,
                onBackDropPress: function onBackDropPress() {
                  return setIsVisibleCityPicker(false);
                },
                onAndroidBackButtonPress: function onAndroidBackButtonPress() {},
                onClose: function onClose() {
                  return setIsVisibleCityPicker(false);
                },
                onSelect: function onSelect(selected) {
                  setAddress(Object.assign({}, address, {
                    city: selected.text
                  }));
                },
                title: "Selecione a cidade",
                items: cities
              })]
            })]
          })
        })
      })]
    });
  }
