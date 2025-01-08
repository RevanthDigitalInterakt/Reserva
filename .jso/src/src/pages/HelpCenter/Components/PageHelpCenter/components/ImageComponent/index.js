  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ImageComponent;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function ImageComponent(_ref) {
    var _data$items$, _images$items;
    var data = _ref.data;
    if (!(data != null && data.items)) return null;
    var images = data == null ? undefined : (_data$items$ = data.items[0]) == null ? undefined : _data$items$.helpCenterImagesCollection;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
      children: images && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _styles.default.containerImage,
        children: images == null ? undefined : (_images$items = images.items) == null ? undefined : _images$items.map(function (image) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Image, {
            source: {
              uri: image == null ? undefined : image.url
            },
            style: {
              height: _configDeviceSizes.default.DEVICE_WIDTH * 0.5
            },
            resizeMode: "contain"
          }, `image-helpCenter-${image == null ? undefined : image.url}`);
        })
      })
    });
  }
