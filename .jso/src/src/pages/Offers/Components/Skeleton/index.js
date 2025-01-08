  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SkeletonWrapper = SkeletonWrapper;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function SkeletonWrapper() {
    var skeletonBannerOffers = function skeletonBannerOffers(_ref) {
      var loading = _ref.loading;
      if (loading) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Skeleton, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
            style: _styles.default.mainCarousel
          })
        });
      }
      return null;
    };
    var skeletonBannerCategoryOffers = function skeletonBannerCategoryOffers(_ref2) {
      var loading = _ref2.loading;
      if (loading) {
        var arrayCards = [0, 1, 2, 3, 4, 5, 6, 7];
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Skeleton, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
            style: _styles.default.categoryTitle
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
            style: _styles.default.containerCards,
            children: arrayCards.map(function (key) {
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
                style: _styles.default.categoryCard
              }, key);
            })
          })]
        });
      }
      return null;
    };
    var skeletonShelfOffers = function skeletonShelfOffers(_ref3) {
      var loading = _ref3.loading;
      if (loading) {
        var arrayCards = [0, 1, 2];
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Skeleton, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
            style: _styles.default.shelfTitle
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
            style: _styles.default.shelfSubtitle
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
            style: _styles.default.containerProducts,
            children: arrayCards.map(function (key) {
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
                  style: _styles.default.productCard
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
                  style: _styles.default.productTitle
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
                  style: _styles.default.productPrice
                })]
              }, key);
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
            style: _styles.default.shelfBottomSubtitle
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
            style: _styles.default.containerProducts,
            children: arrayCards.map(function (key) {
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
                  style: _styles.default.productCard
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
                  style: _styles.default.productTitle
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
                  style: _styles.default.productPrice
                })]
              }, key);
            })
          })]
        });
      }
      return null;
    };
    return {
      skeletonBannerOffers: skeletonBannerOffers,
      skeletonBannerCategoryOffers: skeletonBannerCategoryOffers,
      skeletonShelfOffers: skeletonShelfOffers
    };
  }
