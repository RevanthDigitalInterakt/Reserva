  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = NotFoundProduct;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NotFoundProduct() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[2]).useBagStore)(['productNotFound', 'actions']),
      productNotFound = _useBagStore.productNotFound,
      actions = _useBagStore.actions;
    var refs = {
      animatedViewRef: (0, _react.useRef)(null)
    };
    var handleSetNotFoundProduct = (0, _react.useCallback)(function () {
      actions.CLEAR_PRODUCT_NOT_FOUND();
    }, [actions]);
    (0, _react.useEffect)(function () {
      if (refs.animatedViewRef.current) {
        if (refs.animatedViewRef.current.slideInDown) {
          refs.animatedViewRef.current.slideInDown();
        }
      }
    }, [refs.animatedViewRef]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.View, {
      ref: refs.animatedViewRef,
      testID: "com.usereserva:id/NotFoundProduct_container",
      animation: "slideInDown",
      useNativeDriver: true,
      style: {
        elevation: 10,
        position: 'absolute',
        right: 0,
        left: 0,
        zIndex: 2
      },
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        minHeight: 60,
        bg: "white",
        paddingLeft: "xxxs",
        py: "micro",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: "xxxs",
        boxShadow: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[5]).platformType.IOS ? 'topBarShadow' : null,
        style: {
          elevation: 10
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          flex: 1,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 13,
            color: "preto",
            children: `${productNotFound}`
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
          testID: "com.usereserva:id/NotFoundProduct_setProduct",
          flex: 1,
          onPress: handleSetNotFoundProduct,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[8]).IconLegacy, {
            name: "Close",
            size: 15,
            color: "preto",
            ml: "xxxs"
          })
        })]
      })
    });
  }
