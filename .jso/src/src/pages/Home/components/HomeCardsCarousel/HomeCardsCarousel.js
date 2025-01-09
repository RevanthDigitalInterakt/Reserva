  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _HomeCard = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function HomeCardsCarousel(_ref) {
    var data = _ref.data;
    var scrollX = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, Object.assign({}, (0, _testProps.default)('cards_carrousel_container'), {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Animated.FlatList, Object.assign({}, (0, _testProps.default)('cards_carrousel_animated_flat_list'), {
        onScroll: _reactNative.Animated.event([{
          nativeEvent: {
            contentOffset: {
              x: scrollX
            }
          }
        }], {
          useNativeDriver: true
        }),
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        data: data.items,
        snapToOffsets: (0, _toConsumableArray2.default)(Array(data.items.length)).map(function (_x, i) {
          return i * (_configDeviceSizes.default.DEVICE_WIDTH * 0.85 - 48) + (i - 1) * 48;
        }),
        keyExtractor: function keyExtractor(item) {
          return `card-home-${item.image.url}`;
        },
        snapToAlignment: "start",
        scrollEventThrottle: 16,
        decelerationRate: "fast",
        contentContainerStyle: _$$_REQUIRE(_dependencyMap[9]).styles.flatListContainer,
        bounces: false,
        renderItem: function renderItem(_ref2) {
          var _item$filters;
          var item = _ref2.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_HomeCard.default, {
            imageUrl: item.image.url,
            reference: item.reference,
            reservaMini: item.reservaMini,
            orderBy: item.orderBy,
            filters: {
              priceFilter: item == null ? undefined : (_item$filters = item.filters) == null ? undefined : _item$filters.priceFilter
            }
          });
        }
      })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
        height: 24,
        flexDirection: "row",
        alignSelf: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Animated.View, Object.assign({}, (0, _testProps.default)('com.usereserva:id/cards_carrousel_animated_view'), {
          style: [_$$_REQUIRE(_dependencyMap[9]).styles.slidingIndicatorStyle, {
            position: 'absolute',
            transform: [{
              translateX: _reactNative.Animated.divide(scrollX, _configDeviceSizes.default.DEVICE_WIDTH * 0.88 - 48).interpolate({
                inputRange: [0, 1],
                outputRange: [6, 25.8]
              })
            }]
          }]
        })), data.items.map(function (item) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[9]).styles.bulletsWrapper,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
              style: _$$_REQUIRE(_dependencyMap[9]).styles.bullet
            })
          }, `cards-item-${item.image.url}`);
        })]
      })]
    }));
  }
  var _default = exports.default = HomeCardsCarousel;
