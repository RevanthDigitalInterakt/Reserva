  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _Bar = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var HeaderBanner = function HeaderBanner(_ref) {
    var onClickGoBack = _ref.onClickGoBack,
      imageHeader = _ref.imageHeader,
      loading = _ref.loading;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 4,
        style: {
          elevation: 3
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
          onPress: onClickGoBack,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).IconLegacy, {
            name: "ArrowBack",
            size: 24,
            color: "preto"
          })
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_ImageComponent.default, {
        resizeMode: "cover",
        source: imageHeader
      }), loading && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        top: 0,
        height: 1,
        justifyContent: "flex-end",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_Bar.default, {
          animated: true,
          indeterminate: true,
          color: _$$_REQUIRE(_dependencyMap[8]).theme.colors.vermelhoAlerta,
          height: 2,
          borderWidth: 0,
          width: null,
          borderRadius: 0
        })
      })]
    });
  };
  var _default = exports.default = HeaderBanner;
