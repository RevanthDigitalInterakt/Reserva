  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getProductLoadType = getProductLoadType;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function getProductLoadType(params) {
    var conditions = [[params.slug, _$$_REQUIRE(_dependencyMap[2]).GetProductTypeEnum.Slug], [params.productId, _$$_REQUIRE(_dependencyMap[2]).GetProductTypeEnum.ProductId], [params.idsku || params.skuId, _$$_REQUIRE(_dependencyMap[2]).GetProductTypeEnum.SkuId]];
    var _ref = conditions.find(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
          conditional = _ref4[0];
        return !!conditional;
      }) || [],
      _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      value = _ref2[0],
      type = _ref2[1];
    if (!type || !value) {
      throw new Error('Parâmetros inválidos');
    }
    return {
      type: type,
      value: value,
      colorId: ((params == null ? undefined : params.colorSelected) || '').trim(),
      itemId: ((params == null ? undefined : params.itemId) || (params == null ? undefined : params.skuId) || (params == null ? undefined : params.idsku) || '').trim()
    };
  }
