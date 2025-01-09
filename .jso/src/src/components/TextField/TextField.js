  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TextField = TextField;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _excluded = ["label", "height", "iconLeft", "iconRight", "error", "touched", "value", "ref", "refMask", "placeholder", "maxLength", "secureTextEntry", "maskType", "maskOptions", "onChangeText", "onBlur", "onFocus"];
  function TextField(_ref) {
    var label = _ref.label,
      height = _ref.height,
      iconLeft = _ref.iconLeft,
      iconRight = _ref.iconRight,
      error = _ref.error,
      touched = _ref.touched,
      value = _ref.value,
      ref = _ref.ref,
      refMask = _ref.refMask,
      placeholder = _ref.placeholder,
      maxLength = _ref.maxLength,
      secureTextEntry = _ref.secureTextEntry,
      maskType = _ref.maskType,
      maskOptions = _ref.maskOptions,
      onChangeText = _ref.onChangeText,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        justifyContent: "center",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          backgroundColor: "backgoundInput",
          justifyContent: "center",
          flexDirection: "row",
          height: height || 60,
          borderWidth: "hairline",
          borderColor: touched && error ? 'vermelhoAlerta' : 'transparente',
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            flex: 1,
            children: [label && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
              marginX: "micro",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
                variant: "descricaoCampoDePreenchimento",
                color: "neutroFrio2",
                children: label
              })
            }), iconLeft && iconLeft, maskType ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).InputMask, Object.assign({
              paddingX: "xxxs",
              paddingY: "nano",
              flex: 1,
              placeholderTextColor: _$$_REQUIRE(_dependencyMap[7]).theme.colors.neutroFrio2,
              maxLength: maxLength,
              placeholder: placeholder,
              onChangeText: onChangeText,
              secureTextEntry: secureTextEntry,
              onBlur: onBlur,
              onFocus: onFocus,
              value: value,
              ref: refMask,
              variant: "paragraphSmall",
              textContentType: "oneTimeCode",
              type: maskType,
              options: maskOptions
            }, rest)) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Input, Object.assign({
              paddingX: "xxxs",
              paddingY: "nano",
              flex: 1,
              placeholderTextColor: _$$_REQUIRE(_dependencyMap[7]).theme.colors.neutroFrio2,
              maxLength: maxLength,
              placeholder: placeholder,
              onChangeText: onChangeText,
              secureTextEntry: secureTextEntry,
              onBlur: onBlur,
              onFocus: onFocus,
              value: value,
              ref: ref,
              variant: "paragraphSmall",
              textContentType: "oneTimeCode"
            }, rest))]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            justifyContent: "center",
            children: iconRight && iconRight
          })]
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        children: touched && error && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
          fontFamily: "nunitoRegular",
          fontSize: "13px",
          color: "vermelhoAlerta",
          children: error
        })
      })]
    });
  }
