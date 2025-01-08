  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalClientIsPrime = ModalClientIsPrime;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _IconLogoPrime = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ModalClientIsPrime(_ref) {
    var isVisible = _ref.isVisible,
      onBackdropPress = _ref.onBackdropPress;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[6]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var firstName = (0, _react.useMemo)(function () {
      return (profile == null ? undefined : profile.firstName) || (profile == null ? undefined : profile.email);
    }, [profile == null ? undefined : profile.firstName, profile == null ? undefined : profile.email]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNativeModal.default, {
      testID: "com.usereserva:id/Modal_Client_Is_Prime",
      isVisible: isVisible,
      onBackdropPress: onBackdropPress,
      animationInTiming: 300,
      animationIn: "fadeIn",
      animationOut: "fadeOut",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[8]).styles.modalWrapper,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconLogoPrime.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[8]).styles.textContainer,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[8]).styles.text,
            children: ["Ol\xE1!", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[8]).styles.textBold,
              children: firstName
            }), ' ', "detectamos que voc\xEA j\xE1 \xE9 um cliente", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
              variant: "descontoTag2",
              color: "fullBlack",
              style: _$$_REQUIRE(_dependencyMap[8]).styles.primeText,
              children: "Prime"
            }), ", ent\xE3o n\xE3o se preocupe, estamos removendo este produto do carrinho e mantendo apenas os demais produtos selecionados com o desconto da sua assinatura ativa."]
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, Object.assign({}, (0, _testProps.default)('com.usereserva:id/Modal_Client_Is_Prime_Modal_Button'), {
          accessible: true,
          title: "CONTINUAR",
          color: "white",
          backgroundColor: "fullBlack",
          onPress: onBackdropPress,
          width: "100%",
          variant: "primarioEstreito"
        }))]
      })
    });
  }
