  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewBanner(_ref) {
    var image = _ref.image,
      facets = _ref.facets,
      reference = _ref.reference,
      reservaMini = _ref.reservaMini,
      orderBy = _ref.orderBy,
      deepLinkNewsletter = _ref.deepLinkNewsletter,
      deepLink = _ref.deepLink,
      headerImageUrl = _ref.headerImageUrl;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[5]).useNavigation)();
    var onPress = (0, _react.useCallback)(function () {
      if (deepLink != null && deepLink.length) {
        _reactNative.Linking.openURL(deepLink);
        return;
      }

      // TODO deprecate this on future
      if (deepLinkNewsletter != null && deepLinkNewsletter.includes('/newsletter')) {
        navigation.navigate('Newsletter', {
          headerImageUrl: headerImageUrl
        });
        return;
      }
      navigation.navigate('ProductCatalog', {
        facets: facets,
        referenceId: reference,
        reservaMini: reservaMini,
        orderBy: orderBy
      });
    }, [navigation, facets, reference, reservaMini, orderBy, deepLinkNewsletter]);
    if (!image) {
      return null;
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, Object.assign({}, (0, _testProps.default)(`banner_container_${reference}`), {
      alignItems: "flex-start",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        mb: "quarck",
        width: 1,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, Object.assign({
          onPress: onPress
        }, (0, _testProps.default)(`banner_button_${reference}`), {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_ImageComponent.default, {
            source: {
              uri: image
            }
          })
        }))
      })
    }));
  }
  var _default = exports.default = NewBanner;
