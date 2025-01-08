  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ButtonDoris;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _useDorisStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ButtonDoris(_ref) {
    var enabledBtnFullDoris = _ref.enabledBtnFullDoris,
      productEan = _ref.productEan,
      productId = _ref.productId;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[9]).useNavigation)();
    var _useDorisStore = (0, _useDorisStore2.default)(['setDorisUrl']),
      setDorisUrl = _useDorisStore.setDorisUrl;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[10]).useBagStore)(['orderFormId']),
      orderFormId = _useBagStore.orderFormId;
    var goToWebviewDoris = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (ean) {
        if (!ean) return;
        setDorisUrl(ean, orderFormId);
        navigation.navigate('Doris');
        if (productId) {
          _EventProvider.default.logEvent('doris_button', {
            product_id: productId,
            product_ean: ean
          });
        }
      });
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_reactNative.View, Object.assign({}, (0, _testProps.default)('component_button_doris'), {
      style: enabledBtnFullDoris ? _styles.default.containerDoris : null,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.View, {
        style: _styles.default.containerNew,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.Text, Object.assign({}, (0, _testProps.default)('txt_new'), {
          style: _styles.default.txtNew,
          children: "NOVO"
        }))
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('button_doris'), {
        onPress: function onPress() {
          return goToWebviewDoris(productEan);
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_reactNative.View, {
          style: enabledBtnFullDoris ? _styles.default.containerBtnDorisFull : _styles.default.containerBtnDoris,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_IconComponent.default, {
            icon: "hanger"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.Text, {
            style: _styles.default.txtDoris,
            children: "vista em voc\xEA"
          })]
        })
      }))]
    }));
  }
