  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Divider = Divider;
  exports.dividerVariants = exports.DividerVariantsOptions = undefined;
  var _objectDestructuringEmpty2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _native = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var dividerVariants = exports.dividerVariants = {
    prop: 'variant',
    variants: {
      fullWidth: {},
      inset: {
        marginLeft: 'xl'
      },
      middle: {
        marginLeft: 'md',
        marginRight: 'md'
      }
    }
  };
  var DividerVariantsOptions = exports.DividerVariantsOptions = Object.keys(dividerVariants.variants);
  var DividerStyle = (0, _native.default)(_reactNative.View)`
  ${_$$_REQUIRE(_dependencyMap[5]).color};
  ${_$$_REQUIRE(_dependencyMap[5]).height};
  ${_$$_REQUIRE(_dependencyMap[5]).width};
  ${_$$_REQUIRE(_dependencyMap[5]).space};
  ${(0, _$$_REQUIRE(_dependencyMap[5]).variant)(dividerVariants)};
`;
  DividerStyle.defaultProps = {
    height: 1,
    backgroundColor: 'divider',
    variant: 'fullWidth'
  };
  function Divider(_ref) {
    var props = Object.assign({}, ((0, _objectDestructuringEmpty2.default)(_ref), _ref));
    var styleProps = props;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(DividerStyle, Object.assign({}, styleProps));
  }
