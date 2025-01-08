  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Alert = Alert;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _excluded = ["isVisible", "title", "subtitle", "disabled", "confirmText", "cancelText", "colorBackdrop", "onConfirm", "onCancel", "onBackDropPress", "onClose", "onAndroidBackButtonPress"];
  function Alert(_ref) {
    var isVisible = _ref.isVisible,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? 'Titulo' : _ref$title,
      subtitle = _ref.subtitle,
      disabled = _ref.disabled,
      _ref$confirmText = _ref.confirmText,
      confirmText = _ref$confirmText === undefined ? 'OK' : _ref$confirmText,
      _ref$cancelText = _ref.cancelText,
      cancelText = _ref$cancelText === undefined ? 'CANCELAR' : _ref$cancelText,
      colorBackdrop = _ref.colorBackdrop,
      onConfirm = _ref.onConfirm,
      onCancel = _ref.onCancel,
      onBackDropPress = _ref.onBackDropPress,
      onClose = _ref.onClose,
      onAndroidBackButtonPress = _ref.onAndroidBackButtonPress,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var androidCloseButton = function androidCloseButton() {
      if (_reactNative.Platform.OS !== 'android') return;
      if (onAndroidBackButtonPress) {
        onAndroidBackButtonPress();
        return;
      }
      if (!onAndroidBackButtonPress && onClose) {
        onClose();
        return;
      }
      if (!onAndroidBackButtonPress && !onClose && onCancel) {
        onCancel();
      }
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeModal.default, Object.assign({}, props, {
        onBackButtonPress: function onBackButtonPress() {
          androidCloseButton();
        },
        avoidKeyboard: true,
        onBackdropPress: function onBackdropPress() {
          if (onBackDropPress) {
            onBackDropPress();
          }
        },
        backdropColor: colorBackdrop || _$$_REQUIRE(_dependencyMap[7]).theme.colors.modalBackDropColor,
        isVisible: isVisible,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          bg: "white",
          children: [onClose && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            alignSelf: "flex-end",
            paddingRight: "micro",
            paddingTop: "micro",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
              hitSlop: {
                top: 30,
                left: 30,
                bottom: 30,
                right: 30
              },
              onPress: function onPress() {
                return onClose();
              },
              variant: "icone",
              icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[9]).IconLegacy, {
                name: "Close",
                size: 12
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            paddingX: "micro",
            paddingY: subtitle ? 'micro' : 'xxs',
            flexDirection: "row",
            justifyContent: "space-between",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              fontFamily: "reservaSerifRegular",
              fontSize: 20,
              children: title
            })
          }), subtitle && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            paddingX: "micro",
            paddingY: "micro",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: subtitle
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            paddingX: "micro",
            paddingY: "xxxs",
            paddingTop: "micro",
            justifyContent: "center",
            flexDirection: "row"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            flexDirection: "row",
            mb: "micro",
            justifyContent: "center",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
              width: 0.5,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
                onPress: function onPress() {
                  return onConfirm();
                },
                marginLeft: "micro",
                marginRight: "nano",
                title: confirmText.toUpperCase(),
                variant: "primarioEstreitoOutline",
                inline: true,
                disabled: disabled
              })
            }), !!onCancel && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
              width: 0.5,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
                onPress: function onPress() {
                  return onCancel();
                },
                marginRight: "micro",
                marginLeft: "nano",
                title: cancelText.toUpperCase(),
                variant: "primarioEstreitoOutline",
                inline: true,
                disabled: disabled
              })
            })]
          })]
        })
      }))
    });
  }
