  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OfferFilterCarousel = OfferFilterCarousel;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function OfferFilterCarousel(_ref) {
    var offers = _ref.offers,
      title = _ref.title;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[3]).useNavigation)();
    var _handleRedirectToCatalog = function handleRedirectToCatalog(offer) {
      var navigationParams = {
        filters: {},
        referenceId: undefined
      };
      if (offer.colorFilter) {
        var _offer$colorFilter$;
        navigationParams.filters.colors = [{
          key: 'cor',
          value: ((_offer$colorFilter$ = offer.colorFilter[0]) == null ? undefined : _offer$colorFilter$.toLowerCase()) || ''
        }];
      }
      if (offer.sizeFilter) {
        var _offer$sizeFilter$;
        navigationParams.filters.sizes = [{
          key: 'tamanho',
          value: ((_offer$sizeFilter$ = offer.sizeFilter[0]) == null ? undefined : _offer$sizeFilter$.toUpperCase()) || ''
        }];
      }
      if (offer.fromPriceFilter && offer.toPriceFilter) {
        navigationParams.filters.priceFilter = {
          from: Number(offer.fromPriceFilter),
          to: Number(offer.toPriceFilter)
        };
      }
      if (offer.collectionId) {
        navigationParams.referenceId = offer.collectionId;
      }
      navigation.navigate('ProductCatalog', navigationParams);
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[5]).styles.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
        style: _$$_REQUIRE(_dependencyMap[5]).styles.title,
        children: title
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.ScrollView, {
        horizontal: true,
        contentContainerStyle: {
          gap: 8,
          paddingRight: 100
        },
        showsHorizontalScrollIndicator: false,
        children: offers.map(function (offer) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Card, {
            handleRedirectToCatalog: function handleRedirectToCatalog() {
              return _handleRedirectToCatalog(offer);
            },
            imageUrl: offer.offerImage
          }, offer.offerName);
        })
      })]
    });
  }
