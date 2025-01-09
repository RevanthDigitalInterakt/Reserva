  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = CreateAddress;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  var _InputForm = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _ModalCancelCreateAddress = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _CreateAddress = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var createAddressSchema = Yup.object().shape({
    addressSurname: _$$_REQUIRE(_dependencyMap[10]).addressSurnameSchema,
    fullname: _$$_REQUIRE(_dependencyMap[10]).fullNameSchema,
    addressNumber: _$$_REQUIRE(_dependencyMap[10]).addressNumberSchema,
    postalCode: _$$_REQUIRE(_dependencyMap[10]).postalCodeSchema,
    street: _$$_REQUIRE(_dependencyMap[10]).streetSchema,
    neighborhood: _$$_REQUIRE(_dependencyMap[10]).neighborhoodSchema,
    complement: _$$_REQUIRE(_dependencyMap[10]).complementSchema,
    addressState: _$$_REQUIRE(_dependencyMap[10]).addressStateSchema,
    city: _$$_REQUIRE(_dependencyMap[10]).citySchema
  });
  function CreateAddress(_ref) {
    var _profile$customFields, _profile$customFields2, _route$params2, _route$params5;
    var navigation = _ref.navigation,
      route = _ref.route;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[11]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var mainAddress = profile == null ? undefined : (_profile$customFields = profile.customFields) == null ? undefined : (_profile$customFields2 = _profile$customFields.find(function (item) {
      return (item == null ? undefined : item.cacheId) === 'mainAddressId';
    })) == null ? undefined : _profile$customFields2.value;
    var addressData = profile == null ? undefined : profile.addresses.find(function (address) {
      var _route$params;
      return (address == null ? undefined : address.id) === ((_route$params = route.params) == null ? undefined : _route$params.id);
    });
    var inputSurnameRef = (0, _react.useRef)(null);
    var inputFullnameRef = (0, _react.useRef)(null);
    var inputCEPRef = (0, _react.useRef)(null);
    var inputAddressRef = (0, _react.useRef)(null);
    var inputNeighborRef = (0, _react.useRef)(null);
    var inputNumberRef = (0, _react.useRef)(null);
    var inputComplementRef = (0, _react.useRef)(null);
    var inputStateRef = (0, _react.useRef)(null);
    var inputCityRef = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];
    var _useState3 = (0, _react.useState)(mainAddress === ((_route$params2 = route.params) == null ? undefined : _route$params2.id) || false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isMainAddress = _useState4[0],
      setIsMainAddress = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      modalVisible = _useState6[0],
      setModalVisible = _useState6[1];
    var switchMainAddress = function switchMainAddress() {
      return setIsMainAddress(!isMainAddress);
    };
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[12]).useBagStore)(['actions']),
      actions = _useBagStore.actions;
    var _useProfileAddressMut = (0, _$$_REQUIRE(_dependencyMap[13]).useProfileAddressMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useProfileAddressMut2 = (0, _slicedToArray2.default)(_useProfileAddressMut, 1),
      profileAddress = _useProfileAddressMut2[0];
    var _useCepLazyQuery = (0, _$$_REQUIRE(_dependencyMap[13]).useCepLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useCepLazyQuery2 = (0, _slicedToArray2.default)(_useCepLazyQuery, 1),
      getCep = _useCepLazyQuery2[0];
    var checkPostalCode = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (value, setFieldValue) {
        if (value.length < 8) return;
        var newValue = (0, _$$_REQUIRE(_dependencyMap[14]).postalCodeMask)(value);
        setFieldValue('postalCode', newValue);
        try {
          var _yield$getCep = yield getCep({
              variables: {
                input: {
                  cep: value
                }
              }
            }),
            data = _yield$getCep.data;
          if (data) {
            var _data$cep, _data$cep2, _data$cep3, _data$cep4;
            setFieldValue('city', data == null ? undefined : (_data$cep = data.cep) == null ? undefined : _data$cep.city);
            setFieldValue('neighborhood', data == null ? undefined : (_data$cep2 = data.cep) == null ? undefined : _data$cep2.neighborhood);
            setFieldValue('addressState', data == null ? undefined : (_data$cep3 = data.cep) == null ? undefined : _data$cep3.state);
            setFieldValue('street', data == null ? undefined : (_data$cep4 = data.cep) == null ? undefined : _data$cep4.street);
          }
        } catch (error) {
          _$$_REQUIRE(_dependencyMap[15]).ExceptionProvider.captureException(error);
        }
      });
      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), [getCep]);
    var verifyAddressNameField = (0, _react.useCallback)(function (addressSurname) {
      var addressExists = profile == null ? undefined : profile.addresses.find(function (address) {
        return (address == null ? undefined : address.addressName) === addressSurname;
      });
      if (addressExists) {
        _reactNative.Alert.alert('Erro', 'Já existe um endereço com o apelido digitado.');
        return true;
      }
      return false;
    }, []);
    var handleCreateAddress = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (addressValues) {
        try {
          var _route$params3, _route$params4;
          var addressNumber = addressValues.addressNumber,
            addressState = addressValues.addressState,
            addressSurname = addressValues.addressSurname,
            city = addressValues.city,
            complement = addressValues.complement,
            fullname = addressValues.fullname,
            neighborhood = addressValues.neighborhood,
            postalCode = addressValues.postalCode,
            street = addressValues.street;
          if (loading) return;
          _reactNative.Keyboard.dismiss();
          var response = verifyAddressNameField(addressSurname);
          if (response) return;
          setLoading(true);
          yield profileAddress({
            variables: {
              input: Object.assign({}, (_route$params3 = route.params) != null && _route$params3.id ? {
                addressId: (_route$params4 = route.params) == null ? undefined : _route$params4.id
              } : {}, {
                city: city,
                country: 'Brasil',
                neighborhood: neighborhood,
                number: addressNumber,
                postalCode: postalCode,
                receiverName: fullname,
                state: addressState,
                street: street,
                addressName: addressSurname,
                complement: complement,
                mainAddress: isMainAddress
              })
            }
          });
          yield actions.REFRESH_ORDER_FORM();
          yield actions.REFETCH_ORDER_FORM();
        } catch (error) {
          _$$_REQUIRE(_dependencyMap[15]).ExceptionProvider.captureException(error);
        } finally {
          setLoading(false);
          navigation.goBack();
        }
      });
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }(), [loading, (_route$params5 = route.params) == null ? undefined : _route$params5.id, profileAddress, isMainAddress, navigation]);
    var modalController = (0, _react.useCallback)(function (actionType) {
      if (actionType && actionType === 'cancel') {
        setModalVisible(!modalVisible);
        navigation.goBack();
        return;
      }
      setModalVisible(!modalVisible);
    }, [navigation, modalVisible]);
    var checkFilledInput = (0, _react.useCallback)(function (values) {
      var valuesExists = Object.values(values).some(function (value) {
        return value !== '';
      });
      if (valuesExists) {
        modalController();
        return;
      }
      navigation.goBack();
    }, [navigation, modalController]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_reactNative.SafeAreaView, {
      style: _CreateAddress.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).TopBarBackButton, {
        loading: false,
        showShadow: true,
        backButtonPress: navigation.goBack
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: _CreateAddress.default.scrollViewContent,
        keyboardShouldPersistTaps: "handled",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
          style: _CreateAddress.default.content,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.Text, {
            style: _CreateAddress.default.title,
            children: "Adicionar endere\xE7o"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
          style: _CreateAddress.default.content,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.Text, {
            style: _CreateAddress.default.subtitle,
            children: "Os campos a seguir s\xE3o obrigat\xF3rios ent\xE3o lembre-se de preencher todos eles."
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Formik, {
          initialValues: {
            addressSurname: (addressData == null ? undefined : addressData.addressName) || '',
            fullname: (addressData == null ? undefined : addressData.receiverName) || '',
            postalCode: (addressData == null ? undefined : addressData.postalCode) || '',
            street: (addressData == null ? undefined : addressData.street) || '',
            neighborhood: (addressData == null ? undefined : addressData.neighborhood) || '',
            addressNumber: (addressData == null ? undefined : addressData.number) || '',
            complement: (addressData == null ? undefined : addressData.complement) || '',
            addressState: (addressData == null ? undefined : addressData.state) || '',
            city: (addressData == null ? undefined : addressData.city) || ''
          },
          onSubmit: function onSubmit(values) {
            return handleCreateAddress(values);
          },
          validationSchema: createAddressSchema,
          children: function children(_ref4) {
            var handleChange = _ref4.handleChange,
              handleSubmit = _ref4.handleSubmit,
              values = _ref4.values,
              errors = _ref4.errors,
              touched = _ref4.touched,
              setFieldTouched = _ref4.setFieldTouched,
              setFieldValue = _ref4.setFieldValue;
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[16]).Fragment, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_InputForm.default, {
                  placeholder: "*Digite um apelido para este endere\xE7o",
                  onTextChange: handleChange('addressSurname'),
                  inputValue: values.addressSurname,
                  inputRef: inputSurnameRef,
                  nextInputRef: inputFullnameRef,
                  inputName: "addressSurname",
                  fieldTouched: function fieldTouched() {
                    return setFieldTouched('addressSurname');
                  },
                  error: errors.addressSurname,
                  isEditable: true,
                  textInputType: "default",
                  inputID: (0, _testProps.default)('com.usereserva:id/create_address_input_surname'),
                  touched: touched.addressSurname
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_InputForm.default, {
                  placeholder: "*Digite seu nome completo",
                  onTextChange: handleChange('fullname'),
                  inputValue: values.fullname,
                  inputRef: inputFullnameRef,
                  nextInputRef: inputCEPRef,
                  inputName: "fullname",
                  fieldTouched: function fieldTouched() {
                    return setFieldTouched('fullname');
                  },
                  error: errors.fullname,
                  isEditable: true,
                  textInputType: "default",
                  inputID: (0, _testProps.default)('com.usereserva:id/create_address_input_fullname'),
                  touched: touched.fullname
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_InputForm.default, {
                  placeholder: "*Digite seu CEP",
                  onTextChange: handleChange('postalCode'),
                  inputValue: values.postalCode,
                  inputRef: inputCEPRef,
                  nextInputRef: inputAddressRef,
                  inputName: "postalCode",
                  fieldTouched: function fieldTouched() {
                    return setFieldTouched('postalCode');
                  },
                  error: errors.postalCode,
                  isEditable: true,
                  textInputType: "number-pad",
                  checkPostalCode: checkPostalCode,
                  setFieldValue: setFieldValue,
                  inputID: (0, _testProps.default)('com.usereserva:id/create_address_input_postal_code'),
                  touched: touched.postalCode
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_InputForm.default, {
                  placeholder: "*Digite sua Rua",
                  onTextChange: handleChange('street'),
                  inputValue: values.street,
                  inputRef: inputAddressRef,
                  nextInputRef: inputNeighborRef,
                  inputName: "street",
                  fieldTouched: function fieldTouched() {
                    return setFieldTouched('street');
                  },
                  error: errors.street,
                  isEditable: true,
                  textInputType: "default",
                  inputID: (0, _testProps.default)('com.usereserva:id/create_address_input_street'),
                  touched: touched.street
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_InputForm.default, {
                  placeholder: "*Digite seu bairro",
                  onTextChange: handleChange('neighborhood'),
                  inputValue: values.neighborhood,
                  inputRef: inputNeighborRef,
                  nextInputRef: inputNumberRef,
                  inputName: "neighborhood",
                  fieldTouched: function fieldTouched() {
                    return setFieldTouched('neighborhood');
                  },
                  error: errors.neighborhood,
                  isEditable: true,
                  textInputType: "default",
                  inputID: (0, _testProps.default)('com.usereserva:id/create_address_input_neighborhood'),
                  touched: touched.neighborhood
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_InputForm.default, {
                  placeholder: "*N\xFAmero",
                  onTextChange: handleChange('addressNumber'),
                  inputValue: values.addressNumber,
                  inputRef: inputNumberRef,
                  nextInputRef: inputComplementRef,
                  inputName: "addressNumber",
                  fieldTouched: function fieldTouched() {
                    return setFieldTouched('addressNumber');
                  },
                  error: errors.addressNumber,
                  isEditable: true,
                  textInputType: "default",
                  inputID: (0, _testProps.default)('com.usereserva:id/create_address_input_address_number'),
                  touched: touched.addressNumber
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_InputForm.default, {
                  placeholder: "Complemento",
                  onTextChange: handleChange('complement'),
                  inputValue: values.complement,
                  inputRef: inputComplementRef,
                  nextInputRef: inputComplementRef,
                  inputName: "complement",
                  fieldTouched: function fieldTouched() {},
                  error: errors.complement,
                  isEditable: true,
                  textInputType: "default",
                  inputID: (0, _testProps.default)('com.usereserva:id/create_address_input_complement')
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_InputForm.default, {
                  placeholder: "*Para preencher o Estado, digite o CEP acima",
                  onTextChange: handleChange('addressState'),
                  inputValue: values.addressState,
                  fieldTouched: function fieldTouched() {
                    return setFieldTouched('addressState');
                  },
                  error: errors.addressState,
                  inputRef: inputStateRef,
                  nextInputRef: inputCityRef,
                  inputName: "addressState",
                  isEditable: values.postalCode !== '' && values.addressState === '',
                  textInputType: "default",
                  inputID: (0, _testProps.default)('com.usereserva:id/create_address_input_address_state'),
                  touched: touched.addressState
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_InputForm.default, {
                  placeholder: "*Para preencher a Cidade, digite o CEP acima",
                  onTextChange: handleChange('city'),
                  inputValue: values.city,
                  fieldTouched: function fieldTouched() {
                    return setFieldTouched('city');
                  },
                  error: errors.city,
                  inputRef: inputCityRef,
                  inputName: "city",
                  isEditable: values.postalCode !== '' && values.city === '',
                  textInputType: "default",
                  inputID: (0, _testProps.default)('com.usereserva:id/create_address_input_city'),
                  touched: touched.city
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_reactNative.View, {
                  style: _CreateAddress.default.contentRow,
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.Text, {
                    style: _CreateAddress.default.labelMainAddress,
                    children: "Tornar este o meu endere\xE7o padr\xE3o"
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.Switch, {
                    trackColor: {
                      false: _$$_REQUIRE(_dependencyMap[19]).COLORS.SWITCH_INACTIVE,
                      true: _$$_REQUIRE(_dependencyMap[19]).COLORS.SWITCH_ACTIVE
                    },
                    thumbColor: isMainAddress ? _$$_REQUIRE(_dependencyMap[19]).COLORS.SWITCH_THUMB_ACTIVE : _$$_REQUIRE(_dependencyMap[19]).COLORS.SWITCH_THUMB_INACTIVE,
                    ios_backgroundColor: _$$_REQUIRE(_dependencyMap[19]).COLORS.SWITCH_BACKGROUND_COLOR_IOS,
                    onValueChange: switchMainAddress,
                    value: isMainAddress
                  })]
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.TouchableOpacity, {
                  testID: "com.usereserva:id/create_address_button_submit",
                  onPress: function onPress() {
                    return handleSubmit();
                  },
                  style: _CreateAddress.default.actionButtonSubmit,
                  children: loading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.ActivityIndicator, {
                    size: "small",
                    color: _$$_REQUIRE(_dependencyMap[19]).COLORS.WHITE
                  }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.Text, {
                    style: _CreateAddress.default.textActionButtonSubmit,
                    children: "salvar endere\xE7o"
                  })
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
                style: _CreateAddress.default.content,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.TouchableOpacity, {
                  testID: "com.usereserva:id/create_address_button_cancel",
                  onPress: function onPress() {
                    return checkFilledInput(values);
                  },
                  style: _CreateAddress.default.actionButtonCancel,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.Text, {
                    style: _CreateAddress.default.textActionButtonCancel,
                    children: "cancelar"
                  })
                })
              }), modalVisible && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_ModalCancelCreateAddress.default, {
                showModal: modalVisible,
                modalController: modalController
              })]
            });
          }
        })]
      })]
    });
  }
