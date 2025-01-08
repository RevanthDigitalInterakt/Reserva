  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FormikTextInput = FormikTextInput;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function FormikTextInput(_ref) {
    var label = _ref.label,
      textAlignVertical = _ref.textAlignVertical,
      secureTextEntry = _ref.secureTextEntry,
      placeholder = _ref.placeholder,
      maskType = _ref.maskType,
      maskOptions = _ref.maskOptions,
      height = _ref.height,
      field = _ref.field,
      iconRight = _ref.iconRight,
      keyboardType = _ref.keyboardType,
      onFocus = _ref.onFocus;
    var _useFormikContext = (0, _$$_REQUIRE(_dependencyMap[4]).useFormikContext)(),
      values = _useFormikContext.values,
      handleChange = _useFormikContext.handleChange,
      touched = _useFormikContext.touched,
      errors = _useFormikContext.errors;
    var _useState = (0, _react.useState)(label),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      labelDisplay = _useState2[0],
      setLabelDisplay = _useState2[1];
    var changeLabel = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        return !values[field] ? setLabelDisplay(undefined) : setLabelDisplay(label);
      });
      return function changeLabel() {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      changeLabel();
    }, [values]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).TextField, {
      label: labelDisplay,
      onFocus: onFocus,
      textAlignVertical: textAlignVertical,
      fontFamily: "nunitoRegular",
      secureTextEntry: secureTextEntry,
      autoCapitalize: "none",
      height: height,
      keyboardType: keyboardType,
      maskType: maskType,
      maskOptions: maskOptions,
      onChangeText: handleChange(field),
      placeholder: placeholder,
      iconRight: iconRight,
      value: values[field],
      touched: touched[field],
      error: errors[field] && touched[field] ? `${errors[field]}` : null
    });
  }
