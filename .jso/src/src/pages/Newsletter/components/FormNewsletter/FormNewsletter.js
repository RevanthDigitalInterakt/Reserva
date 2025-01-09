  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FormNewsletter = FormNewsletter;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconInfoFill = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _useHandleSendLeads2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function FormNewsletter(_ref) {
    var setOpenModal = _ref.setOpenModal;
    var _useHandleSendLeads = (0, _useHandleSendLeads2.default)(),
      handleSendLeads = _useHandleSendLeads.handleSendLeads;
    var FORM_SCHEMA = Yup.object().shape({
      name: _$$_REQUIRE(_dependencyMap[8]).nameSchema,
      email: _$$_REQUIRE(_dependencyMap[8]).emailSchema,
      phone: _$$_REQUIRE(_dependencyMap[8]).phoneNumberSchema
    });
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, Object.assign({}, (0, _testProps.default)('form_newsletter'), {
      style: _styles.default.containerForm,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Formik, {
        initialValues: {
          name: '',
          email: '',
          phone: ''
        },
        onSubmit: function onSubmit(values) {
          handleSendLeads(values);
          setOpenModal(true);
        },
        validationSchema: FORM_SCHEMA,
        children: function children(_ref2) {
          var handleChange = _ref2.handleChange,
            handleSubmit = _ref2.handleSubmit,
            handleBlur = _ref2.handleBlur,
            values = _ref2.values,
            errors = _ref2.errors,
            touched = _ref2.touched;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Fragment, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
              style: _styles.default.contentForm,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
                style: [_styles.default.inputContainer, {
                  borderBottomColor: errors.name && touched.name ? _$$_REQUIRE(_dependencyMap[11]).COLORS.INPUT_ERROR_MESSAGE : _$$_REQUIRE(_dependencyMap[11]).COLORS.TEXT_INPUT_CONTAINER
                }],
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TextInput, Object.assign({
                  style: _styles.default.textInput,
                  placeholder: "Nome",
                  placeholderTextColor: _$$_REQUIRE(_dependencyMap[11]).COLORS.BLACK,
                  autoCapitalize: "none",
                  autoCorrect: false,
                  returnKeyType: "next",
                  keyboardType: "default",
                  onChangeText: handleChange('name'),
                  onBlur: handleBlur('name'),
                  value: values.name
                }, (0, _testProps.default)('newsletter_input_name'), {
                  onSubmitEditing: function onSubmitEditing() {}
                }))
              }), errors.name && touched.name && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
                style: _styles.default.errorContainer,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_IconInfoFill.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
                  style: _styles.default.errorMessage,
                  children: errors.name
                })]
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
              style: _styles.default.contentForm,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
                style: [_styles.default.inputContainer, {
                  borderBottomColor: errors.email && touched.email ? _$$_REQUIRE(_dependencyMap[11]).COLORS.INPUT_ERROR_MESSAGE : _$$_REQUIRE(_dependencyMap[11]).COLORS.TEXT_INPUT_CONTAINER
                }],
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TextInput, Object.assign({
                  style: _styles.default.textInput,
                  placeholder: "E-mail",
                  placeholderTextColor: _$$_REQUIRE(_dependencyMap[11]).COLORS.BLACK,
                  autoCapitalize: "none",
                  autoCorrect: false,
                  returnKeyType: "next",
                  keyboardType: "email-address",
                  onChangeText: handleChange('email'),
                  onBlur: handleBlur('email'),
                  value: values.email
                }, (0, _testProps.default)('newsletter_input_email'), {
                  onSubmitEditing: function onSubmitEditing() {}
                }))
              }), errors.email && touched.email && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
                style: _styles.default.errorContainer,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_IconInfoFill.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
                  style: _styles.default.errorMessage,
                  children: errors.email
                })]
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
              style: _styles.default.contentForm,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
                style: [_styles.default.inputContainer, {
                  borderBottomColor: errors.phone && touched.phone ? _$$_REQUIRE(_dependencyMap[11]).COLORS.INPUT_ERROR_MESSAGE : _$$_REQUIRE(_dependencyMap[11]).COLORS.TEXT_INPUT_CONTAINER
                }],
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TextInput, Object.assign({
                  style: _styles.default.textInput,
                  placeholder: "Telefone",
                  placeholderTextColor: _$$_REQUIRE(_dependencyMap[11]).COLORS.BLACK,
                  autoCapitalize: "none",
                  autoCorrect: false,
                  returnKeyType: "next",
                  keyboardType: "phone-pad",
                  onChangeText: handleChange('phone'),
                  onBlur: handleBlur('phone'),
                  value: values.phone
                }, (0, _testProps.default)('newsletter_input_phone'), {
                  onSubmitEditing: function onSubmitEditing() {}
                }))
              }), errors.phone && touched.phone && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
                style: _styles.default.errorContainer,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_IconInfoFill.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
                  style: _styles.default.errorMessage,
                  children: errors.phone
                })]
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('newsletter_button_submit'), {
              onPress: function onPress() {
                return handleSubmit();
              },
              style: _styles.default.btnSubmit,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
                style: _styles.default.txtBtnSubmit,
                children: "quero me cadastrar"
              })
            }))]
          });
        }
      })
    }));
  }
