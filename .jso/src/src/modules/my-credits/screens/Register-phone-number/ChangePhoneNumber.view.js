  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ChangePhoneNumberView = ChangePhoneNumberView;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function ChangePhoneNumberView(_ref) {
    var _profile$homePhone;
    var profile = _ref.profile,
      disableButton = _ref.disableButton,
      navigateToRegisterPhoneNumber = _ref.navigateToRegisterPhoneNumber,
      navigateToConfirmPhone = _ref.navigateToConfirmPhone;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.SafeAreaView, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.ScrollView, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          mx: "xxs",
          mt: "xxs",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
              mb: "nano",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
                fontFamily: "reservaSerifMedium",
                fontSize: 28,
                children: "Confirme seu telefone"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
              mb: "xxs",
              mr: 22,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 14,
                children: "Mantenha seu n\xFAmero de telefone sempre atualizado para garantir seu cashback e ter acesso as nossas novidades."
              })
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            justifyContent: "center",
            mb: "xxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
              alignItems: "center",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
                fontFamily: "reservaSerifBold",
                fontSize: 22,
                color: "preto",
                children: profile == null ? undefined : (_profile$homePhone = profile.homePhone) == null ? undefined : _profile$homePhone.slice(3).replace(/(\d{2})(\d{5})(\d{4})/, '($1) *****-$3')
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            mb: "xs",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
              onPress: navigateToConfirmPhone,
              height: 50,
              inline: true,
              bg: "verdeSucesso",
              disabled: disableButton,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
                color: "white",
                fontFamily: "nunitoSemiBold",
                fontSize: 13,
                style: {
                  lineHeight: 24,
                  letterSpacing: 1.6
                },
                children: "CONFIRMAR"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
              mt: 12,
              onPress: navigateToRegisterPhoneNumber,
              variant: "primarioEstreitoOutline",
              inline: true,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
                color: "preto",
                fontFamily: "nunitoSemiBold",
                fontSize: 13,
                style: {
                  lineHeight: 24,
                  letterSpacing: 1.6
                },
                children: "ALTERAR N\xDAMERO"
              })
            })]
          })]
        })
      })
    });
  }
