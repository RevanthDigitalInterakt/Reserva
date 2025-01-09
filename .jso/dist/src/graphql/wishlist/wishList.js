var _0x34f519 = _0x5973;
function _0x5973(_0x35ac9a, _0x2386ae) {
    var _0x38b076 = _0xcf0c();
    return _0x5973 = function (_0xe7fbf0, _0x359c0c) {
        _0xe7fbf0 = _0xe7fbf0 - (-0x749 + 0x125f + -0xa57 * 0x1);
        var _0x263100 = _0x38b076[_0xe7fbf0];
        return _0x263100;
    }, _0x5973(_0x35ac9a, _0x2386ae);
}
(function (_0xcd7c96, _0x31d266) {
    var _0xe2a38e = _0x5973, _0x277f1e = _0xcd7c96();
    while (!![]) {
        try {
            var _0x485750 = parseInt(_0xe2a38e(0xc0)) / (-0x12cc + -0x24d8 + 0x197 * 0x23) + -parseInt(_0xe2a38e(0xc8)) / (-0x253d + 0x7 * 0x40d + -0x8e4 * -0x1) * (parseInt(_0xe2a38e(0xc1)) / (-0x1 * -0x3d1 + -0x2082 + 0x1cb4)) + parseInt(_0xe2a38e(0xcc)) / (0x2258 * 0x1 + 0x482 + -0x26d6) + parseInt(_0xe2a38e(0xca)) / (0xcd6 * 0x2 + -0x1de1 * -0x1 + -0x3788) * (parseInt(_0xe2a38e(0xc2)) / (-0x12c7 + 0x1ab + -0x3 * -0x5b6)) + parseInt(_0xe2a38e(0xc3)) / (-0xf68 * -0x2 + 0x7 * 0x347 + -0x35ba * 0x1) + -parseInt(_0xe2a38e(0xc6)) / (0x3cb * 0x6 + 0xe02 * -0x2 + 0x2 * 0x2a5) * (parseInt(_0xe2a38e(0xc9)) / (-0xba4 * -0x2 + -0x2175 * 0x1 + -0xa36 * -0x1)) + -parseInt(_0xe2a38e(0xc7)) / (-0x953 * 0x2 + -0x14b4 + 0x2764);
            if (_0x485750 === _0x31d266)
                break;
            else
                _0x277f1e['push'](_0x277f1e['shift']());
        } catch (_0xd1c375) {
            _0x277f1e['push'](_0x277f1e['shift']());
        }
    }
}(_0xcf0c, 0xc7b1d + -0x23 * -0x2fc3 + -0x2a05 * 0x49), Object[_0x34f519(0xc4) + _0x34f519(0xc5)](exports, _0x34f519(0xcb), { 'value': !![] }), exports[_0x34f519(0xcd)] = undefined);
function _0xcf0c() {
    var _0x491b0a = [
        '4YuiwSp',
        '909rkGRTF',
        '1385kWHzJt',
        '__esModule',
        '3028376zgTzpo',
        'default',
        'gql',
        '617649kfGpNu',
        '648348ZoPpmh',
        '15186IZdLvg',
        '5556397GjLHZj',
        'defineProp',
        'erty',
        '29144dhPZMj',
        '16087930ovNNEb'
    ];
    _0xcf0c = function () {
        return _0x491b0a;
    };
    return _0xcf0c();
}
var ADD_WISH_LIST = (0xcf * 0x6 + -0x7c8 + -0xf * -0x32, _$$_REQUIRE(_dependencyMap[0xcba + -0x2408 + 0x174e])[_0x34f519(0xbf)])`
  mutation AddToList($productId: String!, $shopperId: String!, $sku: String) {
    addToList(
      listItem: { productId: $productId, sku: $sku }
      shopperId: $shopperId
      name: "wishlist"
    ) @context(provider: "vtex.wish-list")
  }
`, CHECK_LIST = (-0x605 * 0x5 + -0x1 * 0x12f8 + 0x3111, _$$_REQUIRE(_dependencyMap[0x1 * 0x5aa + -0x190e * -0x1 + -0x3d7 * 0x8])[_0x34f519(0xbf)])`
  query CheckList($shopperId: String!, $productId: String!, $sku: String) {
    checkList(shopperId: $shopperId, productId: $productId, sku: $sku) @context(provider: "vtex.wish-list") {
      inList
      listNames
      listIds
      message
    }
  }
`, GET_PRODUCT_BY_IDENTIFIER = (-0x4d + 0x150a + -0x14bd, _$$_REQUIRE(_dependencyMap[0xcdb * -0x1 + 0x17ae + -0xad3 * 0x1])[_0x34f519(0xbf)])`
  query ProductByIdentifier($idArray: [ID!]) {
    productsByIdentifier(field: sku, values: $idArray)
      @context(provider: "vtex.search-graphql") {
      productId
      productName
      description
      priceRange {
        sellingPrice {
          highPrice
          lowPrice
        }
        listPrice {
          highPrice
          lowPrice
        }
      }
      items {
        name
        itemId
        images {
          imageUrl
        }
        variations {
          originalName
          name
          values
        }
        sellers {
          sellerId
          commertialOffer {
            Tax
            taxPercentage
            AvailableQuantity
            Price
            ListPrice
            spotPrice
            PriceWithoutDiscount
            discountHighlights {
              name
            }
            Installments {
              Value
              TotalValuePlusInterestRate
              NumberOfInstallments
            }
          }
        }
      }
    }
  }
`, _default = exports[_0x34f519(0xcd)] = {
        'ADD_WISH_LIST': ADD_WISH_LIST,
        'CHECK_LIST': CHECK_LIST,
        'GET_PRODUCT_BY_IDENTIFIER': GET_PRODUCT_BY_IDENTIFIER
    };