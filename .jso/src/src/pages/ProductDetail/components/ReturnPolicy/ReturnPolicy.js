  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ReturnPolicy() {
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[8]).useProductDetailStore)(['productDetail']),
      productDetail = _useProductDetailStor.productDetail;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showSection = _useState2[0],
      setShowSection = _useState2[1];
    var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      returnPolicy = _useState4[0],
      setReturnPolicy = _useState4[1];
    var _useReturnPolicyConfi = (0, _$$_REQUIRE(_dependencyMap[9]).useReturnPolicyConfigLazyQuery)({
        context: {
          clientName: 'gateway'
        }
      }),
      _useReturnPolicyConfi2 = (0, _slicedToArray2.default)(_useReturnPolicyConfi, 1),
      getReturnPolicy = _useReturnPolicyConfi2[0];
    var fetchReturnPolicy = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var _policy$data, _policy$data$config;
        var policy = yield getReturnPolicy();
        var returnPolicyText = policy == null ? undefined : (_policy$data = policy.data) == null ? undefined : (_policy$data$config = _policy$data.config) == null ? undefined : _policy$data$config.returnPolicy;
        setReturnPolicy(returnPolicyText);
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(e);
      }
    }), []);
    (0, _react.useEffect)(function () {
      fetchReturnPolicy();
    }, [fetchReturnPolicy]);
    var onToggle = (0, _react.useCallback)(function (show) {
      _EventProvider.default.logEvent('return_policy_click', {
        item_id: productDetail == null ? undefined : productDetail.productId
      });
      setShowSection(show);
    }, [productDetail]);
    if (!productDetail || !returnPolicy) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Divider, {
        variant: "fullWidth",
        my: "xs"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, Object.assign({}, (0, _testProps.default)('return_policy_button'), {
        variant: "semBorda",
        onPress: function onPress() {
          return onToggle(!showSection);
        },
        flexDirection: "row",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
          children: [showSection ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            alignSelf: "center",
            paddingRight: "quarck",
            paddingLeft: "quarck",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[15]).IconLegacy, {
              name: "Subtraction",
              color: "fullBlack",
              size: 20
            })
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            alignSelf: "center",
            paddingRight: "nano",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[15]).IconLegacy, {
              name: "Add",
              color: "fullBlack",
              size: 20
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            flex: 1,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
              fontFamily: "reservaSerifRegular",
              fontSize: 20,
              children: "Troca e Devolu\xE7\xE3o"
            })
          })]
        })
      })), showSection && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.View, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.View, {
          style: _styles.default.container,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.Text, {
            style: _styles.default.description,
            children: returnPolicy
          })
        })
      })]
    });
  }
  var _default = exports.default = ReturnPolicy;
