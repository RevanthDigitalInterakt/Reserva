  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SearchBar = SearchBar;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function SearchBar(_ref) {
    var _ref$height = _ref.height,
      height = _ref$height === undefined ? 36 : _ref$height,
      iconName = _ref.iconName,
      placeholder = _ref.placeholder,
      autocomplete = _ref.autocomplete,
      value = _ref.value,
      onValueChange = _ref.onValueChange,
      onClickIcon = _ref.onClickIcon,
      onClickAutocomplete = _ref.onClickAutocomplete,
      testID = _ref.testID;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        height: height,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "nano",
        backgroundColor: "backgoundInput",
        paddingX: "nano",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          ml: "quarck",
          mr: "nano",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).IconLegacy, {
            name: iconName || 'Search',
            size: 18
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          flexGrow: 1,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.TextInput, {
            placeholderTextColor: _$$_REQUIRE(_dependencyMap[6]).theme.colors.searchBarTextColor,
            placeholder: placeholder,
            returnKeyType: "search",
            enablesReturnKeyAutomatically: true,
            onSubmitEditing: function onSubmitEditing() {
              return onClickIcon && onClickIcon();
            },
            onChangeText: function onChangeText(text) {
              if (onValueChange) {
                onValueChange(text);
              }
            },
            testID: testID,
            value: value,
            style: {
              color: _$$_REQUIRE(_dependencyMap[6]).theme.colors.searchBarTextColor,
              fontFamily: _$$_REQUIRE(_dependencyMap[6]).theme.fonts.nunitoRegular,
              fontSize: 15,
              padding: 0
            }
          })
        })]
      }), autocomplete && autocomplete.length > 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        backgroundColor: "white",
        paddingY: "xxxs",
        children: autocomplete.map(function (item) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
            inline: true,
            onPress: function onPress() {
              if (onClickAutocomplete) {
                onClickAutocomplete(item);
              }
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
              width: "100%",
              paddingY: "nano",
              paddingLeft: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
                variant: "botaoFiltrarEOrdenarProdutos",
                children: item
              })
            })
          }, `autocomplete-search-${item}`);
        })
      })]
    });
  }
