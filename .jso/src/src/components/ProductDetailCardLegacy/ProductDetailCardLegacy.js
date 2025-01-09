  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProductDetailCardLegacy = ProductDetailCardLegacy;
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductDetailCardLegacy(_ref) {
    var currency = _ref.currency,
      images = _ref.images,
      discountTag = _ref.discountTag,
      saleOff = _ref.saleOff,
      title = _ref.title,
      installmentsNumber = _ref.installmentsNumber,
      installmentsPrice = _ref.installmentsPrice,
      imagesHeight = _ref.imagesHeight,
      imagesWidth = _ref.imagesWidth,
      price = _ref.price,
      priceWithDiscount = _ref.priceWithDiscount,
      onClickShare = _ref.onClickShare,
      onGoBackImage = _ref.onGoBackImage,
      showZoomButton = _ref.showZoomButton,
      onGoNextImage = _ref.onGoNextImage,
      videoThumbnail = _ref.videoThumbnail,
      onClickFavorite = _ref.onClickFavorite,
      isFavorited = _ref.isFavorited,
      loadingFavorite = _ref.loadingFavorite,
      setModalZoom = _ref.setModalZoom,
      imageIndexActual = _ref.imageIndexActual,
      avaibleUnits = _ref.avaibleUnits,
      _ref$mktplaceNameComp = _ref.mktplaceNameComponent,
      mktplaceNameComponent = _ref$mktplaceNameComp === undefined ? null : _ref$mktplaceNameComp,
      testID = _ref.testID;
    var isTester = (0, _$$_REQUIRE(_dependencyMap[4]).useIsTester)();
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[5]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var videoActive = (0, _react.useMemo)(function () {
      return getBoolean(isTester ? 'pdp_show_video_tester' : 'pdp_show_video');
    }, [getBoolean, isTester]);
    var hasZoomButton = (0, _react.useMemo)(function () {
      return videoActive ? showZoomButton : true;
    }, [videoActive, showZoomButton]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
      alignItems: "center",
      justifyContent: "center",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        children: [!!discountTag && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          position: "absolute",
          style: {
            elevation: 3
          },
          zIndex: 1,
          left: 0,
          top: 0,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).FlagDiscount, {
            discountTag: discountTag,
            isDetail: true
          })
        }), saleOff && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          style: {
            elevation: 3
          },
          position: "absolute",
          top: discountTag ? 80 : 0,
          left: 0,
          zIndex: 1,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_IconComponent.default, {
            icon: "saleOff",
            width: 80,
            height: 80
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          children: [videoActive ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).CarrouselMedias, {
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
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).ImageSlider, {
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
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            position: "absolute",
            top: "2%",
            right: "4%",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
              alignSelf: "flex-start",
              paddingTop: "quarck",
              children: [loadingFavorite ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
                width: 20,
                height: 20,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_lottieReactNative.default, {
                  source: _$$_REQUIRE(_dependencyMap[11]).loadingSpinner,
                  style: {
                    width: '100%',
                    height: '100%'
                  },
                  autoPlay: true,
                  loop: true
                })
              }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                variant: "icone",
                testID: `${testID}_favorite`,
                onPress: function onPress() {
                  if (onClickFavorite) {
                    onClickFavorite(!isFavorited);
                  }
                },
                icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[13]).IconLegacy, {
                  name: isFavorited ? 'HeartRaised' : 'Heart',
                  size: 20,
                  color: "preto"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                mt: "nano",
                variant: "icone",
                testID: `${testID}_share`,
                onPress: onClickShare,
                icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[13]).IconLegacy, {
                  name: "Share",
                  size: 16,
                  color: "preto"
                })
              })]
            })
          }), hasZoomButton && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            position: "absolute",
            bottom: "3%",
            right: "4%",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, {
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              variant: "icone",
              onPress: setModalZoom,
              testID: `${testID}_zoom`,
              icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[13]).IconLegacy, {
                name: "Expand",
                size: 18,
                color: "preto"
              })
            })
          })]
        })]
      }), avaibleUnits && avaibleUnits !== 0 && avaibleUnits <= 5 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        width: "100%",
        paddingY: "quarck",
        bg: "vermelhoAlerta",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
          color: "white",
          fontWeight: "SemiBold",
          fontFamily: "nunitoRegular",
          children: "\xDALTIMAS UNIDADES"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        width: "100%",
        paddingX: "xxxs",
        marginTop: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          mb: "xxxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            flex: 1,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              fontFamily: "reservaSerifRegular",
              fontSize: 24,
              textAlign: "left",
              children: title
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          paddingBottom: 16,
          paddingTop: 6,
          children: mktplaceNameComponent
        }), !!discountTag && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          flexDirection: "row",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
            fontSize: 15,
            fontFamily: "reservaSansRegular",
            color: "preto",
            children: `De ${currency || 'R$'} `
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
            fontFamily: "reservaSansRegular",
            color: "preto",
            fontSize: 15,
            style: {
              textDecorationLine: 'line-through'
            },
            children: `${(0, _$$_REQUIRE(_dependencyMap[15]).integerPart)(price)},`
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
            fontFamily: "reservaSansRegular",
            color: "preto",
            fontSize: "10px",
            style: {
              textDecorationLine: 'line-through'
            },
            children: `${(0, _$$_REQUIRE(_dependencyMap[15]).decimalPart)(price)}`
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          marginTop: "quarck",
          flexDirection: "row",
          alignItems: "center",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
              flexDirection: "row",
              children: !!priceWithDiscount && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
                flexDirection: "row",
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                  fontFamily: "reservaSansRegular",
                  fontSize: 24,
                  color: "neutroFrio2",
                  children: `${currency || 'R$'} ${(0, _$$_REQUIRE(_dependencyMap[15]).integerPart)(priceWithDiscount)},`
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                  fontFamily: "reservaSansRegular",
                  fontSize: "10px",
                  color: "neutroFrio2",
                  children: `${(0, _$$_REQUIRE(_dependencyMap[15]).decimalPart)(priceWithDiscount)}`
                })]
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            bg: "neutroFrio2",
            width: "1px",
            height: discountTag ? '30px' : '20px',
            marginX: "micro"
          }), installmentsNumber > 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            flexDirection: "row",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
              flexDirection: "row",
              alignItems: "baseline",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: 18,
                color: discountTag ? 'vermelhoRSV' : 'preto',
                children: [installmentsNumber, "x"]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontFamily: "reservaSansBold",
                fontSize: 24,
                color: discountTag ? 'vermelhoRSV' : 'preto',
                children: ` ${currency || 'R$'} ${(0, _$$_REQUIRE(_dependencyMap[15]).integerPart)(installmentsPrice)},`
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              fontFamily: "reservaSansBold",
              fontSize: "11px",
              color: discountTag ? 'vermelhoRSV' : 'preto',
              children: `${(0, _$$_REQUIRE(_dependencyMap[15]).decimalPart)(installmentsPrice)}`
            })]
          })]
        })]
      })]
    });
  }
