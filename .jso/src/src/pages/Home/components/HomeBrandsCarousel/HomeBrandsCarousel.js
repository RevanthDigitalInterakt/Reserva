  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _NewBanner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function HomeBrandsCarousel(_ref) {
    var data = _ref.data;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[8]).useNavigation)();
    var _useWindowDimensions = (0, _reactNative.useWindowDimensions)(),
      width = _useWindowDimensions.width;
    var _onPress = (0, _react.useCallback)(function (reference) {
      _EventProvider.default.logEvent('carousel_brand_click', {
        reference: reference
      });
      if (!reference) {
        navigation.navigate('ProductCatalog');
      }
      navigation.navigate('ProductCatalog', {
        referenceId: reference
      });
    }, [navigation]);
    if (data.items.length <= 1) {
      var _data$items = (0, _slicedToArray2.default)(data.items, 1),
        item = _data$items[0];
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_NewBanner.default, {
        facets: item.facets,
        image: item.image.url,
        orderBy: item.orderBy,
        reference: item.reference,
        reservaMini: item.reservaMini
      });
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.FlatList, Object.assign({}, (0, _testProps.default)('brands_flatList'), {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      data: data.items,
      scrollEnabled: data.items.length > 4,
      snapToAlignment: "start",
      style: _$$_REQUIRE(_dependencyMap[10]).styles.carousel,
      keyExtractor: function keyExtractor(item) {
        return `idx-brands-${item.image.url}`;
      },
      contentContainerStyle: _$$_REQUIRE(_dependencyMap[10]).styles.contentContainerCarousel,
      scrollEventThrottle: 16,
      decelerationRate: "fast",
      renderItem: function renderItem(_ref2) {
        var _ref2$item = _ref2.item,
          image = _ref2$item.image,
          reference = _ref2$item.reference,
          index = _ref2.index;
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).BrandContainer, Object.assign({}, (0, _testProps.default)(`brands_brand_container-${index}`), {
          deviceWidth: width,
          index: index,
          onPress: function onPress() {
            return _onPress(reference);
          },
          lastIndex: data.items.length,
          style: _$$_REQUIRE(_dependencyMap[10]).styles.brandShadowContainer,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_ImageComponent.default, {
            source: {
              uri: image.url
            },
            style: {
              maxHeight: 20,
              width: 60,
              height: 20,
              maxWidth: 60
            }
          })
        }));
      }
    }));
  }
  var _default = exports.default = HomeBrandsCarousel;
