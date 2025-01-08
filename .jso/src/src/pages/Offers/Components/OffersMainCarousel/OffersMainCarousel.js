  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNativeReanimatedCarousel = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _CarouselPaginationItem = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function OffersMainCarousel(_ref) {
    var data = _ref.data;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[10]).useNavigation)();
    var progressValue = (0, _$$_REQUIRE(_dependencyMap[11]).useSharedValue)(0);
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      currIndex = _useState2[0],
      setCurrIndex = _useState2[1];
    var carouselRef = (0, _react.useRef)();
    var slideDelay = (0, _react.useMemo)(function () {
      return (data.showtime || 10) * 1000;
    }, [data.showtime]);
    var _onPress = (0, _react.useCallback)(function (item) {
      var _item$filters, _item$filters$priceFi, _item$filters2, _item$filters2$priceF, _item$filters3, _item$filters3$priceF;
      var reservaMini = item.reservaMini,
        orderBy = item.orderBy;
      var navigateParams = {
        facetInput: item.facets,
        referenceId: item.reference,
        reservaMini: reservaMini,
        orderBy: orderBy
      };
      if (((_item$filters = item.filters) != null && (_item$filters$priceFi = _item$filters.priceFilter) != null && _item$filters$priceFi.from || ((_item$filters2 = item.filters) == null ? undefined : (_item$filters2$priceF = _item$filters2.priceFilter) == null ? undefined : _item$filters2$priceF.from) === null) && (_item$filters3 = item.filters) != null && (_item$filters3$priceF = _item$filters3.priceFilter) != null && _item$filters3$priceF.to) {
        var _item$filters4, _item$filters4$priceF, _item$filters5, _item$filters5$priceF;
        navigateParams.filters = {
          priceFilter: {
            from: ((_item$filters4 = item.filters) == null ? undefined : (_item$filters4$priceF = _item$filters4.priceFilter) == null ? undefined : _item$filters4$priceF.from) || 0,
            to: ((_item$filters5 = item.filters) == null ? undefined : (_item$filters5$priceF = _item$filters5.priceFilter) == null ? undefined : _item$filters5$priceF.to) || 0
          }
        };
      }
      _EventProvider.default.logEvent('offers_main_banner_click', {
        category: item.reference
      });
      return navigation.navigate('ProductCatalog', navigateParams);
    }, [navigation]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsxs)(_reactNative.View, Object.assign({
      style: {
        flex: 1
      }
    }, (0, _testProps.default)('default_carrousel_container'), {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_reactNativeReanimatedCarousel.default, Object.assign({}, (0, _testProps.default)('default_carrousel_content'), {
        loop: true,
        width: _configDeviceSizes.default.DEVICE_WIDTH,
        height: 400,
        ref: function ref(carousel) {
          if (carousel) carouselRef.current = carousel;
        },
        mode: "parallax",
        modeConfig: {
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 50
        },
        enabled: data.items.length > 1,
        onProgressChange: function onProgressChange(_, absoluteProgress) {
          progressValue.value = absoluteProgress;
        },
        panGestureHandlerProps: {
          activeOffsetX: [-10, 10]
        },
        data: data.items,
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          position: 'relative'
        },
        onSnapToItem: function onSnapToItem(index) {
          setCurrIndex(index);
          _EventProvider.default.logEvent('offers_main_banner_slide', {});
        },
        renderItem: function renderItem(_ref2) {
          var item = _ref2.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            alignItems: "flex-start",
            bg: "white",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
              mb: "quarck",
              width: 1,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_reactNative.Pressable, Object.assign({}, (0, _testProps.default)('carrousel_button'), {
                onPress: function onPress() {
                  return _onPress(item);
                },
                delayLongPress: 100,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_ImageComponent.default, {
                  style: [{
                    height: 400
                  }],
                  resizeMode: "cover",
                  source: {
                    uri: item.image.url
                  }
                })
              }))
            })
          });
        }
      })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_reactNative.View, {
        style: [_$$_REQUIRE(_dependencyMap[14]).styles.bulletsWrapper, {
          width: data.items.length * 24.5
        }],
        children: data.items.map(function (item, i) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_CarouselPaginationItem.default, {
            backgroundColor: _$$_REQUIRE(_dependencyMap[15]).COLORS.WHITE,
            animValue: progressValue,
            index: i,
            actualPosition: currIndex,
            length: data.items.length,
            slideDelay: slideDelay,
            onFinishAnimation: function onFinishAnimation() {
              var _carouselRef$current;
              return (_carouselRef$current = carouselRef.current) == null ? undefined : _carouselRef$current.next();
            }
          }, `offers-main-carousel-${item.image.url}`);
        })
      })]
    }));
  }
  var _default = exports.default = OffersMainCarousel;
