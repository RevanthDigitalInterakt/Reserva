  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function AddressSelector(_ref) {
    var selected = _ref.selected,
      select = _ref.select,
      disabled = _ref.disabled,
      edit = _ref.edit,
      deleteAddress = _ref.deleteAddress,
      editAndDelete = _ref.editAndDelete,
      addressData = _ref.addressData;
    var address = addressData.address,
      title = addressData.title,
      zipcode = addressData.zipcode;
    var CEP = (0, _react.useMemo)(function () {
      if (zipcode) {
        return `${zipcode.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1-$2').replace(/(-\d{3})\d+?$/, '$1')}`;
      }
      return '';
    }, [zipcode]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TouchableOpacity, Object.assign({
      disabled: disabled,
      onPress: select
    }, (0, _testProps.default)('delivery_address_selector'), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        bg: "white",
        borderWidth: "hairline",
        borderColor: "preto",
        width: "100%",
        height: "auto",
        flexDirection: "row",
        p: "nano",
        mt: "xxxs",
        alignItems: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          height: 50,
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            m: "nano",
            alignItems: "center",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              width: "10%",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                height: 15,
                width: 15,
                borderRadius: "infinity",
                borderWidth: "hairline",
                alignItems: "center",
                justifyContent: "center",
                children: selected && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                  height: 10,
                  width: 10,
                  borderRadius: "nano",
                  bg: "preto"
                })
              })
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          paddingX: "quarck",
          mt: "nano",
          flex: 1,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            fontFamily: _$$_REQUIRE(_dependencyMap[7]).theme.fonts.nunitoBold,
            fontSize: 13,
            lineHeight: 18,
            children: title
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mb: "nano",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
              style: {
                flexWrap: 'wrap'
              },
              fontFamily: "nunitoRegular",
              fontSize: 13,
              lineHeight: 16,
              children: address
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            flexDirection: "row",
            width: "100%",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              width: 0.5,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 13,
                lineHeight: 16,
                children: ["CEP:", CEP]
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              width: 0.5,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              children: editAndDelete && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                flexDirection: "row",
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
                  onPress: edit,
                  pb: "quarck",
                  hitSlop: {
                    top: 10,
                    left: 10,
                    bottom: 30,
                    right: 10
                  },
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                    fontFamily: "nunitoRegular",
                    fontSize: 13,
                    lineHeight: 16,
                    style: {
                      textDecorationLine: 'underline'
                    },
                    children: "editar"
                  })
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Button, {
                  hitSlop: {
                    top: 10,
                    left: -10,
                    bottom: 30,
                    right: 10
                  },
                  onPress: deleteAddress,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).IconLegacy, {
                    ml: "xxs",
                    name: "Trash",
                    color: "preto",
                    size: 15
                  })
                })]
              })
            })]
          })]
        })]
      })
    }));
  }
  var _default = exports.default = AddressSelector;
