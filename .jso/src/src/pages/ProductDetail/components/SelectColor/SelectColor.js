  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SelectColor = SelectColor;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function SelectColor(_ref) {
    var listColors = _ref.listColors,
      selectedColors = _ref.selectedColors,
      disabledColors = _ref.disabledColors,
      _onPress = _ref.onPress,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? 25 : _ref$size;
    var renderOptions = function renderOptions() {
      var listItems = listColors.map(function (item) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Button, {
            disabled: disabledColors.includes(item.id),
            onPress: function onPress() {
              return _onPress(item.id);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
              height: size + 5,
              width: size + 5,
              bg: selectedColors != null && selectedColors.includes(item.id) || selectedColors === item.id ? 'white' : null,
              borderRadius: "infinity",
              borderWidth: selectedColors != null && selectedColors.includes(item.id) || selectedColors === item.id ? 'hairline' : 'hairline',
              borderColor: selectedColors != null && selectedColors.includes(item.id) || selectedColors === item.id ? 'neutroFrio2' : 'neutroFrio1',
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "nano",
              marginRight: "nano",
              marginBottom: "nano",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.ImageBackground, {
                resizeMode: "cover",
                style: {
                  width: size,
                  height: size,
                  borderRadius: 99999,
                  overflow: 'hidden'
                },
                source: {
                  uri: item.url
                }
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
                height: size,
                width: size,
                style: {
                  zIndex: -1,
                  position: 'absolute'
                },
                borderRadius: "infinity",
                bg: "offWhite"
              })]
            })
          })
        }, `color-option-${item.id}`);
      });
      return listItems;
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
      flexWrap: "wrap",
      flexDirection: "row",
      children: renderOptions()
    });
  }
