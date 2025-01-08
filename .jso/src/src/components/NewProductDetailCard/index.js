  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewProductDetailCard = NewProductDetailCard;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[5]));
  var _PersonalizeIcon = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewProductDetailCard(_ref) {
    var _giftCardFirstPriceOp, _giftCardFirstPriceOp2, _giftCardFirstPriceOp3, _giftCardFirstPriceOp4;
    var images = _ref.images,
      discountTag = _ref.discountTag,
      saleOff = _ref.saleOff,
      title = _ref.title,
      giftCardFirstPriceOption = _ref.giftCardFirstPriceOption,
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
      avaibleUnits = _ref.avaibleUnits,
      showZoomButton = _ref.showZoomButton,
      videoThumbnail = _ref.videoThumbnail,
      testID = _ref.testID,
      fvcProductReference = _ref.fvcProductReference;
    var isTester = (0, _$$_REQUIRE(_dependencyMap[7]).useIsTester)();
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[8]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var personalizeIcon = !!fvcProductReference;
    var videoActive = (0, _react.useMemo)(function () {
      return getBoolean(isTester ? 'pdp_show_video_tester' : 'pdp_show_video');
    }, [getBoolean, isTester]);
    var showButtonsPdpFacavc = (0, _react.useMemo)(function () {
      return getBoolean('show_buttons_pdp_facavc');
    }, []);
    var hasZoomButton = (0, _react.useMemo)(function () {
      return videoActive ? showZoomButton : true;
    }, [videoActive, showZoomButton]);
    var isTheLastUnits = (0, _react.useMemo)(function () {
      return avaibleUnits && avaibleUnits !== 0 && avaibleUnits <= 5;
    }, [avaibleUnits]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
      style: (0, _styles.default)().container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
        children: [showButtonsPdpFacavc && personalizeIcon && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_PersonalizeIcon.default, {
          discountTag: !!discountTag,
          testID: String(testID),
          productReference: fvcProductReference
        }), !!discountTag && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
          style: (0, _styles.default)(!!discountTag, !!personalizeIcon).flagWrapper,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).FlagDiscount, {
            discountTag: discountTag,
            isDetail: true
          })
        }), saleOff && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
          style: (0, _styles.default)(!!discountTag, !!personalizeIcon).saleOffWrapper,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_IconComponent.default, {
            icon: "saleOff",
            style: (0, _styles.default)(!!discountTag, !!personalizeIcon).saleOffIcon,
            width: 80,
            height: 80
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
          children: [videoActive ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).CarrouselMedias, {
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
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).ImageSlider, {
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
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
            style: (0, _styles.default)(!!discountTag).cardCallToActionButtonsWrapper,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
              style: (0, _styles.default)(!!discountTag).cardCallToActionButtonsContentWrapper,
              children: [loadingFavorite ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                style: (0, _styles.default)(!!discountTag).loaderWrapper,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_lottieReactNative.default, {
                  source: _$$_REQUIRE(_dependencyMap[14]).loadingSpinner,
                  style: (0, _styles.default)(!!discountTag).lottieView,
                  autoPlay: true,
                  loop: true
                })
              }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TouchableOpacity, {
                style: (0, _styles.default)(!!discountTag).favoriteButton,
                testID: `${testID}_favorite`,
                onPress: function onPress() {
                  if (onClickFavorite) {
                    onClickFavorite(!isFavorited);
                  }
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_IconComponent.default, {
                  icon: isFavorited ? 'filledHeart' : 'unfilledHeart',
                  style: (0, _styles.default)(!!discountTag).favoriteIcon
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TouchableOpacity, {
                style: (0, _styles.default)(!!discountTag).shareButton,
                testID: `${testID}_share`,
                onPress: onClickShare,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_IconComponent.default, {
                  icon: "share",
                  style: (0, _styles.default)(!!discountTag).shareIcon
                })
              })]
            })
          }), hasZoomButton && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
            style: (0, _styles.default)(!!discountTag).zoomButtonWrapper,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TouchableOpacity, {
              style: (0, _styles.default)(!!discountTag).zoomButton,
              onPress: setModalZoom,
              testID: `${testID}_zoom`,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_IconComponent.default, {
                icon: "expand",
                style: (0, _styles.default)(!!discountTag).zoomIcon
              })
            })
          })]
        })]
      }), isTheLastUnits && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
        style: (0, _styles.default)(!!discountTag).lastUnitsWrapper,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
          style: (0, _styles.default)(!!discountTag).lastUnitsText,
          children: "\xDALTIMAS UNIDADES"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
        style: (0, _styles.default)(!!discountTag).productInfoWrapper,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
          style: (0, _styles.default)(!!discountTag).productInfoContentWrapper,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
            style: (0, _styles.default)(!!discountTag).productInfoTitle,
            children: title
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
            style: (0, _styles.default)(!!discountTag).productInfoSubtitleWrapper,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
              style: (0, _styles.default)(!!discountTag).productInfoSubtitle,
              children: "a partir de"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.Text, {
              style: (0, _styles.default)(!!discountTag).productInfoSubtitleIntegerAmount,
              children: [' ', giftCardFirstPriceOption == null ? undefined : (_giftCardFirstPriceOp = giftCardFirstPriceOption.replace(/\s/, '')) == null ? undefined : (_giftCardFirstPriceOp2 = _giftCardFirstPriceOp.match(/(.*,)/)) == null ? undefined : _giftCardFirstPriceOp2[0]]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
              style: (0, _styles.default)(!!discountTag).productInfoSubtitleFloatAmount,
              children: giftCardFirstPriceOption == null ? undefined : (_giftCardFirstPriceOp3 = giftCardFirstPriceOption.replace(/\s/, '')) == null ? undefined : (_giftCardFirstPriceOp4 = _giftCardFirstPriceOp3.match(/,(\d{2})/)) == null ? undefined : _giftCardFirstPriceOp4[1]
            })]
          })]
        })
      })]
    });
  }
