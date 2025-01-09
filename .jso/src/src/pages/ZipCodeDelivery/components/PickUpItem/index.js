  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = PickUpItem;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function PickUpItem(_ref) {
    var store = _ref.store,
      deliveryOptions = _ref.deliveryOptions,
      deliveryOptionsStore = _ref.deliveryOptionsStore;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[5]).useBagStore)(['actions']),
      actions = _useBagStore.actions;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)();
    var handleSetPickUpItemStore = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      yield actions.ADD_DELIVERY_TO_PICKUP_IN_POINT(deliveryOptionsStore, store.address);
      actions.ADD_DELIVERY_TYPE('Retire em loja', store.friendlyName);
      navigation == null ? undefined : navigation.goBack();
    }), [store, deliveryOptions, deliveryOptionsStore]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
      onPress: handleSetPickUpItemStore,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[8]).pickUpItemStyle.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[8]).pickUpItemStyle.textWrapper,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[8]).pickUpItemStyle.friendlyNameText,
            children: store.friendlyName
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[8]).pickUpItemStyle.addressText,
            children: [store.address.street, ",", store.address.complement, ",", store.address.neighborhood, "-", store.address.city, "-", store.address.state]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconComponent.default, {
          icon: "chevronRight"
        })]
      })
    });
  }
