  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _useSearchStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _FilterCategories = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _FilterColors = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _FilterSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _FilterPrices = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function getFacetValue(values) {
    return new Set(Array.from(values).map(function (item) {
      return item.hex || item.value;
    }));
  }
  function FilterModal(_ref) {
    var onClose = _ref.onClose,
      visible = _ref.visible,
      defaultFacets = _ref.defaultFacets;
    var _useSearchStore = (0, _useSearchStore2.default)(['parameters', 'onSearch', 'filters']),
      parameters = _useSearchStore.parameters,
      onSearch = _useSearchStore.onSearch,
      filters = _useSearchStore.filters;
    var _useState = (0, _react.useState)(getFacetValue(filters.categories)),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedCategories = _useState2[0],
      setSelectedCategories = _useState2[1];
    var _useState3 = (0, _react.useState)(getFacetValue(filters.colors)),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      selectedColors = _useState4[0],
      setSelectedColors = _useState4[1];
    var _useState5 = (0, _react.useState)(getFacetValue(filters.sizes)),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      selectedSizes = _useState6[0],
      setSelectedSizes = _useState6[1];
    var _useState7 = (0, _react.useState)(filters.price),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      selectedPriceRange = _useState8[0],
      setSelectedPriceRange = _useState8[1];
    var _useState9 = (0, _react.useState)(),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      facets = _useState10[0],
      setFacets = _useState10[1];
    var _useSearchFacetsLazyQ = (0, _$$_REQUIRE(_dependencyMap[13]).useSearchFacetsLazyQuery)({
        notifyOnNetworkStatusChange: true,
        context: {
          clientName: 'gateway'
        }
      }),
      _useSearchFacetsLazyQ2 = (0, _slicedToArray2.default)(_useSearchFacetsLazyQ, 2),
      doLoadFacetsData = _useSearchFacetsLazyQ2[0],
      loading = _useSearchFacetsLazyQ2[1].loading;
    var onGetFacetsData = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var _yield$doLoadFacetsDa = yield doLoadFacetsData({
            variables: {
              input: {
                q: parameters.q,
                facets: defaultFacets || []
              }
            }
          }),
          data = _yield$doLoadFacetsDa.data;
        if (!(data != null && data.searchFacets)) return;
        setFacets(data == null ? undefined : data.searchFacets);
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(err);
      }
    }), [defaultFacets, doLoadFacetsData, parameters.q]);
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
    var onApplyFilters = (0, _react.useCallback)(function () {
      try {
        if (!facets) return;
        var categories = facets.categories.filter(function (item) {
          return selectedCategories.has(item.value);
        });
        var colors = facets.colors.filter(function (item) {
          return selectedColors.has(item.hex);
        });
        var sizes = facets.sizes.filter(function (item) {
          return selectedSizes.has(item.value.toUpperCase());
        });
        var priceRange = selectedPriceRange ? {
          from: selectedPriceRange == null ? undefined : selectedPriceRange.from,
          to: selectedPriceRange.to
        } : undefined;
        onSearch({
          page: 1,
          priceRange: priceRange,
          facets: [].concat((0, _toConsumableArray2.default)(defaultFacets || []), (0, _toConsumableArray2.default)(categories), (0, _toConsumableArray2.default)(colors), (0, _toConsumableArray2.default)(sizes)).map(function (_ref3) {
            var key = _ref3.key,
              value = _ref3.value;
            return {
              key: key,
              value: value
            };
          })
        }, {
          categories: new Set(categories),
          sizes: new Set(sizes),
          colors: new Set(colors),
          price: priceRange
        }).then(function () {
          return onClose();
        });
      } catch (err) {
        _reactNative.Alert.alert('', 'Ocorreu um erro ao filtrar os produtos', [{
          onPress: onClose,
          text: 'OK'
        }]);
      }
    }, [facets, selectedPriceRange, onSearch, defaultFacets, selectedCategories, selectedColors, selectedSizes, onClose]);
    (0, _react.useEffect)(function () {
      onGetFacetsData();
    }, [parameters.q]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Box, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNativeModal.default, {
        testID: "com.usereserva:id/filter_modal_content",
        style: {
          margin: 0
        },
        animationIn: "slideInRight",
        animationOut: "slideOutRight",
        avoidKeyboard: true,
        onBackButtonPress: onClose,
        onBackdropPress: onClose,
        backdropColor: _$$_REQUIRE(_dependencyMap[17]).theme.colors.modalBackDropColor,
        isVisible: visible,
        children: loading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Box, {
          bg: "white",
          marginY: "nano",
          justifyContent: "center",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.ActivityIndicator, {
            size: "small",
            color: _$$_REQUIRE(_dependencyMap[18]).COLORS.BLACK
          })
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Box, {
          height: _configDeviceSizes.default.DEVICE_HEIGHT,
          marginLeft: "xl",
          marginY: "micro",
          bg: "white",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[19]).SafeAreaView, {
            flex: 1,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.ScrollView, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Box, {
                paddingX: "micro",
                paddingTop: "xs",
                paddingBottom: "nano",
                flexDirection: "row",
                justifyContent: "space-between",
                testID: "com.usereserva:id/filter_modal_content_filter_by",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[20]).Typography, {
                  fontFamily: "reservaSerifRegular",
                  fontSize: "24px",
                  children: "Filtrar Por:"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_FilterCategories.default, {
                data: (facets == null ? undefined : facets.categories) || [],
                selectedItems: selectedCategories,
                onUpdate: setSelectedCategories
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[21]).Divider, {
                variant: "fullWidth",
                marginBottom: "nano",
                marginTop: "nano"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_FilterColors.default, {
                data: (facets == null ? undefined : facets.colors) || [],
                selectedItems: selectedColors,
                onUpdate: setSelectedColors
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[21]).Divider, {
                variant: "fullWidth",
                marginBottom: "nano",
                marginTop: "nano"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_FilterSizes.default, {
                data: (facets == null ? undefined : facets.sizes) || [],
                selectedItems: selectedSizes,
                onUpdate: setSelectedSizes
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[21]).Divider, {
                variant: "fullWidth",
                marginBottom: "nano",
                marginTop: "nano"
              }), !!(facets != null && facets.prices) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_FilterPrices.default, {
                data: facets.prices,
                selectedPriceRange: selectedPriceRange,
                onUpdatePriceRange: setSelectedPriceRange
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_$$_REQUIRE(_dependencyMap[16]).Box, {
                paddingTop: "micro",
                flexDirection: "row",
                mb: "micro",
                justifyContent: "center",
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Box, {
                  width: 0.5,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[22]).Button, {
                    testID: "com.usereserva:id/button_back_filter_modal",
                    onPress: function onPress() {
                      return onClose();
                    },
                    marginLeft: "micro",
                    marginRight: "nano",
                    title: "VOLTAR",
                    variant: "primarioEstreitoOutline",
                    inline: true
                  })
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Box, {
                  width: 0.5,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[22]).Button, {
                    testID: "com.usereserva:id/button_aply_filter_modal",
                    onPress: onApplyFilters,
                    marginRight: "micro",
                    marginLeft: "nano",
                    title: "APLICAR",
                    variant: "primarioEstreito",
                    inline: true
                  })
                })]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[22]).Button, {
                testID: "com.usereserva:id/button_cleanFilters_filter_modal",
                onPress: onClearFilters,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[20]).Typography, {
                  color: "progressTextColor",
                  variant: "precoAntigo3",
                  style: {
                    textDecorationLine: 'underline'
                  },
                  children: "Limpar filtros"
                })
              })]
            })
          })
        })
      })
    });
  }
  var _default = exports.default = FilterModal;
