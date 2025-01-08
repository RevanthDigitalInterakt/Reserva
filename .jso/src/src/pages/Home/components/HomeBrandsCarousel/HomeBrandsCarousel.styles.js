  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = exports.BrandContainer = undefined;
  var _native = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    contentContainerCarousel: {
      paddingHorizontal: 10,
      paddingVertical: 2
    },
    carousel: {
      marginVertical: 13
    },
    brandShadowContainer: {
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2
      },
      shadowOpacity: 0.15,
      shadowRadius: 4
    }
  });
  var BrandContainer = exports.BrandContainer = _native.default.TouchableOpacity`
  width: ${function (_ref) {
    var deviceWidth = _ref.deviceWidth,
      lastIndex = _ref.lastIndex;
    return lastIndex <= 4 ? `${(deviceWidth - (10 * lastIndex - 1) - 10) / lastIndex}px` : '78px';
  }};
  height: 48px;
  max-width: ${function (_ref2) {
    var deviceWidth = _ref2.deviceWidth,
      lastIndex = _ref2.lastIndex;
    return lastIndex <= 4 ? `${(deviceWidth - (10 * lastIndex - 1) - 10) / lastIndex}px` : '78px';
  }};
  max-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #ffffff;
  margin-right: ${function (_ref3) {
    var index = _ref3.index,
      lastIndex = _ref3.lastIndex;
    return index === lastIndex ? '0px' : '10px';
  }};
  margin-top: 10px;
`;
