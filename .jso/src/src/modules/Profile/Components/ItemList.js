  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ItemList(_ref) {
    var onPress = _ref.onPress,
      icon = _ref.icon,
      title = _ref.title,
      descr = _ref.descr,
      arrowDown = _ref.arrowDown,
      dropdownActive = _ref.dropdownActive;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TouchableOpacity, Object.assign({
        onPress: onPress
      }, (0, _testProps.default)(`com.usereserva:id/generic_button_${(0, _$$_REQUIRE(_dependencyMap[5]).slugify)(title)}`), {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          mb: "micro",
          mt: "micro",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            flexDirection: "row",
            alignItems: "center",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
              pr: "micro",
              justifyContent: "flex-start",
              children: icon !== undefined && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).IconLegacy, {
                name: icon,
                size: 20
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
                fontSize: 14,
                fontFamily: "nunitoBold",
                children: title
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
                fontSize: 14,
                fontFamily: "nunitoRegular",
                children: descr
              })]
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            alignItems: "center",
            justifyContent: "center",
            children: arrowDown && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
              alignItems: "center",
              justifyContent: "center",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).IconLegacy, {
                name: dropdownActive ? 'ArrowUp' : 'ArrowDown',
                color: "vermelhoAlerta",
                size: 18
              })
            })
          })]
        })
      })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Divider, {
        variant: "fullWidth"
      })]
    });
  }
  var _default = exports.default = ItemList;
