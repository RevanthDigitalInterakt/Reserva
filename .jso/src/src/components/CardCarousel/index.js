  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CardCarousel = CardCarousel;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNativeReanimatedCarousel = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _CarouselPaginationItem = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CardCarousel(_ref) {
    var bannerCarousel = _ref.bannerCarousel;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[8]).useNavigation)();
    var $carousel = (0, _react.useRef)();
    var progressValue = (0, _$$_REQUIRE(_dependencyMap[9]).useSharedValue)(0);
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      currIndex = _useState2[0],
      setCurrIndex = _useState2[1];
    var handleNavigation = function handleNavigation(id) {
      var _id$split = id.split(':'),
        _id$split2 = (0, _slicedToArray2.default)(_id$split, 2),
        categoryType = _id$split2[0],
        categoryData = _id$split2[1];
      if (categoryType === 'product') {
        navigation.navigate('ProductDetail', {
          productId: categoryData,
          itemId: categoryData
        });
        return;
      }
      var navigateParams = {
        referenceId: id
      };
      navigation.navigate('ProductCatalog', navigateParams);
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
      style: {
        padding: 16,
        gap: 12
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
        fontFamily: "reservaSerifBold",
        fontSize: 18,
        children: bannerCarousel.title
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNativeReanimatedCarousel.default, Object.assign({}, (0, _testProps.default)('default_carrousel_content'), {
        loop: true,
        width: _configDeviceSizes.default.DEVICE_WIDTH,
        height: 152,
        ref: function ref(carousel) {
          if (carousel) $carousel.current = carousel;
        },
        mode: "parallax",
        modeConfig: {
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 130
        },
        enabled: bannerCarousel.items.length > 1,
        onProgressChange: function onProgressChange(_, absoluteProgress) {
          progressValue.value = absoluteProgress;
        },
        panGestureHandlerProps: {
          activeOffsetX: [-10, 10]
        },
        data: bannerCarousel.items,
        onSnapToItem: setCurrIndex,
        defaultIndex: 0,
        style: {
          position: 'relative'
        },
        renderItem: function renderItem(_ref2) {
          var item = _ref2.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Pressable, Object.assign({}, (0, _testProps.default)('carrousel_button'), {
            onPress: function onPress() {
              return handleNavigation(item.id);
            },
            delayLongPress: 100,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Image, {
              style: {
                width: 242,
                height: 152,
                borderRadius: 15
              },
              source: {
                uri: item.banner
              }
            })
          }));
        }
      })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
        style: [_$$_REQUIRE(_dependencyMap[12]).styles.bulletsWrapper, {
          width: bannerCarousel.items.length * 24.5
        }],
        children: bannerCarousel.items.map(function (item, i) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_CarouselPaginationItem.default, {
            backgroundColor: _$$_REQUIRE(_dependencyMap[13]).COLORS.BLACK,
            borderColor: "#C3C7CD",
            animValue: progressValue,
            index: i,
            actualPosition: currIndex,
            length: bannerCarousel.items.length,
            slideDelay: 10000,
            onFinishAnimation: function onFinishAnimation() {
              var _$carousel$current;
              return (_$carousel$current = $carousel.current) == null ? undefined : _$carousel$current.next();
            }
          }, `offers-page-banner-carousel-${item.banner}`);
        })
      })]
    });
  }
