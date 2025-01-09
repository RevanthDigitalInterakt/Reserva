  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useProductDetailStore = exports.productDetailStore = undefined;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _excluded = ["assinaturaSimples"];
  var productDetailStore = exports.productDetailStore = (0, _$$_REQUIRE(_dependencyMap[3]).create)(function (set, getState) {
    return {
      productDetail: null,
      kit: null,
      hasPrime: null,
      selectedColor: null,
      selectedGiftCardEmail: undefined,
      sizeIsSelected: false,
      drawerIsOpen: false,
      selectedSize: null,
      selectedGiftCardSku: undefined,
      selectedKitItems: null,
      itemsTotalizer: 0,
      initialCep: '',
      assinaturaSimples: {
        accepted: true,
        onToggleAccept: function () {
          var _onToggleAccept = (0, _asyncToGenerator2.default)(function* () {
            var _getState = getState(),
              assinaturaSimples = _getState.assinaturaSimples,
              state = (0, _objectWithoutProperties2.default)(_getState, _excluded);
            set(Object.assign({}, state, {
              assinaturaSimples: Object.assign({}, assinaturaSimples, {
                accepted: !assinaturaSimples.accepted
              })
            }));
          });
          function onToggleAccept() {
            return _onToggleAccept.apply(this, arguments);
          }
          return onToggleAccept;
        }()
      },
      resetProduct: function resetProduct() {
        set(Object.assign({}, getState(), {
          productDetail: null,
          selectedColor: null,
          selectedSize: null,
          sizeIsSelected: false,
          drawerIsOpen: false,
          initialCep: ''
        }));
      },
      setProduct: function setProduct(data, routeParams) {
        var initialColor = data.initialColor,
          initialSize = data.initialSize,
          kit = data.kit,
          hasPrime = data.hasPrime;
        set(Object.assign({}, getState(), {
          productDetail: data,
          kit: kit,
          hasPrime: hasPrime,
          selectedColor: initialColor,
          selectedSize: initialSize,
          selectedGiftCardSku: routeParams == null ? undefined : routeParams.skuId,
          initialCep: (routeParams == null ? undefined : routeParams.hasCep) || ''
        }));
      },
      setSelectedColor: function setSelectedColor(colorId) {
        var _state$selectedColor, _state$productDetail;
        var state = getState();
        if (colorId === ((_state$selectedColor = state.selectedColor) == null ? undefined : _state$selectedColor.colorId)) return;
        var selectedColor = (_state$productDetail = state.productDetail) == null ? undefined : _state$productDetail.colors.find(function (item) {
          return !item.disabled && (item == null ? undefined : item.colorId) === colorId;
        });
        if (!selectedColor) return;
        var selectedSize = selectedColor.sizes.find(function (item) {
          return !item.disabled;
        });
        set(Object.assign({}, state, {
          selectedColor: selectedColor,
          selectedSize: selectedSize
        }));
      },
      setSelectedSize: function setSelectedSize(sizeName) {
        var state = getState();
        if (!state.selectedColor) return;
        var selectedSize = state.selectedColor.sizes.find(function (item) {
          return !item.disabled && (item == null ? undefined : item.size) === sizeName;
        });
        set(Object.assign({}, state, {
          selectedSize: selectedSize,
          sizeIsSelected: true
        }));
      },
      setGiftCardSelectedAmount: function setGiftCardSelectedAmount(giftCardSku) {
        var state = getState();
        set(Object.assign({}, state, {
          selectedGiftCardSku: giftCardSku
        }));
      },
      setGiftCardSelectedEmail: function setGiftCardSelectedEmail(giftCardEmail) {
        var state = getState();
        set(Object.assign({}, state, {
          selectedGiftCardEmail: giftCardEmail
        }));
      },
      setSelectedKitItems: function setSelectedKitItems(selectedKitItems, itemsTotalizer) {
        var state = getState();
        set(Object.assign({}, state, {
          selectedKitItems: selectedKitItems,
          itemsTotalizer: itemsTotalizer
        }));
      },
      setDrawerIsOpen: function setDrawerIsOpen(isOpen) {
        var state = getState();
        set(Object.assign({}, state, {
          drawerIsOpen: isOpen
        }));
      },
      getDisabledSizes: function getDisabledSizes() {
        var _getState$selectedCol;
        return ((_getState$selectedCol = getState().selectedColor) == null ? undefined : _getState$selectedCol.sizes.filter(function (item) {
          return item.disabled;
        }).map(function (item) {
          return item.size || '';
        })) || [];
      },
      getSizes: function getSizes() {
        var _getState$selectedCol2;
        return ((_getState$selectedCol2 = getState().selectedColor) == null ? undefined : _getState$selectedCol2.sizes.map(function (item) {
          return item.size || '';
        })) || [];
      }
    };
  });
  var useProductDetailStore = exports.useProductDetailStore = (0, _$$_REQUIRE(_dependencyMap[4]).createZustandStoreWithSelectors)(productDetailStore);
