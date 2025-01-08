  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Drawer = Drawer;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _styles = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Drawer(_ref) {
    var children = _ref.children,
      isOpen = _ref.isOpen,
      snapPoints = _ref.snapPoints;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[4]).useProductDetailStore)(['setDrawerIsOpen', 'drawerIsOpen']),
      setDrawerIsOpen = _useProductDetailStor.setDrawerIsOpen,
      drawerIsOpen = _useProductDetailStor.drawerIsOpen;
    var bottomSheetModalRef = (0, _react.useRef)(null);
    (0, _react.useEffect)(function () {
      if (isOpen) {
        var _bottomSheetModalRef$;
        (_bottomSheetModalRef$ = bottomSheetModalRef.current) == null ? undefined : _bottomSheetModalRef$.present();
      } else {
        var _bottomSheetModalRef$2;
        (_bottomSheetModalRef$2 = bottomSheetModalRef.current) == null ? undefined : _bottomSheetModalRef$2.dismiss();
      }
    }, [isOpen]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).BottomSheetModalProvider, {
      children: [drawerIsOpen && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Pressable, {
        onPress: function onPress() {
          return setDrawerIsOpen(false);
        },
        style: _styles.default.dismissOverlay
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _styles.default.container,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).BottomSheetModal, {
          ref: bottomSheetModalRef,
          index: 1,
          snapPoints: snapPoints,
          enableContentPanningGesture: false,
          enableDismissOnClose: true,
          onDismiss: function onDismiss() {
            return setDrawerIsOpen(false);
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            style: _styles.default.contentContainer,
            children: children
          })
        })
      })]
    });
  }
