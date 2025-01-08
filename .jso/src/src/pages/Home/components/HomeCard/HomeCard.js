  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function HomeCard(_ref) {
    var imageUrl = _ref.imageUrl,
      reference = _ref.reference,
      reservaMini = _ref.reservaMini,
      orderBy = _ref.orderBy,
      filters = _ref.filters;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    var handleNavigation = function handleNavigation() {
      var _filters$priceFilter, _filters$priceFilter2, _filters$priceFilter3;
      var _reference$split = reference.split(':'),
        _reference$split2 = (0, _slicedToArray2.default)(_reference$split, 2),
        categoryType = _reference$split2[0],
        categoryData = _reference$split2[1];
      if (categoryType === 'product') {
        _EventProvider.default.logEvent('page_view', {
          item_brand: _$$_REQUIRE(_dependencyMap[8]).defaultBrand.picapau
        });
        _EventProvider.default.logEvent('select_item', {
          item_list_id: categoryData || '',
          item_list_name: '',
          item_brand: _$$_REQUIRE(_dependencyMap[8]).defaultBrand.reserva
        });
        navigation.navigate('ProductDetail', {
          productId: categoryData,
          itemId: categoryData,
          colorSelected: '#FFFFFF'
        });
        return;
      }
      var navigateParams = {
        referenceId: reference,
        reservaMini: reservaMini,
        orderBy: orderBy
      };
      if ((filters != null && (_filters$priceFilter = filters.priceFilter) != null && _filters$priceFilter.from || (filters == null ? undefined : (_filters$priceFilter2 = filters.priceFilter) == null ? undefined : _filters$priceFilter2.from) === null) && filters != null && (_filters$priceFilter3 = filters.priceFilter) != null && _filters$priceFilter3.to) {
        var _filters$priceFilter4, _filters$priceFilter5;
        navigateParams = Object.assign({}, navigateParams, {
          filters: {
            priceFilter: {
              from: (filters == null ? undefined : (_filters$priceFilter4 = filters.priceFilter) == null ? undefined : _filters$priceFilter4.from) || 0,
              to: (filters == null ? undefined : (_filters$priceFilter5 = filters.priceFilter) == null ? undefined : _filters$priceFilter5.to) || 0
            }
          }
        });
      }
      navigation.navigate('ProductCatalog', navigateParams);
    };
    if (!imageUrl) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, Object.assign({}, (0, _testProps.default)(`card_container_${reference}`), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Button, Object.assign({
        onPress: handleNavigation
      }, (0, _testProps.default)(`card_button_${reference}`), {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_ImageComponent.default, {
          height: 280,
          width: _configDeviceSizes.default.DEVICE_WIDTH * 0.85 - 16,
          source: {
            uri: imageUrl
          }
        })
      }))
    }));
  }
  var _default = exports.default = HomeCard;
