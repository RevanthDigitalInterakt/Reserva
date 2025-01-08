  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _TitleFilter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _RadioButtonsFilter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function FilterSizes(_ref) {
    var data = _ref.data,
      selectedItems = _ref.selectedItems,
      onUpdate = _ref.onUpdate;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showSection = _useState2[0],
      setShowSection = _useState2[1];
    var sizes = (0, _react.useMemo)(function () {
      return data.map(function (item) {
        return Object.assign({}, item, {
          value: item.value
        });
      });
    }, [data]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_TitleFilter.default, {
        showMore: showSection,
        setShowMore: setShowSection,
        showSeeMoreButton: data.length > 6,
        title: "Tamanho"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        paddingY: "micro",
        paddingX: "micro",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_RadioButtonsFilter.default, {
          onSelectedChange: function onSelectedChange(size) {
            var items = size.filter(Boolean);
            onUpdate(new Set(items));
          },
          disabledOptions: [],
          defaultSelectedItem: Array.from(selectedItems),
          size: "34px",
          fontSize: "10px",
          optionsList: showSection ? sizes : sizes.slice(0, 5)
        })
      })]
    });
  }
  var _default = exports.default = FilterSizes;
