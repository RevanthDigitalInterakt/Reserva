  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CodeInput(_ref) {
    var code = _ref.code,
      onChageCode = _ref.onChageCode,
      _ref$showError = _ref.showError,
      showError = _ref$showError === undefined ? true : _ref$showError,
      _ref$errorMessage = _ref.errorMessage,
      errorMessage = _ref$errorMessage === undefined ? 'Digite um código válido' : _ref$errorMessage;
    var codeMaxSize = 6;
    var codeDigitsArray = new Array(codeMaxSize).fill(0);
    var refTextInput = (0, _react.useRef)(null);
    var handleOnPress = function handleOnPress() {
      var _refTextInput$current;
      refTextInput == null ? undefined : (_refTextInput$current = refTextInput.current) == null ? undefined : _refTextInput$current.focus();
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
      testID: "com.usereserva:id/code_input_container",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Pressable, Object.assign({
        onPress: handleOnPress
      }, (0, _testProps.default)('com.usereserva:id/code_input_passable'), {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          flexDirection: "row",
          justifyContent: "space-between",
          children: codeDigitsArray.map(function (val, idx) {
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              borderWidth: "hairline",
              borderColor: showError ? 'vermelhoAlerta' : 'transparente',
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "nano",
              width: 50,
              height: 50,
              backgroundColor: "backgoundInput",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 15,
                children: code[idx] ? code[idx] : ' '
              })
            }, `${val + idx}`);
          })
        })
      })), showError && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        mt: "quarck",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
          testID: "com.usereserva:id/code_input_message_error",
          fontFamily: "nunitoRegular",
          fontSize: 13,
          color: "vermelhoAlerta",
          children: errorMessage
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TextInput, Object.assign({}, (0, _testProps.default)('com.usereserva:id/code_input'), {
        ref: refTextInput,
        value: code,
        onChangeText: function onChangeText(code) {
          return onChageCode(code);
        },
        keyboardType: "number-pad",
        returnKeyType: "done",
        textContentType: "oneTimeCode",
        maxLength: codeMaxSize,
        style: {
          position: 'absolute',
          height: 0,
          width: 0,
          opacity: 0
        }
      }))]
    });
  }
  var _default = exports.default = CodeInput;
