  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNativeReanimatedCarousel = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _BulletsAnimatedStick = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _MoreProductsOnBag = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width;
  function ItemAbandonedCart(_ref) {
    var items = _ref.items;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[10]).useNavigation)();
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      currIndex = _useState2[0],
      setCurrIndex = _useState2[1];
    var progressValue = (0, _$$_REQUIRE(_dependencyMap[11]).useSharedValue)(0);
    var $carousel = (0, _react.useRef)();
    var itemsSliced = items == null ? undefined : items.slice(0, 5);
    if ((items == null ? undefined : items.length) > 5) {
      itemsSliced.push({
        index: 6
      });
    }
    var onTouchOpacity = (0, _react.useCallback)(function (action, index) {
      try {
        _EventProvider.default.logEvent('abandoned_cart', {
          action: action,
          index: index
        });
        navigation.navigate('BagScreen');
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[12]).ExceptionProvider.captureException(error);
      }
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNativeReanimatedCarousel.default, Object.assign({}, (0, _testProps.default)('abandoned_cart_carrousel_content'), {
        width: width,
        height: 264,
        ref: function ref(carousel) {
          if (carousel) $carousel.current = carousel;
        },
        mode: "parallax",
        modeConfig: {
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: -20
        },
        enabled: itemsSliced.length > 1,
        pagingEnabled: true,
        onProgressChange: function onProgressChange(_, absoluteProgress) {
          progressValue.value = absoluteProgress;
        },
        panGestureHandlerProps: {
          activeOffsetX: [-10, 10]
        },
        data: itemsSliced,
        onSnapToItem: setCurrIndex,
        style: _$$_REQUIRE(_dependencyMap[14]).styles.carousel,
        renderItem: function renderItem(_ref2) {
          var _item$imageSource, _item$itemSize;
          var item = _ref2.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[14]).styles.container,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.View, {
              style: _$$_REQUIRE(_dependencyMap[14]).styles.childContainer,
              children: [(item == null ? undefined : item.index) <= 5 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Fragment, {
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.TouchableOpacity, {
                  onPress: function onPress() {
                    return onTouchOpacity(_$$_REQUIRE(_dependencyMap[15]).Actions.click_on_image, item == null ? undefined : item.index);
                  },
                  style: _$$_REQUIRE(_dependencyMap[14]).styles.btnImageStyle,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_ImageComponent.default, {
                    source: {
                      uri: item == null ? undefined : (_item$imageSource = item.imageSource) == null ? undefined : _item$imageSource.toString()
                    },
                    width: 130,
                    height: 180,
                    resizeMode: "contain",
                    style: _$$_REQUIRE(_dependencyMap[14]).styles.image
                  })
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.TouchableOpacity, {
                  onPress: function onPress() {
                    return onTouchOpacity(_$$_REQUIRE(_dependencyMap[15]).Actions.click_on_text, item == null ? undefined : item.index);
                  },
                  style: _$$_REQUIRE(_dependencyMap[14]).styles.btnDescriptionStyle,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.View, {
                    style: _$$_REQUIRE(_dependencyMap[14]).styles.descriptionContainer,
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.Text, {
                      numberOfLines: 2,
                      style: _$$_REQUIRE(_dependencyMap[14]).styles.txtTitleItem,
                      children: item == null ? undefined : item.productTitle
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.View, {
                      style: _$$_REQUIRE(_dependencyMap[14]).styles.pricesContainer,
                      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.View, {
                        style: _$$_REQUIRE(_dependencyMap[14]).styles.txtOldPriceContainer,
                        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.Text, {
                          style: _$$_REQUIRE(_dependencyMap[14]).styles.txtOldPrice,
                          children: "De "
                        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[16]).PriceCustom, {
                          color: _$$_REQUIRE(_dependencyMap[17]).COLORS.TEXT_GRAY,
                          fontFamily: _$$_REQUIRE(_dependencyMap[17]).FONTS.RESERVA_SANS_BOLD,
                          sizeInteger: 16,
                          sizeDecimal: 11,
                          num: (item == null ? undefined : item.listPrice) / 100 || 0,
                          lineThroughInteger: true,
                          lineHeight: 22.4
                        })]
                      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[16]).PriceCustom, {
                        color: _$$_REQUIRE(_dependencyMap[17]).COLORS.ENABLED_GREEN,
                        fontFamily: _$$_REQUIRE(_dependencyMap[17]).FONTS.RESERVA_SANS_BOLD,
                        sizeInteger: 16,
                        sizeDecimal: 11,
                        lineHeight: 22.4,
                        num: (item == null ? undefined : item.priceWithDiscount) || 0
                      })]
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.View, {
                      style: _$$_REQUIRE(_dependencyMap[14]).styles.infoContainer,
                      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.View, {
                        style: _$$_REQUIRE(_dependencyMap[14]).styles.txtItemSizeContainer,
                        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.Text, {
                          style: _$$_REQUIRE(_dependencyMap[14]).styles.txtBold,
                          children: ["Tamanho:", ' ']
                        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.Text, {
                          style: _$$_REQUIRE(_dependencyMap[14]).styles.txtGray,
                          children: item == null ? undefined : (_item$itemSize = item.itemSize) == null ? undefined : _item$itemSize.toUpperCase()
                        })]
                      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.View, {
                        style: _$$_REQUIRE(_dependencyMap[14]).styles.txtItemColorContainer,
                        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.Text, {
                          style: _$$_REQUIRE(_dependencyMap[14]).styles.txtBold,
                          children: ["Cor:", ' ']
                        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.Text, {
                          style: _$$_REQUIRE(_dependencyMap[14]).styles.txtGray,
                          children: item == null ? undefined : item.itemColor
                        })]
                      })]
                    })]
                  })
                })]
              }), item.index === 6 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_MoreProductsOnBag.default, {})]
            }, item == null ? undefined : item.index)
          });
        }
      })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.View, {
        style: [_$$_REQUIRE(_dependencyMap[14]).styles.bulletsWrapper, {
          width: itemsSliced.length * 20
        }],
        children: itemsSliced.map(function (item, i) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_BulletsAnimatedStick.default, {
            backgroundColor: _$$_REQUIRE(_dependencyMap[17]).COLORS.DIM_GRAY,
            animValue: progressValue,
            index: i,
            actualPosition: currIndex,
            length: itemsSliced.length
          }, `bullets-${item.index}`);
        })
      })]
    });
  }
  var _default = exports.default = ItemAbandonedCart;
