  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _useSearchStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _FilterModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function SearchResultHeader(_ref) {
    var defaultFacets = _ref.defaultFacets;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      filterVisible = _useState2[0],
      setFilterVisible = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      sortVisible = _useState4[0],
      setSortVisible = _useState4[1];
    var _useSearchStore = (0, _useSearchStore2.default)(['onSearch', 'parameters']),
      onSearch = _useSearchStore.onSearch;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        paddingY: "micro",
        flexDirection: "row",
        justifyContent: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          width: 0.5,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
            onPress: function onPress() {
              return setFilterVisible(true);
            },
            marginRight: "nano",
            marginLeft: "micro",
            borderRadius: "nano",
            borderColor: "dropDownBorderColor",
            borderWidth: "hairline",
            flexDirection: "row",
            inline: true,
            height: 40,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
              color: "preto",
              fontFamily: "nunitoSemiBold",
              fontSize: "14px",
              children: "Filtrar"
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          width: 0.5,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
            marginRight: "micro",
            marginLeft: "nano",
            borderRadius: "nano",
            borderColor: "dropDownBorderColor",
            borderWidth: "hairline",
            flexDirection: "row",
            inline: true,
            height: 40,
            onPress: function onPress() {
              return setSortVisible(true);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
              color: "preto",
              fontFamily: "nunitoSemiBold",
              fontSize: "14px",
              children: "Ordenar"
            })
          })
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_FilterModal.default, {
        visible: filterVisible,
        onClose: function onClose() {
          return setFilterVisible(false);
        },
        defaultFacets: defaultFacets
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Picker, {
        onSelect: function onSelect(item) {
          setSortVisible(false);
          onSearch({
            orderBy: item.value
          });
        },
        isVisible: sortVisible,
        items: _$$_REQUIRE(_dependencyMap[11]).orderByTypes,
        onAndroidBackButtonPress: function onAndroidBackButtonPress() {
          return setSortVisible(false);
        },
        onClose: function onClose() {
          return setSortVisible(false);
        },
        onBackDropPress: function onBackDropPress() {
          return setSortVisible(false);
        },
        title: "Ordenar Por"
      })]
    });
  }
  var _default = exports.default = SearchResultHeader;
