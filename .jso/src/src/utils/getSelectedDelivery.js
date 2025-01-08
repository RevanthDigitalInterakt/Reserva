  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getSelectedDelivery = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var getSelectedDelivery = exports.getSelectedDelivery = function getSelectedDelivery(packageItems) {
    var _packageItems$map$fil = packageItems.map(function (subPackage) {
        var _subPackage$metadata, _subPackage$metadata2;
        if (!!((_subPackage$metadata = subPackage.metadata) != null && _subPackage$metadata.friendlyName) && ((_subPackage$metadata2 = subPackage.metadata) == null ? undefined : _subPackage$metadata2.friendlyName) !== 'Receba em Casa') {
          var _subPackage$metadata3;
          return {
            type: 'Retire em loja',
            store: (_subPackage$metadata3 = subPackage.metadata) == null ? undefined : _subPackage$metadata3.friendlyName
          };
        }
        return null;
      }).filter(Boolean),
      _packageItems$map$fil2 = (0, _slicedToArray2.default)(_packageItems$map$fil, 1),
      deliveryOption = _packageItems$map$fil2[0];
    return {
      type: (deliveryOption == null ? undefined : deliveryOption.type) || 'Receba em casa',
      store: (deliveryOption == null ? undefined : deliveryOption.store) || ''
    };
  };
