  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Picker = Picker;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function Picker(_ref) {
    var isVisible = _ref.isVisible,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? 'Picker' : _ref$title,
      _ref$swipeDirection = _ref.swipeDirection,
      swipeDirection = _ref$swipeDirection === undefined ? true : _ref$swipeDirection,
      items = _ref.items,
      onSelect = _ref.onSelect,
      onBackDropPress = _ref.onBackDropPress,
      onClose = _ref.onClose,
      onAndroidBackButtonPress = _ref.onAndroidBackButtonPress;
    var androidCloseButton = function androidCloseButton() {
      if (_reactNative.Platform.OS !== 'android') return;
      if (onAndroidBackButtonPress) {
        onAndroidBackButtonPress();
        return;
      }
      if (!onAndroidBackButtonPress && onClose) {
        onClose();
      }
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNativeModal.default, {
      style: {
        justifyContent: 'flex-end',
        margin: 0
      },
      swipeDirection: swipeDirection ? ['down'] : null,
      onBackButtonPress: function onBackButtonPress() {
        androidCloseButton();
      },
      avoidKeyboard: true,
      onBackdropPress: function onBackdropPress() {
        if (onBackDropPress) {
          onBackDropPress();
        }
      },
      backdropColor: _$$_REQUIRE(_dependencyMap[5]).theme.colors.modalBackDropColor,
      isVisible: isVisible,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        pt: "nano",
        bg: "white",
        height: "80%",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          paddingX: "micro",
          paddingY: "micro",
          flexDirection: "row",
          justifyContent: "space-between",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
            onPress: function onPress() {
              return onClose();
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
              flexDirection: "row",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
                fontFamily: "reservaSerifRegular",
                fontSize: 20,
                children: title
              })
            })
          }), onClose && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            paddingRight: "micro",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
              hitSlop: {
                top: 20,
                bottom: 20,
                left: 30,
                right: 50
              },
              onPress: function onPress() {
                return onClose();
              },
              variant: "icone",
              icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).IconLegacy, {
                name: "ArrowBack",
                style: {
                  transform: [{
                    rotate: '270deg'
                  }]
                },
                size: 16
              })
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.ScrollView, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            flexWrap: "wrap",
            flexDirection: "row",
            mb: "micro",
            justifyContent: "center",
            children: items.map(function (item, index) {
              var fullWidth = items.length % 2 == 1 && index == items.length - 1;
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
                py: "nano",
                width: fullWidth ? 1 : 0.5,
                alignItems: "flex-start",
                alignContent: "flex-start",
                flexWrap: "wrap",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
                  onPress: function onPress() {
                    onSelect(item);
                    onClose();
                  },
                  marginLeft: "micro",
                  marginRight: "nano",
                  inline: true,
                  hitSlop: {
                    top: 10,
                    bottom: 10,
                    left: 30,
                    right: 30
                  },
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
                    alignSelf: "flex-start",
                    alignContent: "flex-start",
                    flexDirection: "row",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
                      color: "preto",
                      fontFamily: "nunitoRegular",
                      fontSize: 15,
                      textAlign: "left",
                      children: item.text
                    }), item.subText && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
                      px: "quarck",
                      alignSelf: "center",
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
                        color: "modalBackDropColor",
                        fontFamily: "nunitoRegular",
                        fontSize: 11,
                        textAlign: "left",
                        children: item.subText
                      })
                    })]
                  })
                })
              }, `picker-${item.text}`);
            })
          })
        })]
      })
    });
  }
