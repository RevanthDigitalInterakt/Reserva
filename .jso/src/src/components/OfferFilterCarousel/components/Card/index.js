  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Card = Card;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function Card(_ref) {
    var imageUrl = _ref.imageUrl,
      handleRedirectToCatalog = _ref.handleRedirectToCatalog;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TouchableOpacity, {
      onPress: handleRedirectToCatalog,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.ImageBackground, Object.assign({
        imageStyle: {
          borderRadius: 8
        },
        style: _$$_REQUIRE(_dependencyMap[5]).styles.container,
        source: imageUrl ? {
          uri: imageUrl
        } : _$$_REQUIRE(_dependencyMap[6]).commons.cardImage
      }, (0, _testProps.default)('imageBackground')))
    });
  }
