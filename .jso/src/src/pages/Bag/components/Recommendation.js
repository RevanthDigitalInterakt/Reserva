  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Recommendation = Recommendation;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _useRecommendation2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Recommendation() {
    var _useRecommendation = (0, _useRecommendation2.default)(),
      products = _useRecommendation.products,
      showSection = _useRecommendation.showSection,
      setProducts = _useRecommendation.setProducts,
      setShowSection = _useRecommendation.setShowSection;
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[6]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useProductRecommenda = (0, _$$_REQUIRE(_dependencyMap[7]).useProductRecommendationsLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('productRecommendations')
      }),
      _useProductRecommenda2 = (0, _slicedToArray2.default)(_useProductRecommenda, 1),
      getProductRecommendation = _useProductRecommenda2[0];
    var onToggleSection = (0, _react.useCallback)(function () {
      return setShowSection(!showSection);
    }, [setShowSection, showSection]);
    (0, _react.useEffect)(function () {
      getProductRecommendation().then(function (_ref) {
        var data = _ref.data;
        if (data) {
          setProducts(data == null ? undefined : data.productRecommendations);
        }
      });
    }, [getProductRecommendation, setProducts]);
    (0, _react.useEffect)(function () {
      if (!products || !(products != null && products.length)) return;
      if (!_EventProvider.default) return;
      try {
        var newItems = products.map(function (item) {
          var _item$priceRange, _item$priceRange$sell, _item$categoryTree;
          return {
            price: item == null ? undefined : (_item$priceRange = item.priceRange) == null ? undefined : (_item$priceRange$sell = _item$priceRange.sellingPrice) == null ? undefined : _item$priceRange$sell.lowPrice,
            item_id: item == null ? undefined : item.productId,
            item_name: item == null ? undefined : item.productName,
            item_category: Object.values(item == null ? undefined : (_item$categoryTree = item.categoryTree) == null ? undefined : _item$categoryTree.map(function (i) {
              return i.href;
            })).join('|')
          };
        });
        _EventProvider.default.logEvent('page_view', {
          item_brand: _$$_REQUIRE(_dependencyMap[8]).defaultBrand.picapau
        });
        _EventProvider.default.logEvent('view_item_list', {
          items: newItems,
          item_brand: (0, _$$_REQUIRE(_dependencyMap[9]).getBrandByUrl)(products)
        });
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(error);
      }
    }, [products]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        paddingX: "xxxs",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Divider, {
          marginTop: "xs",
          variant: "fullWidth"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        testID: "com.usereserva:id/products_recomendation_list",
        paddingLeft: "micro",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
          onPress: onToggleSection,
          hitSlop: {
            left: 50,
            top: 15,
            bottom: 15
          },
          flexDirection: "row",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            flexDirection: "row",
            alignItems: "flex-start",
            marginY: "xxs",
            marginBottom: "xxs",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              marginRight: "micro",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[15]).IconLegacy, {
                name: "Handbag",
                size: 20
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              flex: 1,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
                variant: "subtituloSessoes",
                children: "Outros produtos que voc\xEA pode gostar"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              marginRight: "md",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[15]).IconLegacy, {
                name: "ArrowDown",
                color: "preto",
                size: "20",
                style: showSection ? {
                  transform: [{
                    rotate: '-180deg'
                  }, {
                    translateY: 4
                  }]
                } : {
                  transform: [{
                    translateY: 8
                  }]
                }
              })
            })]
          })
        })
      }), !!showSection && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          paddingX: "xxxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Divider, {
            marginBottom: "xs",
            variant: "fullWidth"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          mt: "quarck",
          paddingX: "micro",
          children: products && (products == null ? undefined : products.length) > 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.View, {
            style: {
              marginBottom: 20
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[17]).ListHorizontalProducts, {
              horizontal: true,
              products: products
            })
          })
        })]
      })]
    });
  }
