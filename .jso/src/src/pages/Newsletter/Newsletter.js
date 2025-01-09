  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Newsletter;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Newsletter(_ref) {
    var _route$params;
    var navigation = _ref.navigation,
      route = _ref.route;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      openModal = _useState2[0],
      setOpenModal = _useState2[1];
    var headerImageUrl = (_route$params = route.params) == null ? undefined : _route$params.headerImageUrl;
    var onBackdropPress = (0, _react.useCallback)(function () {
      setOpenModal(false);
      navigation.navigate('Home');
    }, [navigation]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
      style: _styles.default.containerPage,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).TopBarDefaultBackButton, {
        navigateGoBack: true,
        loading: false
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).ModalNewsletter, {
        isVisible: openModal,
        onBackdropPress: onBackdropPress
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.ScrollView, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
          style: _styles.default.containerMain,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Image, {
              style: _styles.default.imageHeader,
              source: headerImageUrl ? {
                uri: headerImageUrl
              } : _icons.default.newsletter,
              resizeMode: "cover"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
            style: _styles.default.containerBody,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
              style: _styles.default.containerTxtTitle,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
                style: _styles.default.txtTitle,
                children: "Fique por dentro das novidades!"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
              style: _styles.default.containerTxtSubTitle,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
                style: _styles.default.txtSubTitle,
                children: "Inscreva-se na nossa newsletter para n\xE3o perder as novidades e promo\xE7\xF5es."
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).FormNewsletter, {
              setOpenModal: setOpenModal
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
            style: _styles.default.umP5PWrapper,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Image, {
              source: _$$_REQUIRE(_dependencyMap[10]).commons.umPCincoPLogo,
              alt: "1p5p"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
              style: _styles.default.divider
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
              style: _styles.default.umP5PText,
              children: "A cada pe\xE7a vendida 5 pratos s\xE3o complementados atrav\xE9s da ONG Mesa Brasil."
            })]
          })]
        })
      })]
    });
  }
