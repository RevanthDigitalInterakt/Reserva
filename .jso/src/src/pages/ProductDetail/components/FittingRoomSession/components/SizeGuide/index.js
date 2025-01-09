  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.SizeGuideImages = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function SizesGuidesCarrousel(_ref) {
    var images = _ref.images,
      onClose = _ref.onClose;
    var IMAGES_PROPORTION = 1.7;
    var CARD_WIDTH = _configDeviceSizes.default.DEVICE_WIDTH * 0.92;
    var CARD_HEIGHT = CARD_WIDTH * IMAGES_PROPORTION;
    var CARD_PADDING = (_configDeviceSizes.default.DEVICE_WIDTH - CARD_WIDTH) * 0.5;
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      actualPosition = _useState2[0],
      setActualPosition = _useState2[1];
    var onViewRef = _react.default.useRef(function (_ref2) {
      var viewableItems = _ref2.viewableItems;
      if (!!viewableItems && !!viewableItems[0]) {
        setActualPosition(viewableItems[0].index);
      }
    });
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.FlatList, {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        data: images,
        onViewableItemsChanged: onViewRef.current,
        contentContainerStyle: {
          margin: 0,
          padding: 0,
          alignItems: 'center'
        },
        snapToInterval: _configDeviceSizes.default.DEVICE_WIDTH,
        snapToAlignment: "center",
        pagingEnabled: true,
        bounces: false,
        disableIntervalMomentum: true,
        testID: "com.usereserva:id/size_guide_list",
        onScrollEndDrag: function onScrollEndDrag() {},
        renderItem: function renderItem(_ref3) {
          var item = _ref3.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            style: {
              paddingRight: CARD_PADDING,
              paddingLeft: CARD_PADDING,
              width: _configDeviceSizes.default.DEVICE_WIDTH,
              height: _configDeviceSizes.default.DEVICE_HEIGHT,
              justifyContent: 'center'
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                height: 40,
                width: 40,
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 16,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Button, {
                  testID: "com.usereserva:id/size_guides_button_product_details",
                  style: {
                    width: 40,
                    height: 40,
                    zIndex: 16
                  },
                  onPress: onClose
                })
              }), item ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_ImageComponent.default, {
                source: item,
                style: {
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT
                }
              }) : null]
            })
          });
        }
      }), images.length > 1 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        flexDirection: "row",
        position: "absolute",
        bottom: (_configDeviceSizes.default.DEVICE_HEIGHT - CARD_WIDTH * IMAGES_PROPORTION) / 2 - 18,
        children: images.map(function (_image, index) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            style: {
              width: 6,
              height: 6,
              marginRight: 8,
              backgroundColor: actualPosition === index ? '#fff' : 'transparent',
              borderColor: '#fff',
              borderRadius: 3,
              borderWidth: 1
            }
          });
        })
      })]
    });
  }
  var SizeGuideImages = exports.SizeGuideImages = Object.freeze({
    camisas: [_icons.default.GuideMangaCurta, _icons.default.GuideMangaLonga],
    camisetas: [_icons.default.GuideCamiseta],
    polos: [_icons.default.GuidePolo],
    casacos: [_icons.default.GuideHoodie, _icons.default.GuideJaqueta, _icons.default.GuideSueter],
    calças: [_icons.default.GuideCalca],
    shorts: [_icons.default.GuideShort],
    bermudas: [_icons.default.GuideBermuda],
    sungas: [_icons.default.GuideSungaCueca]
  });
  function SizeGuide(_ref4) {
    var categoryTree = _ref4.categoryTree,
      productId = _ref4.productId,
      enabledBtnFullSizeGuide = _ref4.enabledBtnFullSizeGuide;
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isVisible = _useState4[0],
      setIsVisible = _useState4[1];
    var handleCategoryImage = function handleCategoryImage() {
      var categoryNames = categoryTree.map(function (category) {
        return category.name;
      });
      var categoryName = categoryNames.find(function (category) {
        return category in SizeGuideImages;
      });
      return SizeGuideImages[categoryName];
    };
    var onShow = (0, _react.useCallback)(function () {
      setIsVisible(true);
      if (productId) {
        _EventProvider.default.logEvent('product_view_size_guide', {
          show: 1,
          product_id: productId
        });
      }
    }, [productId]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.View, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('size_guides_button_product_details'), {
          onPress: onShow,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_reactNative.View, {
            style: enabledBtnFullSizeGuide ? _styles.default.containerBtnSizeGuideFull : _styles.default.containerBtnSizeGuide,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_IconComponent.default, {
              icon: "sizeGuideIcon"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.Text, {
              style: _styles.default.txtSizeGuide,
              children: "guia de medidas"
            })]
          })
        }))
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.Modal, {
        visible: isVisible,
        transparent: true,
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'absolute',
          top: 0,
          left: 0,
          elevation: 5,
          zIndex: 5
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          style: {
            width: _configDeviceSizes.default.DEVICE_WIDTH,
            height: _configDeviceSizes.default.DEVICE_HEIGHT,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center'
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(SizesGuidesCarrousel, {
            images: handleCategoryImage(),
            onClose: function onClose() {
              return setIsVisible(false);
            }
          })
        })
      })]
    });
  }
  var _default = exports.default = SizeGuide;
