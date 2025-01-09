  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _TitleFilter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function FilterCategories(_ref) {
    var data = _ref.data,
      selectedItems = _ref.selectedItems,
      onUpdate = _ref.onUpdate;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showSection = _useState2[0],
      setShowSection = _useState2[1];
    var itemsSelected = (0, _react.useMemo)(function () {
      return Array.from(selectedItems).map(function (value) {
        return {
          value: value
        };
      });
    }, [selectedItems]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_TitleFilter.default, {
        showMore: showSection,
        setShowMore: setShowSection,
        showSeeMoreButton: data.length > 6,
        title: "Categorias"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        paddingX: "micro",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).CheckboxListFilter, {
          optionsList: showSection ? data : data.slice(0, 6),
          selectedList: itemsSelected,
          color: "dropDownBorderColor",
          selectedColor: "preto",
          onCheckChange: function onCheckChange(checkBoxList) {
            if (!Array.isArray(checkBoxList)) return;
            var newSet = new Set(checkBoxList.map(function (item) {
              return item.value;
            }));
            onUpdate(newSet);
          }
        })
      })]
    });
  }
  var _default = exports.default = FilterCategories;
