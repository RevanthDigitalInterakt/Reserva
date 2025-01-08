  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PageFragment = PageFragment;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function PageFragment(_ref) {
    var _item$helpCenterSessi, _item$helpCenterBodyT, _item$expansePanel, _item$expansePanel2, _item$expansePanel2$e, _item$expansePanel2$e2;
    var item = _ref.item;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
      style: _styles.default.containerBody,
      children: [(item == null ? undefined : (_item$helpCenterSessi = item.helpCenterSessionTitle) == null ? undefined : _item$helpCenterSessi.length) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _styles.default.containerSessionTitle,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          style: _styles.default.txtSessionTitle,
          children: item == null ? undefined : item.helpCenterSessionTitle
        })
      }), (item == null ? undefined : (_item$helpCenterBodyT = item.helpCenterBodyText) == null ? undefined : _item$helpCenterBodyT.length) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _styles.default.containerBodyText,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          style: _styles.default.txtBodyText,
          children: item == null ? undefined : item.helpCenterBodyText
        })
      }), (item == null ? undefined : item.bodyImagesCollection) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_ImageComponent.default, {
        data: item == null ? undefined : item.bodyImagesCollection
      }), (item == null ? undefined : (_item$expansePanel = item.expansePanel) == null ? undefined : _item$expansePanel.expansePanelCollection) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        children: item == null ? undefined : (_item$expansePanel2 = item.expansePanel) == null ? undefined : (_item$expansePanel2$e = _item$expansePanel2.expansePanelCollection) == null ? undefined : (_item$expansePanel2$e2 = _item$expansePanel2$e.items) == null ? undefined : _item$expansePanel2$e2.map(function (expanseItem) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).ExpansePanel, {
              expanseTitleItem: expanseItem == null ? undefined : expanseItem.expanseTitleItem,
              expanseContentItem: expanseItem == null ? undefined : expanseItem.expanseContentItem
            })
          }, `item-expanse-panel-${expanseItem == null ? undefined : expanseItem.expanseTitleItem}`);
        })
      })]
    }, `page-helpCenter-${item == null ? undefined : item.helpCenterSessionTitle}`);
  }
