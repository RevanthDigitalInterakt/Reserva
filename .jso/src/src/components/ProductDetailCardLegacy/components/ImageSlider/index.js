  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ImageSlider = ImageSlider;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var scrollref = (0, _react.createRef)();
  function ImageSlider(_ref) {
    var images = _ref.images,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 360 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 374 : _ref$height,
      onGoBack = _ref.onGoBack,
      onGoNext = _ref.onGoNext,
      imageIndexActual = _ref.imageIndexActual;
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      actualImage = _useState2[0],
      setActualImage = _useState2[1];
    imageIndexActual == null ? undefined : imageIndexActual(actualImage);
    var onChangeImage = function onChangeImage(scrollEvent) {
      var actualItem = Math.ceil(scrollEvent.nativeEvent.contentOffset.x / (width + 12));
      if (actualItem !== actualImage && images && actualItem <= Math.ceil(images.length)) {
        setActualImage(actualItem);
      }
    };
    var goNext = (0, _react.useCallback)(function () {
      var _scrollref$current;
      if (onGoNext) {
        onGoNext({
          image: images[actualImage + 1] || '',
          index: actualImage + 1
        });
      }
      (_scrollref$current = scrollref.current) == null ? undefined : _scrollref$current.scrollTo({
        x: (actualImage + 1) * width
      });
    }, [actualImage, images, onGoNext, width]);
    var goBack = (0, _react.useCallback)(function () {
      var _scrollref$current2;
      if (onGoBack) {
        onGoBack({
          image: images[actualImage - 1] || '',
          index: actualImage - 1
        });
      }
      (_scrollref$current2 = scrollref.current) == null ? undefined : _scrollref$current2.scrollTo({
        x: (actualImage - 1) * width
      });
    }, [actualImage, images, onGoBack, width]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
      width: width,
      height: height,
      children: [actualImage > 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        position: "absolute",
        style: {
          elevation: 3
        },
        zIndex: 1,
        left: 32,
        top: height / 2 - 32,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
          p: "nano",
          variant: "icone",
          onPress: function onPress() {
            goBack();
          },
          icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).IconLegacy, {
            name: "ChevronLeft",
            color: "neutroFrio2",
            size: 23
          })
        })
      }), actualImage < ((images == null ? undefined : images.length) || 0) - 1 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        position: "absolute",
        style: {
          elevation: 3
        },
        zIndex: 1,
        right: 32,
        top: height / 2 - 32,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
          p: "nano",
          variant: "icone",
          onPress: function onPress() {
            goNext();
          },
          icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).IconLegacy, {
            name: "ChevronRight",
            color: "neutroFrio2",
            size: 23
          })
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.ScrollView, {
        horizontal: true,
        pagingEnabled: true,
        onScroll: function onScroll(event) {
          onChangeImage(event);
        },
        ref: scrollref,
        showsHorizontalScrollIndicator: false,
        children: images == null ? undefined : images.map(function (image) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            alignItems: "center",
            width: width,
            height: height,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_ImageComponent.default, {
              source: {
                uri: image
              },
              height: height,
              width: width,
              resizeMode: "contain"
            }, image)
          }, `product-card-${image}`);
        })
      })]
    });
  }
