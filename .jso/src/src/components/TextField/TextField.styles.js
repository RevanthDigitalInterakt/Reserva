  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InputMask = exports.Input = undefined;
  var _native = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var inputVariant = (0, _$$_REQUIRE(_dependencyMap[3]).variant)({
    prop: 'variant',
    variants: {
      paragraphSmall: {
        fontFamily: 'nunitoRegular',
        fontSize: 15,
        color: 'preto',
        textAlign: 'left'
      }
    }
  });
  var Input = exports.Input = (0, _native.default)(_reactNative.TextInput)`
  ${_$$_REQUIRE(_dependencyMap[3]).height}
  ${_$$_REQUIRE(_dependencyMap[3]).width}
  ${_$$_REQUIRE(_dependencyMap[3]).margin}
  ${_$$_REQUIRE(_dependencyMap[3]).border}
  ${_$$_REQUIRE(_dependencyMap[3]).borderBottom}
  ${_$$_REQUIRE(_dependencyMap[3]).flexbox}
  ${_$$_REQUIRE(_dependencyMap[3]).typography}
  ${_$$_REQUIRE(_dependencyMap[3]).color}
  ${_$$_REQUIRE(_dependencyMap[3]).space}
  ${_$$_REQUIRE(_dependencyMap[3]).padding}
  ${inputVariant}
`;
  var InputMask = exports.InputMask = (0, _native.default)(_$$_REQUIRE(_dependencyMap[4]).TextInputMask)`
  ${_$$_REQUIRE(_dependencyMap[3]).height}
  ${_$$_REQUIRE(_dependencyMap[3]).width}
  ${_$$_REQUIRE(_dependencyMap[3]).margin}
  ${_$$_REQUIRE(_dependencyMap[3]).border}
  ${_$$_REQUIRE(_dependencyMap[3]).borderBottom}
  ${_$$_REQUIRE(_dependencyMap[3]).flexbox}
  ${_$$_REQUIRE(_dependencyMap[3]).typography}
  ${_$$_REQUIRE(_dependencyMap[3]).color}
  ${_$$_REQUIRE(_dependencyMap[3]).space}
  ${_$$_REQUIRE(_dependencyMap[3]).padding}
  ${inputVariant}
`;
