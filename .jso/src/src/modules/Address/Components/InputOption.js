  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _excluded = ["label", "placeholder", "maskType", "maskOptions", "value", "height", "error", "touch", "touched", "textAlignVertical", "onChangeText", "editable", "maxLength", "autoCapitalize", "onTouchStart", "isLoading", "style"];
  function InputOption(_ref) {
    var label = _ref.label,
      placeholder = _ref.placeholder,
      maskType = _ref.maskType,
      maskOptions = _ref.maskOptions,
      value = _ref.value,
      height = _ref.height,
      error = _ref.error,
      touch = _ref.touch,
      touched = _ref.touched,
      textAlignVertical = _ref.textAlignVertical,
      onChangeText = _ref.onChangeText,
      _ref$editable = _ref.editable,
      editable = _ref$editable === undefined ? true : _ref$editable,
      maxLength = _ref.maxLength,
      autoCapitalize = _ref.autoCapitalize,
      onTouchStart = _ref.onTouchStart,
      _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === undefined ? false : _ref$isLoading,
      style = _ref.style,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
      mt: "xxxs",
      children: isLoading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.ActivityIndicator, {}) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).TextField, Object.assign({}, rest, {
        label: value ? label : undefined,
        textAlignVertical: textAlignVertical,
        height: height,
        maskType: maskType,
        maskOptions: maskOptions,
        onChangeText: onChangeText,
        placeholder: placeholder,
        value: value,
        editable: editable,
        maxLength: maxLength,
        autoCapitalize: autoCapitalize,
        style: style,
        touched: touched,
        onTouchStart: onTouchStart,
        error: error && touched ? `${error}` : ''
      }))
    });
  }
  var _default = exports.default = InputOption;
