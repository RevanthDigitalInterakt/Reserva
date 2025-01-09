  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.NewAddress = undefined;
  var _toArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _InputOption = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var NewAddress = exports.NewAddress = function NewAddress(_ref) {
    var _route$params, _route$params2, _route$params3, _route$params4;
    var route = _ref.route;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    var edit = route == null ? undefined : (_route$params = route.params) == null ? undefined : _route$params.edit;
    var editAddress = route == null ? undefined : (_route$params2 = route.params) == null ? undefined : _route$params2.editAddress;
    var executeCallback = route == null ? undefined : (_route$params3 = route.params) == null ? undefined : _route$params3.executeCallback;
    var hasCep = route == null ? undefined : (_route$params4 = route.params) == null ? undefined : _route$params4.hasCep;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      toggleActivated = _useState2[0];
    var _useProfileAddressMut = (0, _$$_REQUIRE(_dependencyMap[8]).useProfileAddressMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useProfileAddressMut2 = (0, _slicedToArray2.default)(_useProfileAddressMut, 1),
      profileAddress = _useProfileAddressMut2[0];
    var _useCepLazyQuery = (0, _$$_REQUIRE(_dependencyMap[8]).useCepLazyQuery)({
        context: {
          clientName: 'gateway'
        }
      }),
      _useCepLazyQuery2 = (0, _slicedToArray2.default)(_useCepLazyQuery, 1),
      getCep = _useCepLazyQuery2[0];
    var _useState3 = (0, _react.useState)({
        postalCode: (editAddress == null ? undefined : editAddress.postalCode) || '',
        state: (editAddress == null ? undefined : editAddress.state) || '',
        city: (editAddress == null ? undefined : editAddress.city) || '',
        number: (editAddress == null ? undefined : editAddress.number) || '',
        complement: (editAddress == null ? undefined : editAddress.complement) || '',
        street: (editAddress == null ? undefined : editAddress.street) || '',
        neighborhood: (editAddress == null ? undefined : editAddress.neighborhood) || '',
        receiverName: (editAddress == null ? undefined : editAddress.receiverName) || '',
        country: 'BRA'
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      initialValues = _useState4[0],
      setInitialValues = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      loadingStatusBar = _useState6[0],
      setLoadingStatusBar = _useState6[1];
    var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      loadingCity = _useState8[0],
      setLoadingCity = _useState8[1];
    var _useState9 = (0, _react.useState)(true),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      isValidReceiverName = _useState10[0],
      setIsValidReceiverName = _useState10[1];
    var _useState11 = (0, _react.useState)(true),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      isValidNumber = _useState12[0],
      setIsValidNumber = _useState12[1];
    var _useState13 = (0, _react.useState)(true),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      isValidNeighborhood = _useState14[0],
      setIsValidNeighborhood = _useState14[1];
    var _useState15 = (0, _react.useState)(true),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      isValidStreet = _useState16[0],
      setIsValidStreet = _useState16[1];
    var _useState17 = (0, _react.useState)(true),
      _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
      isValidState = _useState18[0],
      setIsValidState = _useState18[1];
    var _useState19 = (0, _react.useState)(true),
      _useState20 = (0, _slicedToArray2.default)(_useState19, 2),
      isValidCity = _useState20[0],
      setIsValidCity = _useState20[1];
    var _useState21 = (0, _react.useState)(true),
      _useState22 = (0, _slicedToArray2.default)(_useState21, 2),
      disableButton = _useState22[0],
      setDisableButton = _useState22[1];
    var _useState23 = (0, _react.useState)([]),
      _useState24 = (0, _slicedToArray2.default)(_useState23, 2),
      states = _useState24[0],
      setStates = _useState24[1];
    var _useState25 = (0, _react.useState)([]),
      _useState26 = (0, _slicedToArray2.default)(_useState25, 2),
      cities = _useState26[0],
      setCities = _useState26[1];
    var _useState27 = (0, _react.useState)(false),
      _useState28 = (0, _slicedToArray2.default)(_useState27, 2),
      isVisibleStatePicker = _useState28[0],
      setIsVisibleStatePicker = _useState28[1];
    var _useState29 = (0, _react.useState)(false),
      _useState30 = (0, _slicedToArray2.default)(_useState29, 2),
      isVisibleCityPicker = _useState30[0],
      setIsVisibleCityPicker = _useState30[1];
    var handleSaveAddress = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        setLoadingStatusBar(true);
        try {
          if (edit) {
            yield profileAddress({
              variables: {
                input: Object.assign({
                  addressId: editAddress == null ? undefined : editAddress.id
                }, initialValues)
              }
            });
          } else {
            yield profileAddress({
              variables: {
                input: Object.assign({}, initialValues)
              }
            });
          }
        } catch (error) {
          _$$_REQUIRE(_dependencyMap[9]).ExceptionProvider.captureException(error);
        }
        setLoadingStatusBar(false);
        navigation.goBack();
      });
      return function handleSaveAddress() {
        return _ref2.apply(this, arguments);
      };
    }();
    var validationReceiverName = function validationReceiverName(text) {
      var _text$trim;
      if (!text) {
        return;
      }
      var _text$trim$split = text == null ? undefined : (_text$trim = text.trim()) == null ? undefined : _text$trim.split(' '),
        _text$trim$split2 = (0, _toArray2.default)(_text$trim$split),
        rest = _text$trim$split2.slice(1);
      var lastName = rest.join(' ');
      if (text.match(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi) && !lastName.match(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú](\s{1,}){2,19}\b/gi)) {
        setIsValidReceiverName(true);
      } else {
        setIsValidReceiverName(false);
      }
    };
    var isValidField = {
      receiverName: function receiverName(value) {
        return validationReceiverName(value);
      },
      street: function street(value) {
        return value ? setIsValidStreet(true) : setIsValidStreet(false);
      },
      state: function state(value) {
        return value ? setIsValidState(true) : setIsValidState(false);
      },
      city: function city(value) {
        return value ? setIsValidCity(true) : setIsValidCity(false);
      },
      number: function number(value) {
        return value ? setIsValidNumber(true) : setIsValidNumber(false);
      },
      neighborhood: function neighborhood(value) {
        return value ? setIsValidNeighborhood(true) : setIsValidNeighborhood(false);
      }
    };
    (0, _react.useEffect)(function () {
      if (!(initialValues != null && initialValues.receiverName) || !initialValues.postalCode || !initialValues.street || !initialValues.neighborhood || !initialValues.state || !initialValues.city || !initialValues.number) {
        return setDisableButton(true);
      }
      return setDisableButton(false);
    }, [initialValues == null ? undefined : initialValues.receiverName, initialValues.postalCode, initialValues.street, initialValues.neighborhood, initialValues.state, initialValues.city, initialValues.number]);
    (0, _react.useEffect)(function () {
      fetch('https://brasilapi.com.br/api/ibge/uf/v1').then(/*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)(function* (response) {
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
        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
    }, []);
    (0, _react.useEffect)(function () {
      if (!initialValues.state) {
        return;
      }
      setLoadingCity(true);
      fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${initialValues.state.toLowerCase()}`).then(/*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)(function* (response) {
          var parsedCities = yield response.json();
          setCities(parsedCities.sort(function (a, b) {
            return a.nome.localeCompare(b.nome);
          }).map(function (city) {
            return {
              text: city.nome
            };
          }));
        });
        return function (_x2) {
          return _ref4.apply(this, arguments);
        };
      }()).finally(function () {
        setLoadingCity(false);
      });
    }, [initialValues.state]);
    var cepHandler = /*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2.default)(function* (postalCode) {
        var isValidPostalCode = postalCode.length === 8;
        if (isValidPostalCode) {
          setLoadingStatusBar(true);
          try {
            var _yield$getCep = yield getCep({
                variables: {
                  input: {
                    cep: postalCode
                  }
                }
              }),
              data = _yield$getCep.data;
            if (!(data != null && data.cep)) {
              return;
            }
            var _data$cep = data.cep,
              street = _data$cep.street,
              neighborhood = _data$cep.neighborhood,
              city = _data$cep.city,
              state = _data$cep.state;
            isValidField.street(street || '');
            isValidField.neighborhood(neighborhood || '');
            isValidField.city(city || '');
            isValidField.state(state || '');
            isValidField.number(initialValues.number);
            setInitialValues(Object.assign({}, initialValues, {
              postalCode: postalCode,
              street: street,
              neighborhood: neighborhood,
              city: city,
              state: state
            }));
          } catch (e) {
            _$$_REQUIRE(_dependencyMap[9]).ExceptionProvider.captureException(e);
          } finally {
            setLoadingStatusBar(false);
          }
        }
      });
      return function cepHandler(_x3) {
        return _ref5.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      if (hasCep) {
        setInitialValues(Object.assign({}, initialValues, {
          postalCode: hasCep
        }));
        cepHandler(hasCep.replace('-', ''));
      }
    }, [hasCep]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.SafeAreaView, {
      style: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between'
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).TopBarBackButton, {
        loading: loadingStatusBar,
        showShadow: true
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.ScrollView, {
        contentContainerStyle: {
          paddingBottom: 40,
          marginTop: 20
        },
        showsVerticalScrollIndicator: false,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.KeyboardAvoidingView, {
          style: {
            flex: 1
          },
          behavior: "padding",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            paddingX: "xxxs",
            justifyContent: "flex-start",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              alignSelf: "flex-start",
              mb: "nano",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
                fontFamily: "reservaSerifRegular",
                fontSize: 28,
                lineHeight: 32,
                children: edit ? 'Alterar endereço' : 'Adicionar endereço'
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              mt: "micro",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 15,
                lineHeight: 18,
                children: "Insira o endere\xE7o do destinat\xE1rio:"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
              label: "Nome do destinat\xE1rio",
              placeholder: "Nome do destinat\xE1rio",
              value: initialValues.receiverName,
              onChangeText: function onChangeText(text) {
                setInitialValues(Object.assign({}, initialValues, {
                  receiverName: text
                }));
                isValidField.receiverName(text.trim());
              },
              touched: !isValidReceiverName,
              error: "Por favor, insira o nome completo do destinat\xE1rio"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
              label: "CEP",
              placeholder: "CEP",
              maskType: "zip-code",
              value: initialValues.postalCode,
              onChangeText: function onChangeText(text) {
                setInitialValues(Object.assign({}, initialValues, {
                  postalCode: text
                }));
                cepHandler(text.replace('-', ''));
              }
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
              alignSelf: "flex-start",
              marginTop: "quarck",
              onPress: function onPress() {
                navigation.navigate('ChangeRegionalization', {
                  isCepAddress: true
                });
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 14,
                children: "N\xE3o sei meu CEP"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
              label: "Endere\xE7o",
              placeholder: "Endere\xE7o",
              value: initialValues.street,
              onChangeText: function onChangeText(text) {
                setInitialValues(Object.assign({}, initialValues, {
                  street: text
                }));
                isValidField.street(text.trim());
              },
              touched: !isValidStreet,
              error: "Por favor, insira o endere\xE7o."
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
              label: "Bairro",
              placeholder: "Bairro",
              value: initialValues.neighborhood,
              onChangeText: function onChangeText(text) {
                setInitialValues(Object.assign({}, initialValues, {
                  neighborhood: text
                }));
                isValidField.neighborhood(text);
              },
              touched: !isValidNeighborhood,
              error: "Por favor, insira o bairro."
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              flexDirection: "row",
              justifyContent: "space-between",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                flex: 1,
                marginRight: "micro",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
                  maxLength: 20,
                  label: "N\xFAmero",
                  placeholder: "N\xFAmero",
                  value: initialValues.number,
                  onChangeText: function onChangeText(text) {
                    setInitialValues(Object.assign({}, initialValues, {
                      number: text
                    }));
                    isValidField.number(text.trim());
                  },
                  touched: !isValidNumber,
                  error: "Por favor, insira o n\xFAmero."
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                flex: 1,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
                  label: "Complemento",
                  placeholder: "Complemento",
                  value: initialValues.complement,
                  onChangeText: function onChangeText(text) {
                    setInitialValues(Object.assign({}, initialValues, {
                      complement: text
                    }));
                  }
                })
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.Pressable, {
              style: {
                flex: 1
              },
              onPress: function onPress() {
                return setIsVisibleStatePicker(true);
              },
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
                onTouchStart: function onTouchStart() {
                  return setIsVisibleStatePicker(true);
                },
                editable: false,
                autoCapitalize: "characters",
                maxLength: 2,
                label: "Estado",
                placeholder: "Estado",
                value: initialValues.state,
                touched: !isValidState,
                error: "Por favor, insira o Estado."
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Picker, {
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
                  setInitialValues(Object.assign({}, initialValues, {
                    state: selected.text,
                    city: ''
                  }));
                  isValidField.state(selected.text);
                },
                title: "Selecione o estado",
                items: states
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.Pressable, {
              style: {
                flex: 1
              },
              onPress: function onPress() {
                return setIsVisibleCityPicker(true);
              },
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
                isLoading: loadingCity,
                onTouchStart: initialValues.state ? function () {
                  return setIsVisibleCityPicker(true);
                } : undefined,
                editable: false,
                label: "Cidade",
                placeholder: "Cidade",
                value: initialValues.city,
                touched: !isValidState,
                error: "Por favor, insira a Cidade."
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Picker, {
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
                  setInitialValues(Object.assign({}, initialValues, {
                    city: selected.text.toLowerCase()
                  }));
                  isValidField.city(selected.text.toLowerCase());
                },
                title: "Selecione a cidade",
                items: cities
              })]
            }), toggleActivated && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              mb: "sm",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
                placeholder: "Nome do destinat\xE1rio"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
                maskType: "cel-phone",
                placeholder: "Telefone para contato"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_InputOption.default, {
                height: 135,
                textAlignVertical: "top",
                placeholder: "Deseja enviar algum recado junto?"
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
              mt: "xxs",
              onPress: function onPress() {
                if (!executeCallback) {
                  return handleSaveAddress();
                }
                setLoadingStatusBar(true);
                executeCallback(initialValues).then(function () {
                  setLoadingStatusBar(false);
                }).catch(_$$_REQUIRE(_dependencyMap[9]).ExceptionProvider.captureException).finally(function () {
                  return setLoadingStatusBar(false);
                });
              },
              title: "INCLUIR ENDERE\xC7O",
              variant: "primarioEstreito",
              inline: true,
              disabled: loadingStatusBar || disableButton
            })]
          })
        })
      })]
    });
  };
  var _default = exports.default = NewAddress;
