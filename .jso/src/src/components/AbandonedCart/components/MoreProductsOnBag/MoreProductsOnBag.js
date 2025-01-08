  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function MoreProductsOnBag() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[5]).useNavigation)();
    var onTouchOpacity = (0, _react.useCallback)(function (action) {
      try {
        _EventProvider.default.logEvent('abandoned_cart', {
          action: action
        });
        navigation.navigate('BagScreen');
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[6]).ExceptionProvider.captureException(error);
      }
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[8]).styles.container,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return onTouchOpacity(_$$_REQUIRE(_dependencyMap[9]).Actions.click_on_card_more_items);
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[8]).styles.childContainer,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconComponent.default, {
            style: _$$_REQUIRE(_dependencyMap[8]).styles.icon,
            icon: "abandonedCartBag"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[8]).styles.textMoreItemsContainer,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[8]).styles.textMoreItems,
              children: "Voc\xEA tem mais produtos"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[8]).styles.textMoreItems,
              children: "na sacola"
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[8]).styles.textSeeAllProductsContainer,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[8]).styles.textSeeAllProducts,
              children: "Visualizar todos produtos"
            })
          })]
        })
      })
    });
  }
  var _default = exports.default = MoreProductsOnBag;
