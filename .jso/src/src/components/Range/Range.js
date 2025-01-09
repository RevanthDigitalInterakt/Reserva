  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Range = Range;
  exports.RangeMarker = RangeMarker;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeMultiSlider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function RangeMarker(props) {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Button, {
      hitSlop: {
        top: 30,
        left: 30,
        bottom: 30,
        right: 30
      },
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, Object.assign({
        borderRadius: "infinity",
        width: 20,
        height: 20
      }, props))
    });
  }
  function Range(_ref) {
    var _ref$width = _ref.width,
      width = _ref$width === undefined ? 150 : _ref$width,
      _ref$min = _ref.min,
      min = _ref$min === undefined ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === undefined ? 0 : _ref$max,
      prefix = _ref.prefix,
      _ref$value = _ref.value,
      value = _ref$value === undefined ? [0, 0] : _ref$value,
      _ref$colorMarker = _ref.colorMarker,
      colorMarker = _ref$colorMarker === undefined ? 'preto' : _ref$colorMarker,
      _ref$colorLine = _ref.colorLine,
      colorLine = _ref$colorLine === undefined ? 'preto' : _ref$colorLine,
      _ref$colorText = _ref.colorText,
      colorText = _ref$colorText === undefined ? 'preto' : _ref$colorText,
      onValuesChange = _ref.onValuesChange;
    var _React$useState = _react.default.useState(value),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      sliderValue = _React$useState2[0],
      setSliderValue = _React$useState2[1];
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
      flexDirection: "column",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNativeMultiSlider.default, {
        selectedStyle: {
          backgroundColor: _$$_REQUIRE(_dependencyMap[7]).theme.colors[colorLine],
          height: 3,
          marginTop: -1.5
        },
        unselectedStyle: {
          backgroundColor: _$$_REQUIRE(_dependencyMap[7]).theme.colors[colorLine],
          height: 1
        },
        values: sliderValue,
        sliderLength: width,
        onValuesChange: function onValuesChange(values) {
          setSliderValue(values);
        },
        onValuesChangeFinish: function onValuesChangeFinish(values) {
          if (typeof onValuesChange === 'function') {
            onValuesChange(values);
          }
        },
        min: min,
        max: max,
        step: 1,
        allowOverlap: true,
        snapped: true,
        isMarkersSeparated: true,
        customMarkerLeft: function customMarkerLeft() {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(RangeMarker, {
            bg: colorMarker
          });
        },
        customMarkerRight: function customMarkerRight() {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(RangeMarker, {
            bg: colorMarker
          });
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        width: width,
        mt: -12,
        flexDirection: "row",
        justifyContent: "space-between",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          alignSelf: "flex-start",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            fontFamily: "nunitoSemiBold",
            fontSize: 14,
            color: colorText,
            children: [prefix, sliderValue[0]]
          })
        }), sliderValue[1] !== undefined && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          alignSelf: "flex-end",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            fontFamily: "nunitoSemiBold",
            fontSize: 14,
            color: colorText,
            children: [prefix, sliderValue[1]]
          })
        })]
      })]
    });
  }
