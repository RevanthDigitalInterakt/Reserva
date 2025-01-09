  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = InputForm;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _InputForm = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _IconInfoFill = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function InputForm(_ref) {
    var onTextChange = _ref.onTextChange,
      placeholder = _ref.placeholder,
      inputValue = _ref.inputValue,
      inputRef = _ref.inputRef,
      nextInputRef = _ref.nextInputRef,
      inputName = _ref.inputName,
      fieldTouched = _ref.fieldTouched,
      error = _ref.error,
      isEditable = _ref.isEditable,
      textInputType = _ref.textInputType,
      checkPostalCode = _ref.checkPostalCode,
      setFieldValue = _ref.setFieldValue,
      inputID = _ref.inputID,
      touched = _ref.touched,
      maxLength = _ref.maxLength,
      _ref$showMessageError = _ref.showMessageError,
      showMessageError = _ref$showMessageError === undefined ? true : _ref$showMessageError;
    var animatedLabel = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var containerStyle = error && touched ? [_InputForm.default.inputContainer, Object.assign({}, _InputForm.default.borderErrorActive)] : [_InputForm.default.inputContainer];
    var moveLabelToTop = (0, _react.useCallback)(function () {
      _reactNative.Animated.timing(animatedLabel, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    }, [animatedLabel]);
    var moveLabelToInitalPosition = (0, _react.useCallback)(function () {
      _reactNative.Animated.timing(animatedLabel, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }, [animatedLabel]);
    var onFocusHandler = (0, _react.useCallback)(function () {
      moveLabelToTop();
    }, [moveLabelToTop]);
    var onFocusField = (0, _react.useCallback)(function () {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) == null ? undefined : _inputRef$current.focus();
      onFocusHandler();
    }, []);
    var onBlurHandler = (0, _react.useCallback)(function () {
      fieldTouched(inputName);
      if (inputValue === '') {
        moveLabelToInitalPosition();
      }
    }, [fieldTouched, inputName, inputValue, moveLabelToInitalPosition]);
    var translateStyleY = animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [4, -20]
    });
    (0, _react.useEffect)(function () {
      if (inputValue !== '') {
        onFocusHandler();
      }
    }, [inputValue, onFocusHandler]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
        style: containerStyle,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Animated.View, {
          style: [_InputForm.default.labelStyle, {
            transform: [{
              translateY: translateStyleY
            }]
          }],
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TouchableWithoutFeedback, {
            onPress: onFocusField,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: _InputForm.default.inputPlaceholder,
              children: placeholder
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TextInput, {
          style: _InputForm.default.inputText,
          autoCapitalize: "none",
          autoCorrect: false,
          returnKeyType: "next",
          testID: inputID.testID,
          onChangeText: function onChangeText(text) {
            onTextChange(text);
            if (inputName === 'postalCode' && checkPostalCode && setFieldValue) {
              checkPostalCode(text, setFieldValue);
            }
          },
          maxLength: maxLength,
          value: inputValue,
          ref: inputRef,
          editable: isEditable,
          keyboardType: textInputType,
          onBlur: onBlurHandler,
          onFocus: onFocusHandler,
          onSubmitEditing: function onSubmitEditing() {
            if (nextInputRef && nextInputRef.current) {
              nextInputRef.current.focus();
            }
          }
        })]
      }), error && touched && showMessageError && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
        style: _InputForm.default.errorContainer,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_IconInfoFill.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          style: _InputForm.default.errorMessage,
          children: error
        })]
      })]
    });
  }
