  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = FittingRoomSession;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _SizeGuide = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _FooterDoris = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _ButtonDoris = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _useDorisStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function FittingRoomSession(_ref) {
    var categoryTree = _ref.categoryTree,
      productId = _ref.productId,
      productEan = _ref.productEan,
      isValidProductDoris = _ref.isValidProductDoris;
    var _useDorisStore = (0, _useDorisStore2.default)(['showAnimationBagDoris', 'setShowAnimationBagDoris']),
      showAnimationBagDoris = _useDorisStore.showAnimationBagDoris,
      setShowAnimationBagDoris = _useDorisStore.setShowAnimationBagDoris;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, Object.assign({}, (0, _testProps.default)('fitting_room_session'), {
      children: [isValidProductDoris && !!(categoryTree != null && categoryTree.length) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Divider, {
        variant: "fullWidth",
        my: "xs"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
        style: _styles.default.childContainer,
        children: [isValidProductDoris && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).ModalBag, {
            isVisible: showAnimationBagDoris,
            onBackdropPress: function onBackdropPress() {
              return setShowAnimationBagDoris(false);
            }
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_ButtonDoris.default, {
            enabledBtnFullDoris: !(categoryTree != null && categoryTree.length),
            productEan: productEan,
            productId: productId
          })]
        }), !!(categoryTree != null && categoryTree.length) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_SizeGuide.default, {
          categoryTree: categoryTree,
          productId: productId,
          enabledBtnFullSizeGuide: !isValidProductDoris
        })]
      }), isValidProductDoris && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_FooterDoris.default, {
        enabledBtnFullDoris: !!(categoryTree != null && categoryTree.length)
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Divider, {
        variant: "fullWidth",
        my: "xs"
      })]
    }));
  }
