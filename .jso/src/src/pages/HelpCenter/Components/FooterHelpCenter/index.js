  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = FooterHelpCenter;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function FooterHelpCenter() {
    var _footerHelpCenter$foo;
    var _useHelpCenterStore = (0, _$$_REQUIRE(_dependencyMap[4]).useHelpCenterStore)(['footerHelpCenter']),
      footerHelpCenter = _useHelpCenterStore.footerHelpCenter;
    var footerTitle = footerHelpCenter == null ? undefined : footerHelpCenter.footerTitle;
    var textBody = footerHelpCenter == null ? undefined : footerHelpCenter.textBody;
    var links = footerHelpCenter == null ? undefined : (_footerHelpCenter$foo = footerHelpCenter.footerLinkCollection) == null ? undefined : _footerHelpCenter$foo.items;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
      style: _styles.default.mainContainer,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _styles.default.container,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          style: _styles.default.txtFooterTitle,
          children: footerTitle
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _styles.default.container,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          style: _styles.default.textBody,
          children: textBody
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _styles.default.container,
        children: links == null ? undefined : links.map(function (items) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TouchableOpacity, {
            onPress: function onPress() {
              var _items$linkHelpCenter;
              return _reactNative.Linking.openURL((_items$linkHelpCenter = items == null ? undefined : items.linkHelpCenter) != null ? _items$linkHelpCenter : '');
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: _styles.default.txtLinkTitle,
              children: items.linkTitle
            })
          }, `links-helpCenter-${items.linkTitle}`);
        })
      })]
    });
  }
