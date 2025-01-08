  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Description() {
    var _productDetail$proper;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[6]).useProductDetailStore)(['productDetail']),
      productDetail = _useProductDetailStor.productDetail;
    var description = productDetail == null ? undefined : (_productDetail$proper = productDetail.properties) == null ? undefined : _productDetail$proper.description;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      expand = _useState2[0],
      setExpand = _useState2[1];
    if (!description) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
      style: _styles.default.mainContainer,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
        style: _styles.default.divider
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setExpand(!expand);
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _styles.default.containerIcon,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconComponent.default, {
            icon: expand ? 'subtraction' : 'addition',
            width: 32,
            height: 32
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
            style: _styles.default.textAbout,
            children: "Sobre este produto"
          })]
        })
      }), expand && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
        style: _styles.default.textDescription,
        children: description
      })]
    });
  }
  var _default = exports.default = Description;
