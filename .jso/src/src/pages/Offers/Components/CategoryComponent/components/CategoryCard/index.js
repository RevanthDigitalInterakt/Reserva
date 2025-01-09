  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = CategoryCard;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CategoryCard(_ref) {
    var url = _ref.url,
      id = _ref.id,
      referenceId = _ref.referenceId;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)();
    var onPress = (0, _react.useCallback)(function () {
      try {
        _EventProvider.default.logEvent('offers_category_banner_click', {
          category: referenceId,
          banner_position: id
        });
        navigation.navigate('ProductCatalog', {
          referenceId: referenceId
        });
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[7]).ExceptionProvider.captureException(error);
      }
    }, [referenceId]);
    if (!url) {
      return null;
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.TouchableOpacity, Object.assign({
      onPress: onPress,
      style: _$$_REQUIRE(_dependencyMap[9]).styles.childContainer
    }, (0, _testProps.default)('category_card_item'), {
      children: url && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_ImageComponent.default, {
        style: _$$_REQUIRE(_dependencyMap[9]).styles.image,
        source: {
          uri: url
        },
        resizeMode: "contain"
      })
    }));
  }
