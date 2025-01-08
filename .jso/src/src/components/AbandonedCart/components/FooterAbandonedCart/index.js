  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function FooterAbandonedCart() {
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[5]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useNavigationToDeliv = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigationToDelivery)(),
      handleNavigateToDelivery = _useNavigationToDeliv.handleNavigateToDelivery;
    var isLogged = (0, _react.useMemo)(function () {
      return profile == null ? undefined : profile.email;
    }, [profile]);
    var onClickPurchase = (0, _react.useCallback)(function () {
      try {
        _EventProvider.default.logEvent('abandoned_cart', {
          action: _$$_REQUIRE(_dependencyMap[7]).Actions.click_button_finish_purchase,
          logged: isLogged ? 'logged in' : 'logged out'
        });
        handleNavigateToDelivery(profile, 'Home');
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[8]).ExceptionProvider.captureException(error);
      }
    }, [profile]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TouchableOpacity, Object.assign({
      onPress: function onPress() {
        return onClickPurchase();
      }
    }, (0, _testProps.default)('abandoned_cart_button_finish_purchase'), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, Object.assign({
        style: _$$_REQUIRE(_dependencyMap[10]).styles.container
      }, (0, _testProps.default)('abandoned_cart_footer_container'), {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[10]).styles.textFinishPurchase,
          testID: "com.usereserva:id/abandoned_cart_finish_purchase",
          children: "Finalizar compra"
        })
      }))
    }));
  }
  var _default = exports.default = FooterAbandonedCart;
