  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _styles = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function KitLookDetailCard(_ref) {
    var images = _ref.images,
      title = _ref.title,
      imagesHeight = _ref.imagesHeight,
      imagesWidth = _ref.imagesWidth,
      onClickShare = _ref.onClickShare,
      onGoBackImage = _ref.onGoBackImage,
      onGoNextImage = _ref.onGoNextImage,
      onClickFavorite = _ref.onClickFavorite,
      isFavorited = _ref.isFavorited,
      loadingFavorite = _ref.loadingFavorite,
      setModalZoom = _ref.setModalZoom,
      imageIndexActual = _ref.imageIndexActual,
      showZoomButton = _ref.showZoomButton,
      videoThumbnail = _ref.videoThumbnail,
      testID = _ref.testID;
    var isTester = (0, _$$_REQUIRE(_dependencyMap[6]).useIsTester)();
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[7]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var videoActive = (0, _react.useMemo)(function () {
      return getBoolean(isTester ? 'pdp_show_video_tester' : 'pdp_show_video');
    }, [getBoolean, isTester]);
    var hasZoomButton = (0, _react.useMemo)(function () {
      return videoActive ? showZoomButton : true;
    }, [videoActive, showZoomButton]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.View, {
      style: _styles.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.View, {
        children: [videoActive ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).CarrouselMedias, {
          images: images,
          width: imagesWidth,
          height: imagesHeight,
          videoThumbnail: videoThumbnail,
          imageIndexActual: imageIndexActual,
          onGoBack: function onGoBack(back) {
            if (onGoBackImage) {
              onGoBackImage(back);
            }
          },
          onGoNext: function onGoNext(back) {
            if (onGoNextImage) {
              onGoNextImage(back);
            }
          }
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).ImageSlider, {
          width: imagesWidth,
          height: imagesHeight,
          images: images,
          onGoBack: function onGoBack(back) {
            if (onGoBackImage) {
              onGoBackImage(back);
            }
          },
          onGoNext: function onGoNext(back) {
            if (onGoNextImage) {
              onGoNextImage(back);
            }
          },
          imageIndexActual: imageIndexActual
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
          style: _styles.default.cardCallToActionButtonsWrapper,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
            style: _styles.default.cardCallToActionButtonsContentWrapper,
            children: [loadingFavorite ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
              style: _styles.default.loaderWrapper,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_lottieReactNative.default, {
                source: _$$_REQUIRE(_dependencyMap[12]).loadingSpinner,
                style: _styles.default.lottieView,
                autoPlay: true,
                loop: true
              })
            }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.TouchableOpacity, {
              style: _styles.default.favoriteButton,
              testID: `${testID}_favorite`,
              onPress: function onPress() {
                if (onClickFavorite) {
                  onClickFavorite(!isFavorited);
                }
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_IconComponent.default, {
                icon: isFavorited ? 'filledHeart' : 'unfilledHeart',
                style: _styles.default.favoriteIcon
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.TouchableOpacity, {
              style: _styles.default.shareButton,
              testID: `${testID}_share`,
              onPress: onClickShare,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_IconComponent.default, {
                icon: "share",
                style: _styles.default.shareIcon
              })
            })]
          })
        }), hasZoomButton && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
          style: _styles.default.zoomButtonWrapper,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.TouchableOpacity, {
            style: _styles.default.zoomButton,
            onPress: setModalZoom,
            testID: `${testID}_zoom`,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_IconComponent.default, {
              icon: "expand",
              style: _styles.default.zoomIcon
            })
          })
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
        style: _styles.default.productInfoContentWrapper,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
          style: _styles.default.productInfoTitle,
          children: title
        })
      })]
    });
  }
  var _default = exports.default = KitLookDetailCard;
