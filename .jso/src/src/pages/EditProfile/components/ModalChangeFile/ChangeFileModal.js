  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var launchImageLibraryOptions = {
    selectionLimit: 1,
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 550
  };
  var launchCameraOptions = {
    mediaType: 'photo',
    saveToPhotos: true,
    includeExtra: true,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    cameraType: 'front',
    selectionLimit: 1
  };
  function ChangeFileModal(_ref) {
    var show = _ref.show,
      toggleModal = _ref.toggleModal,
      handleChangeFile = _ref.handleChangeFile,
      handleDeleteProfileImage = _ref.handleDeleteProfileImage;
    var handleChooseGallery = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var isCameraPermitted = yield (0, _$$_REQUIRE(_dependencyMap[5]).requestCameraPermission)();
      var isStoragePermitted = yield (0, _$$_REQUIRE(_dependencyMap[5]).requestExternalWritePermission)();
      if (!isCameraPermitted || !isStoragePermitted) return;
      yield (0, _$$_REQUIRE(_dependencyMap[6]).launchImageLibrary)(launchImageLibraryOptions, /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)(function* (response) {
          var _response$assets;
          if (!response) return;
          if (response.didCancel || response.errorMessage) return;
          if ((_response$assets = response.assets) != null && _response$assets.length) {
            var _response$assets$, _response$assets$2;
            handleChangeFile({
              uri: (_response$assets$ = response.assets[0]) == null ? undefined : _response$assets$.uri,
              name: (_response$assets$2 = response.assets[0]) == null ? undefined : _response$assets$2.fileName,
              type: 'image/jpeg',
              initialFilePath: undefined
            });
          }
        });
        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
      toggleModal();
    }), [handleChangeFile]);
    var handleChooseCamera = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var isCameraPermitted = yield (0, _$$_REQUIRE(_dependencyMap[5]).requestCameraPermission)();
      var isStoragePermitted = yield (0, _$$_REQUIRE(_dependencyMap[5]).requestExternalWritePermission)();
      if (!isCameraPermitted || !isStoragePermitted) return;
      yield (0, _$$_REQUIRE(_dependencyMap[6]).launchCamera)(launchCameraOptions, /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)(function* (response) {
          var _response$assets2;
          if (!response) return;
          if (response.didCancel || response.errorMessage) return;
          if ((_response$assets2 = response.assets) != null && _response$assets2.length) {
            var _response$assets$3, _response$assets$4;
            handleChangeFile({
              uri: (_response$assets$3 = response.assets[0]) == null ? undefined : _response$assets$3.uri,
              name: (_response$assets$4 = response.assets[0]) == null ? undefined : _response$assets$4.fileName,
              type: 'image/jpeg',
              initialFilePath: undefined
            });
          }
        });
        return function (_x2) {
          return _ref5.apply(this, arguments);
        };
      }());
      toggleModal();
    }), [handleChangeFile]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNativeModal.default, {
      onBackdropPress: toggleModal,
      isVisible: show,
      testID: "com.usereserva:id/changefilemodal_container",
      style: _$$_REQUIRE(_dependencyMap[8]).ChangeFileModalStyles.modalProfile,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        bg: "white",
        p: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              fontFamily: "reservaSerifRegular",
              fontSize: 20
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Button, {
            hitSlop: {
              top: 30,
              bottom: 30,
              right: 30,
              left: 30
            },
            onPress: toggleModal,
            variant: "icone",
            icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).IconLegacy, {
              size: 12,
              name: "Close"
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          mt: "xxs",
          mb: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            fontFamily: "reservaSansMedium",
            fontSize: 14,
            children: "Escolha uma das op\xE7\xF5es abaixo:"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          mt: "xxs",
          mb: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
            onPress: handleChooseCamera,
            testID: "com.usereserva:id/changefilemodal_button_camera",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              style: _$$_REQUIRE(_dependencyMap[8]).ChangeFileModalStyles.boxTouchable,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).IconLegacy, {
                name: "Cam",
                size: 20,
                mr: "micro"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                fontFamily: "reservaSansMedium",
                fontSize: 14,
                children: "Tirar uma foto"
              })]
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Divider, {
          variant: "fullWidth"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          mt: "micro",
          mb: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
            onPress: handleChooseGallery,
            testID: "com.usereserva:id/changefilemodal_button_gallery",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              style: _$$_REQUIRE(_dependencyMap[8]).ChangeFileModalStyles.boxTouchable,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).IconLegacy, {
                name: "Image",
                size: 20,
                mr: "micro"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                fontFamily: "reservaSansMedium",
                fontSize: 14,
                children: "Buscar na galeria"
              })]
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Divider, {
          variant: "fullWidth"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          mt: "micro",
          mb: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
            onPress: handleDeleteProfileImage,
            testID: "com.usereserva:id/changefilemodal_button_clear",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              style: _$$_REQUIRE(_dependencyMap[8]).ChangeFileModalStyles.boxTouchable,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).IconLegacy, {
                name: "Trash",
                size: 20,
                mr: "micro"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                style: {
                  color: '#EF1E1E'
                },
                fontFamily: "reservaSansMedium",
                fontSize: 14,
                children: "Excluir foto atual"
              })]
            })
          })
        })]
      })
    });
  }
  var _default = exports.default = ChangeFileModal;
