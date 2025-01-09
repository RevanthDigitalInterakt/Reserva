  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CashbackInStoreView = CashbackInStoreView;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CashbackInStoreView(_ref) {
    var token = _ref.token,
      generateToken = _ref.generateToken,
      toggleModal = _ref.toggleModal,
      modalVisible = _ref.modalVisible,
      termsIsAccepted = _ref.termsIsAccepted,
      acceptTermsAndConditions = _ref.acceptTermsAndConditions;
    var _useLazyQuery = (0, _$$_REQUIRE(_dependencyMap[5]).useLazyQuery)(_$$_REQUIRE(_dependencyMap[6]).profileQuery, {
        fetchPolicy: 'no-cache'
      }),
      _useLazyQuery2 = (0, _slicedToArray2.default)(_useLazyQuery, 1),
      getProfile = _useLazyQuery2[0];
    var navigation = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    (0, _react.useEffect)(function () {
      getProfile().then(function (response) {
        var _response$data;
        if (!((_response$data = response.data) != null && _response$data.profile)) navigation.navigate('Login', {
          comeFrom: 'Profile'
        });
      });
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
      mx: "xxs",
      mt: "sm",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        mb: "nano",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
          fontFamily: "reservaSerifMedium",
          fontSize: 28,
          children: "Cashback em Lojas"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        mb: "xxs",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
          fontFamily: "nunitoRegular",
          fontSize: 14,
          children: "Use o QR Code para gerar cashback nas compras em lojas f\xEDsicas."
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        mt: "xl",
        alignItems: "center",
        justifyContent: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.ImageBackground, {
          source: _icons.default.QrcodeBackground,
          style: {
            width: 230,
            height: 230,
            justifyContent: 'center'
          },
          resizeMode: "contain",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            alignItems: "center",
            justifyContent: "center"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          mt: "xl",
          mb: "xxs",
          width: "100%",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Button, {
            onPress: function onPress() {
              return generateToken();
            },
            height: 50,
            bg: "preto",
            width: "100%",
            disabled: !termsIsAccepted,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              color: "white",
              children: "GERAR QR CODE"
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).ModalTermsAndConditionsCashback, {
          isVisible: modalVisible,
          setIsVisible: toggleModal,
          setTermAndConditions: acceptTermsAndConditions
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          borderRadius: 4,
          bg: "#F9F8F6",
          borderWidth: 1,
          borderColor: "#C7C3B7",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          mb: "nano",
          height: 42,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Checkbox, {
              marginLeft: 13,
              checked: termsIsAccepted,
              color: "preto",
              onCheck: acceptTermsAndConditions
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Button, {
              onPress: toggleModal,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 14,
                color: "preto",
                children: ['Li e aceito os ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                  style: {
                    textDecorationLine: 'underline'
                  },
                  children: "termos e condi\xE7\xF5es de uso."
                })]
              })
            })
          })]
        })]
      })]
    });
  }
