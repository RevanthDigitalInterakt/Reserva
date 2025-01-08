  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = WrapperShelf;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _IconDropdown = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function WrapperShelf(_ref) {
    var dataShelf = _ref.dataShelf;
    var _useNavigation = (0, _$$_REQUIRE(_dependencyMap[5]).useNavigation)(),
      navigate = _useNavigation.navigate;
    var onClickShowAll = (0, _react.useCallback)(function () {
      _EventProvider.default.logEvent('shelf_offers_button_see_more', {});
      // @ts-ignore
      navigate('ProductCatalog', {
        referenceId: dataShelf == null ? undefined : dataShelf.id
      });
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[7]).styles.shelfContainer,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
        style: _$$_REQUIRE(_dependencyMap[7]).styles.textShelfTitle,
        children: dataShelf.shelfTitle
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[7]).styles.shelf,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[7]).styles.textShelfName,
          children: dataShelf.shelfName
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, {
          onPress: onClickShowAll,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[7]).styles.actionTitleContent,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[7]).styles.actionTitleText,
              children: "Ver tudo"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
              style: _$$_REQUIRE(_dependencyMap[7]).styles.iconContainer,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_IconDropdown.default, {
                width: 20,
                height: 20
              })
            })]
          })
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.FlatList, {
        style: {
          overflow: 'visible'
        },
        showsHorizontalScrollIndicator: false,
        horizontal: true,
        data: dataShelf.products,
        keyExtractor: function keyExtractor(item, index) {
          return item.productId + index.toString();
        },
        renderItem: function renderItem(_ref2) {
          var item = _ref2.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).ShelfItemCard, {
            product: item
          });
        }
      })]
    });
  }
