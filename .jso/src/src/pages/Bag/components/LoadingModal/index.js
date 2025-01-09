  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = LoadingModal;
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function LoadingModal() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[4]).useBagStore)(['loadingModal']),
      loadingModal = _useBagStore.loadingModal;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeModal.default, {
      isVisible: loadingModal,
      testID: "com.usereserva:id/loading-modal",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        zIndex: 5,
        height: "100%",
        width: "100%",
        opacity: 0.65,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_lottieReactNative.default, {
          testID: "com.usereserva:id/lottie-view",
          source: _$$_REQUIRE(_dependencyMap[7]).loadingSpinner,
          style: {
            width: 60
          },
          autoPlay: true,
          loop: true
        })
      })
    });
  }
