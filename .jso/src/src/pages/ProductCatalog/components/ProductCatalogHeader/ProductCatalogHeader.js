  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _FilterModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _useSearchStore3 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var SHOW_FILTER_BUTTON = true;
  function ProductCatalogHeader(_ref) {
    var defaultFacets = _ref.defaultFacets,
      _ref$showWhatsappButt = _ref.showWhatsappButton,
      showWhatsappButton = _ref$showWhatsappButt === undefined ? true : _ref$showWhatsappButt;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      filterVisible = _useState2[0],
      setFilterVisible = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      sortVisible = _useState4[0],
      setSortVisible = _useState4[1];
    var _useSearchStore = (0, _useSearchStore3.default)(['resultCount', 'filters']),
      resultCount = _useSearchStore.resultCount;
    var _useSearchStore2 = (0, _useSearchStore3.default)(['onSearch', 'parameters']),
      onSearch = _useSearchStore2.onSearch,
      parameters = _useSearchStore2.parameters;
    var onClearFilters = (0, _react.useCallback)(function () {
      onSearch({
        page: 1,
        priceRange: undefined,
        facets: defaultFacets || []
      }, {
        categories: new Set(),
        sizes: new Set(),
        colors: new Set(),
        price: undefined
      });
    }, [defaultFacets, onSearch]);
    var onClickWhatsappButton = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      _EventProvider.default.logEvent('whatsapp_bar_click', {});
      yield _reactNative.Linking.openURL('https://whts.co/reserva');
    }), []);
    var onClickFilterButton = (0, _react.useCallback)(function () {
      setFilterVisible(true);
      _EventProvider.default.logEvent('filter_button_click', {});
    }, []);
    var onClickSortButton = (0, _react.useCallback)(function () {
      setSortVisible(true);
      _EventProvider.default.logEvent('sort_button_click', {});
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[10]).styles.container,
      children: [showWhatsappButton && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
        bg: "dropDownBorderColor",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, Object.assign({
          p: "nano",
          onPress: onClickWhatsappButton
        }, (0, _testProps.default)('com.usereserva:id/whatssapp_button_product_catalog'), {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
            flexDirection: "row",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).IconLegacy, {
              name: "Whatsapp",
              size: 16,
              color: "preto"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
              marginX: "nano",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                color: "preto",
                fontFamily: "nunitoSemiBold",
                fontSize: 11,
                children: ["Chama no Whats! Seja atendido sem sair de casa.", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                  style: {
                    textDecorationLine: 'underline'
                  },
                  children: "Clique aqui!"
                })]
              })
            })]
          })
        }))
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
        paddingY: "micro",
        flexDirection: "row",
        justifyContent: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
          width: 0.5,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, {
            onPress: function onPress() {
              return onClickFilterButton();
            },
            marginRight: "nano",
            marginLeft: "micro",
            borderRadius: "nano",
            borderColor: "dropDownBorderColor",
            borderWidth: "hairline",
            flexDirection: "row",
            inline: true,
            height: 40,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              color: "preto",
              fontFamily: "nunitoSemiBold",
              fontSize: "14px",
              children: "Filtrar"
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
          width: 0.5,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, {
            marginRight: "micro",
            marginLeft: "nano",
            borderRadius: "nano",
            borderColor: "dropDownBorderColor",
            borderWidth: "hairline",
            flexDirection: "row",
            inline: true,
            height: 40,
            onPress: function onPress() {
              return onClickSortButton();
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              color: "preto",
              fontFamily: "nunitoSemiBold",
              fontSize: "14px",
              children: "Ordenar"
            })
          })
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
        paddingX: "micro",
        paddingTop: "quarck",
        paddingBottom: "xxxs",
        flexDirection: "row",
        justifyContent: "space-between",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
          fontFamily: "nunitoRegular",
          fontSize: "13px",
          children: [resultCount, ' ', "produtos encontrados"]
        }), parameters.facets !== defaultFacets && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, Object.assign({}, (0, _testProps.default)('com.usereserva:id/button_clear_product_catalog'), {
          onPress: onClearFilters,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
            color: "progressTextColor",
            variant: "precoAntigo3",
            style: {
              textDecorationLine: 'underline'
            },
            children: "Limpar tudo"
          })
        }))]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_FilterModal.default, {
        visible: filterVisible,
        onClose: function onClose() {
          return setFilterVisible(false);
        },
        defaultFacets: defaultFacets
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Picker, {
        onSelect: function onSelect(item) {
          setSortVisible(false);
          onSearch({
            orderBy: item.value
          });
        },
        isVisible: sortVisible,
        items: _$$_REQUIRE(_dependencyMap[16]).orderByTypes,
        onAndroidBackButtonPress: function onAndroidBackButtonPress() {
          return setSortVisible(false);
        },
        onClose: function onClose() {
          return setSortVisible(false);
        },
        onBackDropPress: function onBackDropPress() {
          return setSortVisible(false);
        },
        title: "Ordenar Por"
      })]
    });
  }
  var _default = exports.default = ProductCatalogHeader;
