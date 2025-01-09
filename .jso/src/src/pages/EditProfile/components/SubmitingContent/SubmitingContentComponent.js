  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function SubmitingContentComponent(_ref) {
    var isRegister = _ref.isRegister,
      handleSubmitForm = _ref.handleSubmitForm,
      formEditIsValid = _ref.formEditIsValid;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[3]).useNavigation)();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Fragment, {
      children: [isRegister && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        mb: "nano",
        justifyContent: "space-between",
        flexDirection: "row",
        zIndex: 2,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          paddingLeft: "nano",
          mt: "sm",
          width: "100%",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
            testID: "com.usereserva:id/submitingcontent_button_submit_register",
            title: "SALVAR",
            variant: "primarioEstreito",
            inline: true,
            onPress: handleSubmitForm,
            disabled: formEditIsValid
          })
        })
      }), !isRegister && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        flex: 1,
        width: _reactNative.Dimensions.get('window').width,
        justifyContent: "space-between",
        paddingX: "xxxs",
        alignItems: "center",
        flexDirection: "row",
        height: 85,
        style: {
          elevation: _$$_REQUIRE(_dependencyMap[7]).platformType.ANDROID === 'android' ? 10 : 0,
          position: 'absolute',
          zIndex: 999,
          bottom: 42.5,
          left: 0
        },
        backgroundColor: "white",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          width: 0.45454545454545453,
          paddingRight: "nano",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
            title: "CANCELAR",
            testID: "com.usereserva:id/submitingcontent_button_go_back_no_register",
            variant: "primarioEstreitoOutline",
            inline: true,
            onPress: function onPress() {
              return navigation.goBack();
            }
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          width: 0.45454545454545453,
          paddingLeft: "nano",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
            title: "SALVAR",
            variant: "primarioEstreito",
            testID: "com.usereserva:id/submitingcontent_button_submit_no_register",
            inline: true,
            onPress: handleSubmitForm,
            disabled: formEditIsValid
          })
        })]
      })]
    });
  }
  var _default = exports.default = SubmitingContentComponent;
