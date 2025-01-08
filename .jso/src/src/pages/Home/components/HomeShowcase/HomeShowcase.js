  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HomeShowcase = HomeShowcase;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _HomeShowcaseShelf = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _useRecommendationShelf = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function HomeShowcase() {
    var _useRecommendationShe = (0, _useRecommendationShelf.default)(),
      onSearchShelf = _useRecommendationShe.onSearchShelf;
    var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      shelf = _useState2[0],
      setShelf = _useState2[1];
    (0, _react.useEffect)(function () {
      function handleGetShelf() {
        return _handleGetShelf.apply(this, arguments);
      }
      function _handleGetShelf() {
        _handleGetShelf = (0, _asyncToGenerator2.default)(function* () {
          var user = yield _asyncStorage.default.getItem('@Dito:anonymousID');
          var data = yield onSearchShelf(user != null ? user : '');
          setShelf(data);
        });
        return _handleGetShelf.apply(this, arguments);
      }
      handleGetShelf();
    }, [onSearchShelf]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[9]).styles.container,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.FlatList, {
        data: shelf,
        renderItem: function renderItem(_ref) {
          var item = _ref.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_HomeShowcaseShelf.default, {
            dataShelf: item
          });
        },
        keyExtractor: function keyExtractor(item, index) {
          return item.shelfTitle + index.toString();
        }
      })
    });
  }
