  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function ProductDetailWrapper(_ref) {
    var children = _ref.children,
      loading = _ref.loading;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).SafeAreaView, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        bg: "white",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).TopBarDefaultBackButton, {
          loading: loading,
          navigateGoBack: true
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.KeyboardAvoidingView, {
          enabled: true,
          behavior: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[7]).platformType.IOS ? 'padding' : undefined,
          style: {
            marginBottom: 160
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.ScrollView, {
            contentContainerStyle: {
              paddingBottom: 100
            },
            style: {
              marginBottom: 24
            },
            children: children
          })
        })]
      })
    });
  }
  var _default = exports.default = ProductDetailWrapper;
