  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _icons = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function OneP5P(_ref) {
    var comingFrom = _ref.comingFrom,
      itemQuantity = _ref.itemQuantity;
    var _useNavigation = (0, _$$_REQUIRE(_dependencyMap[5]).useNavigation)(),
      navigate = _useNavigation.navigate;
    var mealsAmount = itemQuantity ? itemQuantity * 5 : 0;
    var isComingFromPdp = (0, _react.useMemo)(function () {
      return comingFrom === 'PDP';
    }, [comingFrom]);
    if (comingFrom === 'home') {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        style: {
          alignItems: 'center',
          paddingHorizontal: 25
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
          style: {
            flexDirection: 'row',
            alignItems: 'center'
          },
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_ImageComponent.default, {
            style: {
              width: 125,
              height: 125
            },
            source: _icons.default.green1p5p
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
            style: {
              flex: 1,
              maxWidth: '70%'
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
              style: {
                fontSize: 12,
                fontFamily: _$$_REQUIRE(_dependencyMap[7]).FONTS.RESERVA_SANS_REGULAR,
                textAlign: 'center'
              },
              children: "A cada pe\xE7a vendida 5 pratos s\xE3o complementados atrav\xE9s da ONG Mesa Brasil."
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, {
          style: {
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            padding: 15,
            borderRadius: 8,
            marginTop: -30
          },
          onPress: function onPress() {
            return navigate('PageOneP5P', {
              comeFrom: 'Home'
            });
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
            style: {
              fontSize: 14,
              fontFamily: _$$_REQUIRE(_dependencyMap[7]).FONTS.RESERVA_SANS_BOLD,
              textAlign: 'center'
            },
            children: "Saiba mais sobre o projeto"
          })
        })]
      });
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
      style: {
        alignItems: 'center',
        marginBottom: -30,
        marginTop: isComingFromPdp ? -20 : 24,
        height: 50
      },
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        style: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_ImageComponent.default, {
          style: {
            width: 100,
            height: 100
          },
          source: _icons.default.black1p5p
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
          style: {
            alignSelf: 'center',
            width: 1,
            height: 30,
            backgroundColor: _$$_REQUIRE(_dependencyMap[8]).COLORS.LIGHT_GRAY,
            marginHorizontal: 15
          }
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
          style: {
            flex: 1,
            maxWidth: '70%'
          },
          children: comingFrom === 'PDP' ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
            style: {
              fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).scale)(8.5),
              fontFamily: _$$_REQUIRE(_dependencyMap[7]).FONTS.RESERVA_SANS_REGULAR,
              textAlign: 'center'
            },
            children: "Ao comprar essa pe\xE7a voc\xEA est\xE1 doando 5 pratos de comida para quem tem fome. Saiba mais no menu do app."
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.Text, {
            style: {
              fontSize: 12,
              fontFamily: _$$_REQUIRE(_dependencyMap[7]).FONTS.RESERVA_SANS_REGULAR,
              textAlign: 'center'
            },
            children: ["Na sua compra voc\xEA acaba de doar", ' ', mealsAmount, ' ', "pratos de comida para quem mais precisa. Muito obrigado."]
          })
        })]
      })
    });
  }
  var _default = exports.default = OneP5P;
