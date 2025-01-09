  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.generateFacets = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var IS_CATEGORY_SUBTYPE = 'category';
  var handleReference = function handleReference(reference) {
    if (!reference) return [];
    var selectedFacets = [];
    if (reference.includes('mapField')) {
      var _queryField$split$, _mapField$split$;
      var _reference$split = reference == null ? undefined : reference.split('&'),
        _reference$split2 = (0, _slicedToArray2.default)(_reference$split, 2),
        queryField = _reference$split2[0],
        mapField = _reference$split2[1];
      var arrayQueryField = queryField == null ? undefined : (_queryField$split$ = queryField.split('=')[1]) == null ? undefined : _queryField$split$.split(',');
      var arrayMapField = mapField == null ? undefined : (_mapField$split$ = mapField.split('=')[1]) == null ? undefined : _mapField$split$.split(',');
      if (arrayMapField && arrayQueryField) {
        arrayMapField.forEach(function (key, indexValue) {
          var value = arrayQueryField[indexValue];
          if (!!key && !!value) {
            selectedFacets.push({
              key: key,
              value: value
            });
          }
        });
        return selectedFacets;
      }
    }
    var _reference$split3 = reference.split(':'),
      _reference$split4 = (0, _slicedToArray2.default)(_reference$split3, 2),
      subType = _reference$split4[0],
      subcategories = _reference$split4[1];
    if (!subType || !subcategories) return [];
    if (subType !== IS_CATEGORY_SUBTYPE) {
      selectedFacets.push({
        key: 'productClusterIds',
        value: subcategories
      });
      return selectedFacets;
    }
    subcategories.split('|').forEach(function (sub) {
      if (sub !== '') {
        selectedFacets.push({
          key: 'c',
          value: sub
        });
      }
    });
    return selectedFacets;
  };
  var handleCategories = function handleCategories(categories) {
    var selectedFacets = [];
    categories.forEach(function (category) {
      selectedFacets.push.apply(selectedFacets, (0, _toConsumableArray2.default)(handleReference(category)));
    });
    return selectedFacets;
  };
  var handlePriceFilter = function handlePriceFilter(priceFilter) {
    return {
      key: 'priceRange',
      value: `${priceFilter.from} TO ${priceFilter.to}`
    };
  };
  var generateFacets = exports.generateFacets = function generateFacets(filters) {
    var facets = [];
    if (!filters) return facets;
    var reference = filters.reference,
      categories = filters.categories,
      priceFilter = filters.priceFilter,
      colors = filters.colors,
      sizes = filters.sizes;
    if (reference) facets.push.apply(facets, (0, _toConsumableArray2.default)(handleReference(reference)));
    if (categories) facets.push.apply(facets, (0, _toConsumableArray2.default)(handleCategories(categories)));
    if (priceFilter) facets.push(handlePriceFilter(priceFilter));
    if (colors) facets.push.apply(facets, (0, _toConsumableArray2.default)(colors.map(function (_ref) {
      var key = _ref.key,
        value = _ref.value;
      return {
        key: key,
        value: value
      };
    })));
    if (sizes) facets.push.apply(facets, (0, _toConsumableArray2.default)(sizes.map(function (_ref2) {
      var key = _ref2.key,
        value = _ref2.value;
      return {
        key: key,
        value: value
      };
    })));
    var uniqueFacets = facets.filter(function (facet, index, self) {
      return index === self.findIndex(function (facetItem) {
        return facetItem.key === facet.key && facetItem.value === facet.value;
      });
    });
    return uniqueFacets;
  };
