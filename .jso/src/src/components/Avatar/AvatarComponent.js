  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Avatar = Avatar;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function Avatar(_ref) {
    var imageSource = _ref.imageSource,
      _ref$sizeImage = _ref.sizeImage,
      sizeImage = _ref$sizeImage === undefined ? 60 : _ref$sizeImage,
      _ref$sizeButton = _ref.sizeButton,
      sizeButton = _ref$sizeButton === undefined ? 25 : _ref$sizeButton,
      buttonEdit = _ref.buttonEdit,
      _ref$position = _ref.position,
      position = _ref$position === undefined ? {
        top: 0,
        right: 0,
        left: 44
      } : _ref$position,
      onPress = _ref.onPress,
      imageStyle = _ref.imageStyle;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
      height: sizeImage,
      width: sizeImage,
      borderRadius: "infinity",
      bg: "neutroFrio1",
      alignItems: "center",
      justifyContent: "center",
      children: [imageSource ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_ImageComponent.default, {
        source: imageSource,
        width: sizeImage,
        height: sizeImage,
        resizeMode: "cover",
        style: imageStyle
      }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        height: sizeImage,
        width: sizeImage,
        borderRadius: "infinity",
        bg: "white",
        alignItems: "center",
        justifyContent: "center",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).IconLegacy, {
          name: "User",
          color: "neutroFrio1",
          size: sizeImage
        })
      }), buttonEdit && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        position: "absolute",
        top: position.top,
        right: position.right,
        left: position.left,
        height: sizeButton,
        width: sizeButton,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
          onPress: onPress,
          height: sizeButton,
          width: sizeButton,
          bg: "neutroFrio2",
          borderRadius: "infinity",
          alignItems: "center",
          justifyContent: "center",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).IconLegacy, {
            name: "Edit",
            color: "white",
            size: sizeButton * 0.7
          })
        })
      })]
    });
  }
