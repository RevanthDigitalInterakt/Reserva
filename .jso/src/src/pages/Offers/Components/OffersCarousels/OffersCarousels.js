  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OffersCarousels = OffersCarousels;
  var _defineProperty2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _OffersMainCarousel = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function OffersCarousels() {
    var _useHomeStore = (0, _$$_REQUIRE(_dependencyMap[6]).useHomeStore)(['offersCarousels', 'loading']),
      offersCarousels = _useHomeStore.offersCarousels,
      loading = _useHomeStore.loading;
    var renderCarousel = (0, _react.useCallback)(function (item) {
      if (!item.items.length) return null;
      var relationalObject = (0, _defineProperty2.default)((0, _defineProperty2.default)({}, _$$_REQUIRE(_dependencyMap[7]).HomePageSectionTypeEnum.Main, function () {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_OffersMainCarousel.default, {
          data: item
        });
      }), "DEFAULT", function DEFAULT() {
        return null;
      });
      return (relationalObject[item.type] || relationalObject.DEFAULT)();
    }, []);
    if (loading) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        bg: "white",
        marginY: "nano",
        justifyContent: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
          style: {
            height: 100
          }
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.ActivityIndicator, {
          size: "small",
          color: _$$_REQUIRE(_dependencyMap[10]).COLORS.BLACK
        })]
      });
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
      style: {
        height: 400
      },
      children: offersCarousels.map(function (carousel) {
        return /*#__PURE__*/(0, _react.createElement)(_reactNative.View, Object.assign({}, (0, _testProps.default)('carousels_cards'), {
          key: `offers-item-${carousel.type}-${carousel.showtime}-${carousel.items.length}`
        }), renderCarousel(carousel));
      })
    });
  }
