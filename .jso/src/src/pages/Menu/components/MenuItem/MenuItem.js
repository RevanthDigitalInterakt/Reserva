  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var React = _react;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _MenuSubItem = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function MenuItem(_ref) {
    var data = _ref.data,
      opened = _ref.opened,
      _onPress = _ref.onPress;
    var nameItem = data.name.toUpperCase();
    var itemsAddBadge = ['PERSONALIZAÇÕES', 'KIT LOOK'];
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TouchableOpacity, Object.assign({
        onPress: function onPress() {
          return _onPress(data);
        }
      }, (0, _testProps.default)(`com.usereserva:id/menu_button_${(0, _$$_REQUIRE(_dependencyMap[7]).slugify)(data.name)}`), {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          justifyContent: "space-between",
          marginY: "micro",
          flexDirection: "row",
          marginX: "xxxs",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).TypographyContainer, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
              color: data.highlight ? 'vermelhoAlerta' : 'preto',
              fontSize: 13,
              fontFamily: "nunitoBold",
              children: nameItem
            }), itemsAddBadge.includes(nameItem) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[10]).BadgeRound, {
              text: "Novidade"
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[11]).IconLegacy, {
              style: {
                transform: [{
                  rotate: opened ? '90deg' : '0deg'
                }]
              },
              name: "ChevronRight",
              color: "preto",
              size: 12
            })
          })]
        })
      })), opened && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Fragment, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Divider, {
          variant: "fullWidth",
          marginTop: "micro"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, Object.assign({}, (0, _testProps.default)('com.usereserva:id/animation_container'), {
          children: data.children.map(function (item, index) {
            return /*#__PURE__*/(0, _react.createElement)(_MenuSubItem.default, Object.assign({}, (0, _testProps.default)(`com.usereserva:id/menu_sub_item_${index}`), {
              key: `menusubitem-${item.name}-${item.type}-${item.customUrl}-${data.name}-${data.type}`,
              data: item,
              onPress: _onPress
            }));
          })
        }))]
      })]
    });
  }
  var _default = exports.default = MenuItem;
