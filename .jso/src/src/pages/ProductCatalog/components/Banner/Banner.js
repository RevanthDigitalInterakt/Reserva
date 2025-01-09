  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Banner(_ref) {
    var reference = _ref.reference,
      setLoading = _ref.setLoading;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      bannerImage = _useState2[0],
      setBannerImage = _useState2[1];
    var _useBannerCategoryLaz = (0, _$$_REQUIRE(_dependencyMap[5]).useBannerCategoryLazyQuery)(),
      _useBannerCategoryLaz2 = (0, _slicedToArray2.default)(_useBannerCategoryLaz, 1),
      getBannerCategory = _useBannerCategoryLaz2[0];
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[6]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    (0, _react.useEffect)(function () {
      setLoading(true);
      getBannerCategory({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('banner'),
        variables: {
          input: {
            category: reference
          }
        }
      }).then(function (_ref2) {
        var _data$bannerCategory$, _data$bannerCategory$2, _data$bannerCategory$3;
        var data = _ref2.data;
        if (data != null && (_data$bannerCategory$ = data.bannerCategory[0]) != null && (_data$bannerCategory$2 = _data$bannerCategory$.image) != null && _data$bannerCategory$2.url) setBannerImage(data == null ? undefined : (_data$bannerCategory$3 = data.bannerCategory[0]) == null ? undefined : _data$bannerCategory$3.image.url);
      }).finally(function () {
        return setLoading(true);
      });
    }, [reference, getBannerCategory, getFetchPolicyPerKey, setLoading]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
      children: bannerImage ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ImageComponent.default, {
        source: {
          uri: bannerImage
        }
      }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {})
    });
  }
  var _default = exports.default = Banner;
