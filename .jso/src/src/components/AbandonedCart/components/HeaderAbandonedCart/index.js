  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconChevronRightSmall = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function HeaderAbandonedCart() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)();
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[7]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var showButtonSeeBag = (0, _react.useMemo)(function () {
      return getBoolean('show_button_see_bag');
    }, []);
    var onClickSeeBag = (0, _react.useCallback)(function () {
      try {
        _EventProvider.default.logEvent('abandoned_cart', {
          action: _$$_REQUIRE(_dependencyMap[8]).Actions.see_bag
        });
        navigation.navigate('BagScreen');
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[9]).ExceptionProvider.captureException(error);
      }
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, Object.assign({
      style: _$$_REQUIRE(_dependencyMap[11]).styles.topContainer
    }, (0, _testProps.default)('abandoned_cart_header_container'), {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, Object.assign({
        style: _$$_REQUIRE(_dependencyMap[11]).styles.txtTitle
      }, (0, _testProps.default)('abandoned_cart_title'), {
        children: "Continue comprando"
      })), showButtonSeeBag && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.TouchableOpacity, Object.assign({
        onPress: function onPress() {
          return onClickSeeBag();
        }
      }, (0, _testProps.default)('abandoned_cart_button_see_bag'), {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, Object.assign({}, (0, _testProps.default)('abandoned_cart_text_see_bag_container'), {
          style: _$$_REQUIRE(_dependencyMap[11]).styles.seeBagContainer,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, Object.assign({}, (0, _testProps.default)('abandoned_cart_text_see_bag'), {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.txtSeeBag,
            children: "Ver sacola"
          })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, Object.assign({
            style: _$$_REQUIRE(_dependencyMap[11]).styles.iconContainer
          }, (0, _testProps.default)('abandoned_cart_icon_container'), {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_IconChevronRightSmall.default, {
              width: 12,
              height: 12
            })
          }))]
        }))
      }))]
    }));
  }
  var _default = exports.default = HeaderAbandonedCart;
