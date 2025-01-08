  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _TitleFilter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function FilterPrices(_ref) {
    var data = _ref.data,
      selectedPriceRange = _ref.selectedPriceRange,
      onUpdatePriceRange = _ref.onUpdatePriceRange;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showSection = _useState2[0],
      setShowSection = _useState2[1];
    if (!(data != null && data.from) || !(data != null && data.to)) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_TitleFilter.default, {
        showMore: showSection,
        setShowMore: setShowSection,
        showSeeMoreButton: true,
        title: "Pre\xE7o"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        paddingX: "micro",
        alignSelf: "center",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Range, {
          max: data.to,
          min: data.from,
          onValuesChange: function onValuesChange(prices) {
            var minPrice = prices[0];
            var maxPrice = prices[1];
            onUpdatePriceRange({
              from: minPrice,
              to: maxPrice
            });
          },
          mdxType: "Range",
          originalType: function originalType() {},
          prefix: "R$ ",
          value: [(selectedPriceRange == null ? undefined : selectedPriceRange.from) || data.from, (selectedPriceRange == null ? undefined : selectedPriceRange.to) || data.to],
          width: _configDeviceSizes.default.DEVICE_WIDTH - 100
        })
      })]
    });
  }
  var _default = exports.default = FilterPrices;
