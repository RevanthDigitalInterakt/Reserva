  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalZoomImage = ModalZoomImage;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _reactNativeImageZoomViewer = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var styles = _reactNative.StyleSheet.create({
    modal: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: _configDeviceSizes.default.DEVICE_WIDTH,
      height: _configDeviceSizes.default.DEVICE_HEIGHT
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'red',
      justifyContent: 'center'
    },
    image: {
      flex: 1,
      width: _configDeviceSizes.default.DEVICE_WIDTH,
      height: _configDeviceSizes.default.DEVICE_HEIGHT
    },
    focalPoint: Object.assign({}, _reactNative.StyleSheet.absoluteFillObject, {
      width: 20,
      height: 20,
      backgroundColor: 'blue',
      borderRadius: 10
    })
  });
  function ImageSelection(_ref) {
    var imagesArray = _ref.imagesArray,
      currentImage = _ref.currentImage;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
      position: "absolute",
      bottom: "6%",
      flexDirection: "row",
      left: "50%",
      marginLeft: -42,
      alignItems: "center",
      justifyContent: "space-around",
      width: 84,
      px: "quarck",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_IconComponent.default, {
        icon: "selectRectangle",
        height: 24,
        width: 84,
        style: {
          position: 'absolute',
          left: 0
        }
      }), imagesArray.map(function (_, index) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          width: 8,
          height: 8,
          backgroundColor: index === currentImage ? 'fullBlack' : 'divider',
          borderRadius: "xs"
        }, `image-${index}`);
      })]
    });
  }
  function ModalTutorial(_ref2) {
    var setOpenTutorial = _ref2.setOpenTutorial;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/modal_zoom_button_open'), {
      onPress: function onPress() {
        return setOpenTutorial(false);
      },
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: _configDeviceSizes.default.DEVICE_WIDTH,
        height: _configDeviceSizes.default.DEVICE_HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        style: {
          position: 'absolute',
          right: '7%',
          top: '5%',
          alignItems: 'center'
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_IconComponent.default, {
          icon: "arrowInstruction",
          resizeMode: "contain",
          style: {
            height: 75,
            width: 75,
            transform: [{
              scaleY: -1
            }, {
              rotate: '-20deg'
            }],
            alignSelf: 'flex-end'
          }
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          alignItems: "center",
          mt: "xxxs",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            fontFamily: "nunitoBold",
            fontSize: 14,
            color: "white",
            children: "Clique aqui para sair"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            fontFamily: "nunitoBold",
            fontSize: 14,
            color: "white",
            children: "do modo zoom."
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        style: {
          position: 'absolute',
          right: '30%',
          top: '42%',
          alignItems: 'center'
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_IconComponent.default, {
          icon: "zoomHand",
          style: {
            height: 75,
            width: 75
          }
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          alignItems: "center",
          mt: "xxxs",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            fontFamily: "nunitoBold",
            fontSize: 14,
            color: "white",
            children: "Fa\xE7a o movimento de pin\xE7a"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            fontFamily: "nunitoBold",
            fontSize: 14,
            color: "white",
            children: "para dar zoom na foto."
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        style: {
          position: 'absolute',
          right: '25%',
          bottom: '10%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'row'
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_IconComponent.default, {
          icon: "arrowInstruction",
          style: {
            width: 75,
            height: 75,
            transform: [{
              scaleY: 1
            }]
          }
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          alignItems: "center",
          bottom: "18%",
          marginLeft: "-8%",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            fontFamily: "nunitoBold",
            fontSize: 14,
            color: "white",
            children: "Arraste pro lado"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            fontFamily: "nunitoBold",
            fontSize: 14,
            color: "white",
            children: "para ver as outras"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            fontFamily: "nunitoBold",
            fontSize: 14,
            color: "white",
            children: "fotos do produto."
          })]
        })]
      })]
    }));
  }
  function ModalZoomImage(_ref3) {
    var isVisible = _ref3.isVisible,
      image = _ref3.image,
      setIsVisibleZoom = _ref3.setIsVisibleZoom,
      setIndexOpenImage = _ref3.setIndexOpenImage;
    var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      newArrayImages = _useState2[0],
      setNewArrayImages = _useState2[1];
    var _useState3 = (0, _react.useState)(0),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      currentImage = _useState4[0],
      setCurrentImage = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      openTutorial = _useState6[0],
      setOpenTutorial = _useState6[1];
    (0, _react.useEffect)(function () {
      function checkIsFirstTime() {
        return _checkIsFirstTime.apply(this, arguments);
      }
      function _checkIsFirstTime() {
        _checkIsFirstTime = (0, _asyncToGenerator2.default)(function* () {
          var isFirstTime = yield _asyncStorage.default.getItem('@IsFisrtTime');
          if (isFirstTime == null) {
            yield _asyncStorage.default.setItem('@IsFisrtTime', 'false');
            setOpenTutorial(true);
          }
        });
        return _checkIsFirstTime.apply(this, arguments);
      }
      checkIsFirstTime();
    }, []);
    (0, _react.useEffect)(function () {
      var newArr = image.map(function (item) {
        return {
          url: item
        };
      });
      setNewArrayImages(newArr);
    }, [image]);
    var closeModal = function closeModal() {
      if (setIsVisibleZoom) {
        setIsVisibleZoom(false);
      }
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_reactNative.Modal, {
        visible: isVisible,
        transparent: true,
        style: styles.modal,
        onRequestClose: closeModal,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNativeImageZoomViewer.default, {
          renderIndicator: function renderIndicator(currentIndex) {
            setCurrentImage(currentIndex - 1);
            return null;
          },
          renderImage: function renderImage(props) {
            var _props$source;
            if (!(props != null && (_props$source = props.source) != null && _props$source.uri)) {
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.View, {});
            }
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_ImageComponent.default, Object.assign({}, props, {
              style: styles.image
            }));
          },
          style: styles.modal,
          imageUrls: newArrayImages,
          onCancel: function onCancel() {
            return setIsVisibleZoom(false);
          },
          backgroundColor: "#f3f2f0",
          index: setIndexOpenImage,
          onSwipeDown: function onSwipeDown() {
            return closeModal;
          },
          saveToLocalByLongPress: false,
          renderHeader: function renderHeader() {
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              position: "absolute",
              right: "4%",
              top: "5%",
              zIndex: 2,
              height: 20,
              width: 20,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
                testID: "com.usereserva:id/modal_zoom_image-button",
                width: 20,
                height: 20,
                onPress: function onPress() {
                  setIsVisibleZoom(false);
                },
                variant: "icone",
                icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[15]).IconLegacy, {
                  size: 13,
                  name: "Close",
                  color: "fullBlack"
                }),
                hitSlop: {
                  top: 15,
                  bottom: 15,
                  left: 15,
                  right: 15
                }
              })
            });
          }
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(ImageSelection, {
          imagesArray: newArrayImages,
          currentImage: currentImage
        }), openTutorial && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(ModalTutorial, {
          setOpenTutorial: setOpenTutorial
        })]
      })
    });
  }
