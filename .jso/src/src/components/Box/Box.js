  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Box = Box;
  exports.BoxStyle = undefined;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _native = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _excluded = ["children"];
  var boxVariant = (0, _$$_REQUIRE(_dependencyMap[5]).variant)({
    prop: 'variant',
    key: 'box',
    variants: {
      container: {
        flex: 1,
        alignItems: 'center'
      }
    }
  });
  var BoxStyle = exports.BoxStyle = (0, _native.default)(_reactNative.View)`
  ${_$$_REQUIRE(_dependencyMap[5]).borderColor}
  ${_$$_REQUIRE(_dependencyMap[5]).border}
  ${_$$_REQUIRE(_dependencyMap[5]).color}
  ${_$$_REQUIRE(_dependencyMap[5]).space}
  ${_$$_REQUIRE(_dependencyMap[5]).margin}
  ${_$$_REQUIRE(_dependencyMap[5]).padding}
  ${_$$_REQUIRE(_dependencyMap[5]).width}
  ${_$$_REQUIRE(_dependencyMap[5]).height}
  ${_$$_REQUIRE(_dependencyMap[5]).minHeight}
  ${_$$_REQUIRE(_dependencyMap[5]).minWidth}
  ${_$$_REQUIRE(_dependencyMap[5]).flexbox}
  ${_$$_REQUIRE(_dependencyMap[5]).position}
  ${_$$_REQUIRE(_dependencyMap[5]).shadow}
  ${boxVariant}
`;
  function Box(_ref) {
    var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(BoxStyle, Object.assign({}, props, {
      borderRadius: _$$_REQUIRE(_dependencyMap[7]).theme.radii[props.borderRadius],
      borderWidth: _$$_REQUIRE(_dependencyMap[7]).theme.borderWidths[props.borderWidth],
      children: children
    }));
  }
