  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var genderTypes = ['Homem', 'Mulher', 'Não binário', 'Outro'];
  function GenderInput(_ref) {
    var currentGender = _ref.currentGender,
      handleSelectGender = _ref.handleSelectGender;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isVisibleGenderPicker = _useState2[0],
      setIsVisibleGenderPicker = _useState2[1];
    var handleVisibilityGenderPicker = (0, _react.useCallback)(function () {
      setIsVisibleGenderPicker(function (isVisibible) {
        return !isVisibible;
      });
    }, []);
    var handleSelectGenderOnSelect = (0, _react.useCallback)(function (gender) {
      handleSelectGender(gender);
      setIsVisibleGenderPicker(false);
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
      mb: "xxs",
      position: "relative",
      style: _reactNative.Platform.OS === 'ios' ? {
        zIndex: 1
      } : {},
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TouchableOpacity, {
        testID: "com.usereserva:id/genderinput_button_open_gender_picker",
        onPress: handleVisibilityGenderPicker,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          backgroundColor: "backgoundInput",
          alignItems: "center",
          flexDirection: "row",
          height: 60,
          borderWidth: "hairline",
          borderColor: !currentGender ? 'vermelhoAlerta' : 'transparente',
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            ml: "xxxs",
            children: [!currentGender && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
              variant: "descricaoCampoDePreenchimento",
              color: "neutroFrio2",
              fontSize: 15,
              children: "Selecione sua identidade de g\xEAnero"
            }), !!currentGender && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              style: {
                marginTop: -12
              },
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                variant: "descricaoCampoDePreenchimento",
                color: "neutroFrio2",
                children: "G\xEAnero"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mt: "nano",
                pl: "quarck",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  color: "preto",
                  fontSize: 15,
                  children: currentGender
                })
              })]
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            position: "absolute",
            right: 0,
            top: 24,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).IconLegacy, {
              color: "preto",
              name: "ArrowDown",
              size: 18,
              marginX: "micro"
            })
          })]
        })
      }), isVisibleGenderPicker && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        position: "absolute",
        width: "100%",
        top: 60,
        zIndex: 10000000,
        children: genderTypes.map(function (gender) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TouchableOpacity, {
            testID: "com.usereserva:id/genderinput_button_select_gender",
            onPress: function onPress() {
              return handleSelectGenderOnSelect(gender);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              backgroundColor: "backgoundInput",
              alignItems: "center",
              flexDirection: "row",
              height: 60,
              borderWidth: "hairline",
              borderColor: "transparente",
              pl: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoRegular",
                color: "preto",
                fontSize: 15,
                children: gender
              })
            })
          }, `${gender}`);
        })
      }), !currentGender && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
        fontFamily: "nunitoRegular",
        fontSize: "13px",
        color: "vermelhoAlerta",
        children: "Preencha sua identidade de g\xEAnero"
      })]
    });
  }
  var _default = exports.default = GenderInput;
