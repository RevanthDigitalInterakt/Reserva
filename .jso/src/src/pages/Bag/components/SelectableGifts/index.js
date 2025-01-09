  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = SelectableGifts;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var fontTitlePerPlatform = _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[7]).platformType.ANDROID ? 0.0352 : 0.036;
  var fontTitle = _configDeviceSizes.default.DEVICE_WIDTH * fontTitlePerPlatform;
  var subtitle = _configDeviceSizes.default.DEVICE_WIDTH * 0.032;
  function getArrayColors(itemsInfo) {
    var colors = itemsInfo.map(function (itemInfo) {
      return (itemInfo == null ? undefined : itemInfo.color) || '';
    });
    return new Set(colors);
  }
  function SelectableGifts() {
    var _selectableGift$curre5, _selectableGift$curre6;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showMoreSizes = _useState2[0],
      setShowMoreSizes = _useState2[1];
    var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      giftSizeList = _useState4[0],
      setGiftSizeList = _useState4[1];
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[8]).useBagStore)(['selectableGift', 'currentSelectedGiftSize', 'currentSelectedColorGift', 'actions']),
      currentSelectedColorGift = _useBagStore.currentSelectedColorGift,
      currentSelectedGiftSize = _useBagStore.currentSelectedGiftSize,
      selectableGift = _useBagStore.selectableGift,
      actions = _useBagStore.actions;
    var giftImage = (0, _react.useMemo)(function () {
      var _selectableGift$curre, _selectableGift$curre2, _selectableGift$curre3;
      return selectableGift == null ? undefined : (_selectableGift$curre = selectableGift.currentSelectableGift.imageUrl) == null ? undefined : (_selectableGift$curre2 = _selectableGift$curre.replace('http', 'https')) == null ? undefined : (_selectableGift$curre3 = _selectableGift$curre2.split('-55-55')) == null ? undefined : _selectableGift$curre3.join('');
    }, [selectableGift == null ? undefined : selectableGift.currentSelectableGift]);
    var handleGenerateAndSetGiftSizeList = (0, _react.useCallback)(function (_ref) {
      var currentColorSelected = _ref.currentColorSelected,
        giftOptions = _ref.giftOptions;
      var giftList = new Set();
      giftOptions.forEach(function (giftOption) {
        if ((giftOption == null ? undefined : giftOption.color) === currentColorSelected) {
          giftList.add(giftOption.size);
        }
      });
      setGiftSizeList((0, _toConsumableArray2.default)(giftList));
    }, [setGiftSizeList]);
    var handleSelectedGiftColor = (0, _react.useCallback)(function (_ref2) {
      var color = _ref2.color;
      actions.SELECT_GIFT(color, '');
    }, [actions]);
    var handleAddGift = (0, _react.useCallback)(function (giftId) {
      var gift = selectableGift == null ? undefined : selectableGift.availableGifts.find(function (giftItem) {
        return giftItem.id === giftId;
      });
      if (!gift || !(selectableGift != null && selectableGift.id)) return;
      actions.ADD_AVAILABLE_GIFT(gift, selectableGift == null ? undefined : selectableGift.id);
    }, [actions, selectableGift]);
    var handleSelectGiftSize = (0, _react.useCallback)(function (_ref3) {
      var size = _ref3.size;
      var giftToAddOrderForm = selectableGift == null ? undefined : selectableGift.giftOptions.find(function (giftOption) {
        return (giftOption == null ? undefined : giftOption.color) === currentSelectedColorGift && giftOption.size === size;
      });
      if (!giftToAddOrderForm) return;
      handleAddGift(giftToAddOrderForm.id);
    }, [currentSelectedColorGift, handleAddGift, selectableGift == null ? undefined : selectableGift.giftOptions]);
    (0, _react.useEffect)(function () {
      handleGenerateAndSetGiftSizeList({
        currentColorSelected: currentSelectedColorGift,
        giftOptions: (selectableGift == null ? undefined : selectableGift.giftOptions) || []
      });
    }, [currentSelectedColorGift, handleGenerateAndSetGiftSizeList, selectableGift == null ? undefined : selectableGift.giftOptions]);
    (0, _react.useEffect)(function () {
      if (selectableGift != null && selectableGift.currentSelectableGift) {
        var _selectableGift$curre4;
        var currentColorSelected = ((_selectableGift$curre4 = selectableGift.currentSelectableGift.skuName.split('-')[0]) == null ? undefined : _selectableGift$curre4.trim()) || '';
        handleGenerateAndSetGiftSizeList({
          currentColorSelected: currentColorSelected,
          giftOptions: selectableGift.giftOptions
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, _react.useEffect)(function () {
      if ((selectableGift == null ? undefined : selectableGift.currentSelectableGift.isSelected) === false) {
        handleAddGift(selectableGift.currentSelectableGift.id);
      }
    }, [selectableGift == null ? undefined : selectableGift.currentSelectableGift, handleAddGift]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
      flexDirection: "row",
      minHeight: 152,
      mt: "xxs",
      children: [giftImage && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_ImageComponent.default, {
        source: {
          uri: giftImage
        },
        width: _configDeviceSizes.default.DEVICE_WIDTH * 0.25,
        height: 152
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        ml: "micro",
        flex: 1,
        minHeight: 152,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          minHeight: 93,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
              fontFamily: "reservaSerifBold",
              fontSize: fontTitle,
              children: "Parab\xE9ns, voc\xEA ganhou um brinde!"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
            minHeight: 48,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
              fontFamily: "reservaSansLight",
              fontSize: subtitle,
              children: "Sua compra tem uma vantagem especial:"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
              fontFamily: "reservaSansLight",
              fontSize: subtitle,
              children: ["voc\xEA ganhou", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
                fontFamily: "reservaSansBold",
                fontSize: subtitle,
                children: [' ', "1", ' ', selectableGift == null ? undefined : (_selectableGift$curre5 = selectableGift.currentSelectableGift.name) == null ? undefined : (_selectableGift$curre6 = _selectableGift$curre5.split('-')[0]) == null ? undefined : _selectableGift$curre6.trim()]
              })]
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.ScrollView, {
            horizontal: true,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
              alignItems: "flex-start",
              flexWrap: "wrap",
              flexDirection: "row",
              children: (0, _toConsumableArray2.default)(getArrayColors((selectableGift == null ? undefined : selectableGift.giftOptions) || [])).map(function (colorItem, index) {
                return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, {
                  onPress: function onPress() {
                    return handleSelectedGiftColor({
                      color: colorItem
                    });
                  },
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
                    borderWidth: "hairline",
                    borderColor: "divider",
                    borderRadius: "pico",
                    height: _configDeviceSizes.default.DEVICE_WIDTH * 0.06,
                    bg: currentSelectedColorGift === colorItem ? 'preto' : 'white',
                    alignItems: "center",
                    justifyContent: "center",
                    paddingX: "nano",
                    marginRight: index < colorItem.length ? 'micro' : null,
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
                      color: currentSelectedColorGift === colorItem ? 'white' : 'preto',
                      fontFamily: "reservaSansBold",
                      fontSize: 10.3,
                      children: colorItem
                    })
                  })
                }, `${colorItem}_btn`);
              })
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          minHeight: 59,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
            mb: "micro",
            flexDirection: "row",
            justifyContent: "space-between",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
              fontFamily: "reservaSansBold",
              fontSize: subtitle,
              children: "Selecione o tamanho"
            }), showMoreSizes && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, {
              onPress: function onPress() {
                return setShowMoreSizes(!showMoreSizes);
              },
              hitSlop: {
                left: 50,
                top: 15,
                bottom: 15
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
                  fontFamily: "reservaSansRegular",
                  fontSize: subtitle,
                  children: "Ver mais"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).IconLegacy, {
                  style: showMoreSizes ? {
                    transform: [{
                      rotate: '-90deg'
                    }]
                  } : {
                    transform: [{
                      translateY: 4
                    }]
                  },
                  name: showMoreSizes ? 'ChevronRight' : 'ArrowDown',
                  color: "preto",
                  marginLeft: "nano",
                  size: 12
                })]
              })
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
            flex: 1,
            justifyContent: "flex-end",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[14]).RadioButtons, {
                size: _configDeviceSizes.default.DEVICE_WIDTH * 0.08,
                fontSize: 11.5,
                disbledOptions: [],
                onSelectedChange: function onSelectedChange(giftSize) {
                  return handleSelectGiftSize({
                    size: giftSize
                  });
                },
                optionsList: showMoreSizes ? giftSizeList : giftSizeList == null ? undefined : giftSizeList.slice(0, 5),
                showMoreSizes: showMoreSizes,
                defaultSelectedItem: "",
                selectedItem: currentSelectedGiftSize.trim()
              })
            })
          })]
        })]
      })]
    });
  }
