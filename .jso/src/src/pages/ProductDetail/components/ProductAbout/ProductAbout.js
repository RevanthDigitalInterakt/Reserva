  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _ProductDescription = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductAbout() {
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[6]).useProductDetailStore)(['productDetail', 'selectedSize']),
      productDetail = _useProductDetailStor.productDetail,
      selectedSize = _useProductDetailStor.selectedSize;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showSection = _useState2[0],
      setShowSection = _useState2[1];
    var data = (0, _react.useMemo)(function () {
      return productDetail == null ? undefined : productDetail.properties;
    }, [productDetail]);
    var ean = (0, _react.useMemo)(function () {
      return selectedSize == null ? undefined : selectedSize.ean;
    }, [selectedSize]);
    var onToggle = (0, _react.useCallback)(function (show) {
      setShowSection(show);
      _EventProvider.default.logEvent('product_view_about', {
        show: show ? 1 : 0,
        product_id: (productDetail == null ? undefined : productDetail.productId) || ''
      });
    }, [productDetail]);
    if (!productDetail || !(data != null && data.description)) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, Object.assign({}, (0, _testProps.default)('about_this_product_button'), {
        variant: "semBorda",
        onPress: function onPress() {
          return onToggle(!showSection);
        },
        flexDirection: "row",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
          children: [showSection ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
            alignSelf: "center",
            paddingRight: "quarck",
            paddingLeft: "quarck",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).IconLegacy, {
              name: "Subtraction",
              color: "fullBlack",
              size: 20
            })
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
            alignSelf: "center",
            paddingRight: "nano",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).IconLegacy, {
              name: "Add",
              color: "fullBlack",
              size: 20
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
            flex: 1,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
              fontFamily: "reservaSerifRegular",
              fontSize: 20,
              children: "Sobre este produto"
            })
          })]
        })
      })), showSection && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
        children: [!!(data != null && data.description) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ProductDescription.default, Object.assign({
          title: "Detalhes do Produto",
          description: data.description
        }, (0, _testProps.default)('details_product'))), !!(data != null && data.composition) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ProductDescription.default, Object.assign({
          title: "Composi\xE7\xE3o",
          description: data.composition
        }, (0, _testProps.default)('composition'))), !!ean && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ProductDescription.default, Object.assign({
          title: "C\xF3digo do Produto",
          description: `Ref: ${ean}`
        }, (0, _testProps.default)('code')))]
      })]
    });
  }
  var _default = exports.default = ProductAbout;
