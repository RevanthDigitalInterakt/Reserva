  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ListAddressItem;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _ListAddressItem = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _IconPlace = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconEdit = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _IconDelete = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function ListAddressItem(_ref) {
    var item = _ref.item,
      animationListController = _ref.animationListController,
      onNavigate = _ref.onNavigate,
      onShowModalConfirmDelete = _ref.onShowModalConfirmDelete,
      mainAddress = _ref.mainAddress;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.TouchableOpacity, {
      style: _ListAddressItem.default.listItemContainer,
      onPress: function onPress() {
        return animationListController(item.id);
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
        style: _ListAddressItem.default.listItemContent,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _ListAddressItem.default.listItemRow,
          children: [!item.selected && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconPlace.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
            style: {
              marginLeft: !item.selected ? 20 : 0,
              width: '85%'
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
              style: _ListAddressItem.default.listItemBodyContent,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
                style: _ListAddressItem.default.listItemTitle,
                numberOfLines: 1,
                children: item.addressName
              }), item.selected && mainAddress === item.id && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
                style: _ListAddressItem.default.tagMainAddressContainer,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
                  style: _ListAddressItem.default.tagMainAddressLabel,
                  children: "Endere\xE7o Principal"
                })
              })]
            })
          })]
        }), item.selected && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _ListAddressItem.default.listItemBody,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
            style: _ListAddressItem.default.listItemSubtitle,
            children: item.receiverName
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
            style: _ListAddressItem.default.listItemSubtitle,
            children: `${item.street}, ${item.number}, ${item.complement}`
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
            style: _ListAddressItem.default.listItemSubtitle,
            children: `${item.neighborhood}, ${item.city} - ${item.state}`
          })]
        })]
      }), item.selected && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
        style: _ListAddressItem.default.listItemActionsContainer,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
          style: _ListAddressItem.default.listItemActionButton,
          onPress: function onPress() {
            return onNavigate(item.id);
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconEdit.default, {})
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
          style: _ListAddressItem.default.listItemActionButton,
          onPress: function onPress() {
            return onShowModalConfirmDelete(item.id);
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconDelete.default, {})
        })]
      })]
    });
  }
