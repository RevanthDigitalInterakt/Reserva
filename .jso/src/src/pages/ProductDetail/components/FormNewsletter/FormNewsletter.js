  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _Tooltip = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function FormNewsletter() {
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[8]).useProductDetailStore)(['productDetail']),
      productDetail = _useProductDetailStor.productDetail;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      email = _useState2[0],
      setEmail = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      success = _useState4[0],
      setSuccess = _useState4[1];
    var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      validationError = _useState6[0],
      setValidationError = _useState6[1];
    var _useSubscribeNewslett = (0, _$$_REQUIRE(_dependencyMap[9]).useSubscribeNewsletterMutation)({
        context: {
          clientName: 'gateway'
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        optimisticResponse: function optimisticResponse() {
          return {
            __typename: 'Mutation',
            subscribeNewsletter: true
          };
        }
      }),
      _useSubscribeNewslett2 = (0, _slicedToArray2.default)(_useSubscribeNewslett, 2),
      onSubscribe = _useSubscribeNewslett2[0],
      loading = _useSubscribeNewslett2[1].loading;
    var onSubmit = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        _reactNative.Keyboard.dismiss();
        if (loading) return;
        setValidationError('');
        var isValidEmail = Yup.string().required().email().isValidSync(email);
        if (!isValidEmail) {
          throw new Error('E-mail invalido');
        }
        var _yield$onSubscribe = yield onSubscribe({
            variables: {
              input: {
                email: email
              }
            }
          }),
          data = _yield$onSubscribe.data,
          errors = _yield$onSubscribe.errors;
        if (errors != null && errors.length || !(data != null && data.subscribeNewsletter)) {
          throw new Error('Ocorreu um erro ao realizar o seu cadastro');
        }
        _EventProvider.default.logEvent('product_subscribe_newsletter', {
          product_id: (productDetail == null ? undefined : productDetail.productId) || '',
          success: 1
        });
        setSuccess(true);
        setEmail('');
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(err, {
          email: email
        });
        setValidationError(err.message);
        _EventProvider.default.logEvent('product_subscribe_newsletter', {
          product_id: (productDetail == null ? undefined : productDetail.productId) || '',
          success: 0
        });
      }
    }), [email, loading, productDetail, onSubscribe]);
    if (!productDetail) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        mb: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_Tooltip.default, {
          tooltipText: "Email Cadastrado!",
          isVisible: success,
          setIsVisible: setSuccess
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
          fontFamily: "reservaSerifRegular",
          fontSize: 16,
          children: "Receba novidades e promo\xE7\xF5es"
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).OutlineInput, {
        testID: "com.usereserva:id/productdetail_input_email_promotion",
        placeholder: "Digite seu e-mail",
        value: email,
        loading: loading,
        onChangeText: setEmail,
        accessibilityLabel: "productdetail_input_email",
        iconName: "ChevronRight",
        autoCapitalize: "none",
        keyboardType: "email-address",
        onSubmitEditing: onSubmit,
        onPressIcon: onSubmit
      }), !!validationError && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        mt: "quarck",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
          color: "vermelhoAlerta",
          fontFamily: "nunitoRegular",
          fontSize: 13,
          children: validationError
        })
      })]
    });
  }
  var _default = exports.default = FormNewsletter;
