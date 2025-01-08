  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var React = _react;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function MenuSubItem(_ref) {
    var data = _ref.data,
      testID = _ref.testID,
      _onPress = _ref.onPress;
    (0, _react.useEffect)(function () {
      _EventProvider.default.logEvent('page_view', {
        item_brand: _$$_REQUIRE(_dependencyMap[5]).defaultBrand.picapau
      });
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, Object.assign({
      onPress: function onPress() {
        return _onPress(data);
      }
    }, (0, _testProps.default)(testID), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        bg: "backgroundMenuOpened",
        justifyContent: "space-between",
        paddingY: "micro",
        flexDirection: "row",
        paddingX: "xxs",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
          fontSize: 13,
          fontFamily: data.highlight ? 'nunitoBold' : 'nunitoRegular',
          children: data.name
        })
      })
    }));
  }
  var _default = exports.default = MenuSubItem;
