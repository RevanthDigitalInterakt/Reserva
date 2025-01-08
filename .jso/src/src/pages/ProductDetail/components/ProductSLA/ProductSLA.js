  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductSLA() {
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[5]).useProductDetailStore)(['selectedSize', 'initialCep', 'productDetail']),
      selectedSize = _useProductDetailStor.selectedSize,
      productDetail = _useProductDetailStor.productDetail,
      initialCep = _useProductDetailStor.initialCep;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)();
    var _useState = (0, _react.useState)(initialCep || ''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      cep = _useState2[0],
      setCep = _useState2[1];
    var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      validationError = _useState4[0],
      setValidationError = _useState4[1];
    var _useProductDeliveryTi = (0, _$$_REQUIRE(_dependencyMap[7]).useProductDeliveryTimeLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network'
      }),
      _useProductDeliveryTi2 = (0, _slicedToArray2.default)(_useProductDeliveryTi, 2),
      onVerifySLA = _useProductDeliveryTi2[0],
      _useProductDeliveryTi3 = _useProductDeliveryTi2[1],
      data = _useProductDeliveryTi3.data,
      error = _useProductDeliveryTi3.error,
      loading = _useProductDeliveryTi3.loading;
    var onLoad = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        if (loading) return;
        var cepRaw = (0, _$$_REQUIRE(_dependencyMap[8]).removeNonNumbers)(cep);
        if (cepRaw.length !== 8) {
          setValidationError('CEP inválido');
          return;
        }
        yield onVerifySLA({
          variables: {
            input: {
              seller: (selectedSize == null ? undefined : selectedSize.seller) || '',
              id: (selectedSize == null ? undefined : selectedSize.itemId) || '',
              postalCode: cepRaw
            }
          }
        });
        _EventProvider.default.logEvent('product_check_delivery_time', {
          product_id: (productDetail == null ? undefined : productDetail.productId) || '',
          success: 1
        });
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[9]).ExceptionProvider.captureException(err, {
          selectedSize: selectedSize
        });
        _EventProvider.default.logEvent('product_check_delivery_time', {
          product_id: (productDetail == null ? undefined : productDetail.productId) || '',
          success: 0
        });
      }
    }), [onVerifySLA, productDetail, cep, selectedSize, loading]);
    (0, _react.useEffect)(function () {
      setValidationError('');
    }, [cep]);
    if (!selectedSize || !productDetail) {
      return null;
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
        fontFamily: "reservaSerifRegular",
        fontSize: 16,
        children: "Consultar prazo e valor do frete"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        flexDirection: "row",
        mt: "xxxs",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[13]).OutlineInput, {
          testID: "com.usereserva:id/productdetail_input_cep",
          onChangeText: setCep,
          accessibilityLabel: "productdetail_input_cep",
          value: cep,
          placeholder: "Informe seu CEP",
          iconName: "NewSearch",
          keyboardType: "number-pad",
          loading: loading,
          keyboardAppearance: "light",
          maskType: "zip-code",
          onPressIcon: onLoad,
          onSubmitEditing: onLoad
        })
      }), !!validationError && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        mt: "quarck",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
          color: "vermelhoAlerta",
          fontFamily: "nunitoRegular",
          fontSize: 13,
          children: validationError
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
        marginBottom: "nano",
        alignSelf: "flex-start",
        marginTop: "quarck",
        testID: "com.usereserva:id/productdetail_button_cep",
        onPress: function onPress() {
          _EventProvider.default.logEvent('product_find_zipcode', {
            product_id: productDetail.productId
          });
          navigation.navigate('ChangeRegionalization', {
            isCepProductDetail: true
          });
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
          fontFamily: "nunitoRegular",
          fontSize: 14,
          children: "N\xE3o sei meu CEP"
        })
      }), !!(data != null && data.productDeliveryTime && !loading && !error) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Fragment, {
        children: data.productDeliveryTime.map(function (sla, index) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "nano",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              width: "70%",
              alignItems: "left",
              justifyContent: "center",
              borderColor: "divider",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 14,
                children: [sla.estimatedDay, ' ', !sla.isDelivery && 'na loja ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
                  fontFamily: "nunitoBold",
                  children: sla.storeName
                }), ' ']
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              width: "30%",
              alignItems: "flex-end",
              justifyContent: "center",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
                fontFamily: sla.price > 0 ? 'nunitoBold' : 'nunitoRegular',
                fontSize: 14,
                color: sla.price > 0 ? 'preto' : 'verdeSucesso',
                children: sla.price > 0 ? `R$ ${sla.price.toFixed(2)}` : 'GRÁTIS'
              })
            }), index === data.productDeliveryTime.length - 1 ? null : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Divider, {
              backgroundColor: "divider",
              height: 1,
              variant: "fullWidth",
              my: "xs"
            })]
          }, `pdp-sla-${selectedSize == null ? undefined : selectedSize.itemId}-${sla.name}-${sla.estimatedDay}`);
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Divider, {
        variant: "fullWidth",
        my: "xs"
      })]
    });
  }
  var _default = exports.default = ProductSLA;
