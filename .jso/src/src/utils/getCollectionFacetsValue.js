  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getCollectionFacetsValue = getCollectionFacetsValue;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function getCollectionFacetsValue(facets) {
    if (!(facets != null && facets.length)) return '';
    var collectionFacets = facets.filter(function (_ref) {
      var name = _ref.name,
        key = _ref.key;
      return name === 'productClusterNames' || key === 'productClusterIds';
    });
    var _collectionFacets = (0, _slicedToArray2.default)(collectionFacets, 1),
      items = _collectionFacets[0];
    var values = ((items == null ? undefined : items.values) || []).map(function (_ref2) {
      var value = _ref2.value;
      return value == null ? undefined : value.replace(/-+/g, '-');
    });
    return values.join(', ');
  }
