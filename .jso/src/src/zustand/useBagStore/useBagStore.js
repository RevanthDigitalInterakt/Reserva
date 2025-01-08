  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useBagStore = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var bagStore = (0, _$$_REQUIRE(_dependencyMap[3]).create)(function (set, getState) {
    return {
      initialized: false,
      topBarLoading: false,
      loadingModal: false,
      rouletCoupon: {
        code: null,
        timestamp: null,
        blocked: false
      },
      rouletIsOpen: false,
      rouletIsLoading: false,
      initialLoad: false,
      productNotFound: '',
      error: '',
      deleteProductModal: {
        show: false,
        deleteInfo: undefined
      },
      //
      orderFormId: '',
      messages: [],
      clientProfileData: undefined,
      packageItems: [{
        items: [],
        totalShippingValue: 0
      }],
      deliveryType: {
        type: ''
      },
      selectableGift: undefined,
      marketingData: undefined,
      shippingData: undefined,
      appTotalizers: {
        delivery: 0,
        discount: 0,
        items: 0,
        total: 0
      },
      installmentInfo: {
        installmentPrice: 0,
        installmentsNumber: 0,
        totalPrice: 0
      },
      prime: {
        total: 0,
        totalDiscount: 0,
        renderApp: true
      },
      allItemsQuantity: 0,
      hasPrimeSubscriptionInCart: false,
      //
      currentSelectedGiftSize: '',
      currentSelectedColorGift: '',
      actions: {
        INITIAL_LOAD: function () {
          var _INITIAL_LOAD = (0, _asyncToGenerator2.default)(function* () {
            try {
              if (getState().initialized) return;
              var orderFormId = (yield (0, _$$_REQUIRE(_dependencyMap[4]).getAsyncStorageItem)('orderFormId')) || '';
              set(function () {
                return {
                  initialLoad: true
                };
              });
              var _yield$getApolloClien = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().query({
                  query: _$$_REQUIRE(_dependencyMap[6]).OrderFormDocument,
                  fetchPolicy: 'no-cache',
                  variables: {
                    orderFormId: orderFormId
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien.data;
              var orderForm = data.orderForm;
              if (!orderForm) {
                throw new Error('OrderForm inválido.');
              }

              // TODO move to api-gateway
              orderForm.packageItems = orderForm.packageItems.map(function (subPackage) {
                subPackage.items.map(function (item) {
                  if (item.productCategories.includes('Cartão Presente')) {
                    item.itemColor = '';
                    return item;
                  }
                  return item;
                });
                return subPackage;
              });
              set(function () {
                return {
                  orderFormId: orderForm.orderFormId,
                  messages: orderForm.messages,
                  clientProfileData: orderForm.clientProfileData,
                  packageItems: orderForm.packageItems,
                  selectableGift: orderForm.selectableGift,
                  marketingData: orderForm.marketingData,
                  shippingData: orderForm.shippingData,
                  appTotalizers: orderForm.appTotalizers,
                  installmentInfo: orderForm.installmentInfo,
                  allItemsQuantity: orderForm.allItemsQuantity,
                  hasPrimeSubscriptionInCart: orderForm.hasPrimeSubscriptionInCart,
                  prime: orderForm.prime
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  initialLoad: false,
                  initialized: true
                };
              });
            }
          });
          function INITIAL_LOAD() {
            return _INITIAL_LOAD.apply(this, arguments);
          }
          return INITIAL_LOAD;
        }(),
        REFETCH_ORDER_FORM: function () {
          var _REFETCH_ORDER_FORM = (0, _asyncToGenerator2.default)(function* () {
            try {
              var orderFormId = (yield (0, _$$_REQUIRE(_dependencyMap[4]).getAsyncStorageItem)('orderFormId')) || '';
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _yield$getApolloClien2 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().query({
                  query: _$$_REQUIRE(_dependencyMap[6]).OrderFormDocument,
                  fetchPolicy: 'no-cache',
                  variables: {
                    orderFormId: orderFormId
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien2.data;
              var orderForm = data.orderForm;
              if (!orderForm) {
                throw new Error('OrderForm inválido.');
              }

              // TODO move to api-gateway
              orderForm.packageItems = orderForm.packageItems.map(function (subPackage) {
                subPackage.items.map(function (item) {
                  if (item.productCategories.includes('Cartão Presente')) {
                    item.itemColor = '';
                    return item;
                  }
                  return item;
                });
                return subPackage;
              });
              set(function () {
                return {
                  orderFormId: orderForm.orderFormId,
                  messages: orderForm.messages,
                  clientProfileData: orderForm.clientProfileData,
                  packageItems: orderForm.packageItems,
                  selectableGift: orderForm.selectableGift,
                  marketingData: orderForm.marketingData,
                  shippingData: orderForm.shippingData,
                  appTotalizers: orderForm.appTotalizers,
                  installmentInfo: orderForm.installmentInfo,
                  allItemsQuantity: orderForm.allItemsQuantity,
                  hasPrimeSubscriptionInCart: orderForm.hasPrimeSubscriptionInCart,
                  prime: orderForm.prime,
                  initialized: true,
                  topBarLoading: false
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  topBarLoading: false,
                  initialized: true
                };
              });
            }
          });
          function REFETCH_ORDER_FORM() {
            return _REFETCH_ORDER_FORM.apply(this, arguments);
          }
          return REFETCH_ORDER_FORM;
        }(),
        ROULET_COUPON_INITIAL_LOAD: function () {
          var _ROULET_COUPON_INITIAL_LOAD = (0, _asyncToGenerator2.default)(function* () {
            var rouletCoupon = yield (0, _$$_REQUIRE(_dependencyMap[4]).getAsyncStorageItem)('rouletCoupon');
            if (rouletCoupon) {
              var code = rouletCoupon.code,
                timestamp = rouletCoupon.timestamp;
              set(function () {
                return {
                  rouletCoupon: {
                    code: code,
                    timestamp: timestamp,
                    blocked: false
                  }
                };
              });
            }
          });
          function ROULET_COUPON_INITIAL_LOAD() {
            return _ROULET_COUPON_INITIAL_LOAD.apply(this, arguments);
          }
          return ROULET_COUPON_INITIAL_LOAD;
        }(),
        REFRESH_ORDER_FORM: function () {
          var _REFRESH_ORDER_FORM = (0, _asyncToGenerator2.default)(function* () {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _yield$getApolloClien3 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().query({
                  query: _$$_REQUIRE(_dependencyMap[6]).OrderFormRefreshDataDocument,
                  fetchPolicy: 'no-cache',
                  variables: {
                    input: {
                      orderFormId: getState().orderFormId
                    }
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien3.data;
              var orderForm = data.orderFormRefreshData;

              // TODO move to api-gateway
              orderForm.packageItems = orderForm.packageItems.map(function (subPackage) {
                subPackage.items.map(function (item) {
                  if (item.productCategories.includes('Cartão Presente')) {
                    item.itemColor = '';
                    return item;
                  }
                  return item;
                });
                return subPackage;
              });
              set(function () {
                return {
                  clientProfileData: orderForm.clientProfileData,
                  packageItems: orderForm.packageItems,
                  marketingData: orderForm.marketingData,
                  shippingData: orderForm.shippingData,
                  installmentInfo: orderForm.installmentInfo,
                  appTotalizers: orderForm.appTotalizers,
                  allItemsQuantity: orderForm.allItemsQuantity,
                  prime: orderForm.prime
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function REFRESH_ORDER_FORM() {
            return _REFRESH_ORDER_FORM.apply(this, arguments);
          }
          return REFRESH_ORDER_FORM;
        }(),
        RESET_ORDER_FORM: function () {
          var _RESET_ORDER_FORM = (0, _asyncToGenerator2.default)(function* () {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _yield$getApolloClien4 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().query({
                  query: _$$_REQUIRE(_dependencyMap[6]).OrderFormResetDocument,
                  fetchPolicy: 'no-cache',
                  variables: {
                    orderFormId: getState().orderFormId
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien4.data;
              var orderForm = data.orderFormReset;

              // TODO move to api-gateway
              orderForm.packageItems = orderForm.packageItems.map(function (subPackage) {
                subPackage.items.map(function (item) {
                  if (item.productCategories.includes('Cartão Presente')) {
                    item.itemColor = '';
                    return item;
                  }
                  return item;
                });
                return subPackage;
              });
              set(function () {
                return {
                  clientProfileData: orderForm.clientProfileData,
                  packageItems: orderForm.packageItems,
                  marketingData: orderForm.marketingData,
                  shippingData: orderForm.shippingData,
                  installmentInfo: orderForm.installmentInfo,
                  appTotalizers: orderForm.appTotalizers,
                  allItemsQuantity: orderForm.allItemsQuantity,
                  prime: orderForm.prime
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function RESET_ORDER_FORM() {
            return _RESET_ORDER_FORM.apply(this, arguments);
          }
          return RESET_ORDER_FORM;
        }(),
        CREATE_NEW_ORDER_FORM: function () {
          var _CREATE_NEW_ORDER_FORM = (0, _asyncToGenerator2.default)(function* () {
            try {
              set(function () {
                return {
                  initialLoad: true
                };
              });
              var _yield$getApolloClien5 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().query({
                  query: _$$_REQUIRE(_dependencyMap[6]).OrderFormDocument,
                  fetchPolicy: 'no-cache',
                  variables: {
                    orderFormId: ''
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien5.data;
              var orderForm = data.orderForm;
              if (!orderForm) {
                throw new Error('OrderForm inválido.');
              }
              yield (0, _$$_REQUIRE(_dependencyMap[4]).setAsyncStorageItem)('orderFormId', orderForm.orderFormId);

              // TODO move to api-gateway
              orderForm.packageItems = orderForm.packageItems.map(function (subPackage) {
                subPackage.items.map(function (item) {
                  if (item.productCategories.includes('Cartão Presente')) {
                    item.itemColor = '';
                    return item;
                  }
                  return item;
                });
                return subPackage;
              });
              set(function () {
                return {
                  orderFormId: orderForm.orderFormId,
                  messages: orderForm.messages,
                  clientProfileData: orderForm.clientProfileData,
                  packageItems: orderForm.packageItems,
                  selectableGift: orderForm.selectableGift,
                  marketingData: orderForm.marketingData,
                  shippingData: orderForm.shippingData,
                  appTotalizers: orderForm.appTotalizers,
                  installmentInfo: orderForm.installmentInfo,
                  allItemsQuantity: orderForm.allItemsQuantity,
                  hasPrimeSubscriptionInCart: orderForm.hasPrimeSubscriptionInCart,
                  prime: orderForm.prime
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  initialLoad: false,
                  initialized: true
                };
              });
            }
          });
          function CREATE_NEW_ORDER_FORM() {
            return _CREATE_NEW_ORDER_FORM.apply(this, arguments);
          }
          return CREATE_NEW_ORDER_FORM;
        }(),
        COPY_ORDERFORM: function COPY_ORDERFORM() {
          try {
            (0, _$$_REQUIRE(_dependencyMap[7]).handleCopyTextToClipboard)(getState().orderFormId);
            return true;
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[8]).ExceptionProvider.captureException(err);
            return false;
          }
        },
        ADD_SELLER_COUPON: function () {
          var _ADD_SELLER_COUPON = (0, _asyncToGenerator2.default)(function* (sellerCoupon) {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _yield$getApolloClien6 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormAddSellerCouponDocument,
                  context: {
                    clientName: 'gateway'
                  },
                  variables: {
                    coupon: sellerCoupon,
                    orderFormId: getState().orderFormId
                  }
                }),
                data = _yield$getApolloClien6.data;
              var _ref = data || {},
                orderForm = _ref.orderFormAddSellerCoupon;
              if (!orderForm) {
                throw new Error('Cupom inválido.');
              }

              // TODO move to api-gateway
              orderForm.packageItems = orderForm.packageItems.map(function (subPackage) {
                subPackage.items.map(function (item) {
                  if (item.productCategories.includes('Cartão Presente')) {
                    item.itemColor = '';
                    return item;
                  }
                  return item;
                });
                return subPackage;
              });
              set(function () {
                return {
                  marketingData: orderForm.marketingData,
                  appTotalizers: orderForm.appTotalizers,
                  installmentInfo: orderForm.installmentInfo,
                  allItemsQuantity: orderForm.allItemsQuantity,
                  packageItems: orderForm.packageItems,
                  prime: orderForm.prime
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
              throw new Error(error.message);
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function ADD_SELLER_COUPON(_x) {
            return _ADD_SELLER_COUPON.apply(this, arguments);
          }
          return ADD_SELLER_COUPON;
        }(),
        ADD_DISCOUNT_COUPON: function () {
          var _ADD_DISCOUNT_COUPON = (0, _asyncToGenerator2.default)(function* (coupon) {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _yield$getApolloClien7 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormAddDiscountCouponDocument,
                  variables: {
                    orderFormId: getState().orderFormId,
                    coupon: coupon
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien7.data;
              var _ref2 = data || {},
                orderForm = _ref2.orderFormAddDiscountCoupon;
              var isInvalidCoupon = orderForm == null ? undefined : orderForm.messages.find(function (item) {
                return item.includes(coupon) && item.includes('inválido');
              });
              if (isInvalidCoupon) {
                throw new Error('Cupom inválido.');
              }
              set(function () {
                return {
                  marketingData: orderForm == null ? undefined : orderForm.marketingData,
                  appTotalizers: orderForm == null ? undefined : orderForm.appTotalizers,
                  installmentInfo: orderForm == null ? undefined : orderForm.installmentInfo,
                  allItemsQuantity: orderForm == null ? undefined : orderForm.allItemsQuantity,
                  packageItems: (orderForm == null ? undefined : orderForm.packageItems) || [{
                    items: [],
                    totalShippingValue: 0
                  }],
                  prime: orderForm == null ? undefined : orderForm.prime
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
              throw new Error(error.message);
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function ADD_DISCOUNT_COUPON(_x2) {
            return _ADD_DISCOUNT_COUPON.apply(this, arguments);
          }
          return ADD_DISCOUNT_COUPON;
        }(),
        REMOVE_SELLER_COUPON: function () {
          var _REMOVE_SELLER_COUPON = (0, _asyncToGenerator2.default)(function* () {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _yield$getApolloClien8 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormRemoveSellerCouponDocument,
                  variables: {
                    orderFormId: getState().orderFormId
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien8.data;
              var _ref3 = data || {},
                orderForm = _ref3.orderFormRemoveSellerCoupon;
              set(function () {
                return {
                  marketingData: Object.assign({}, getState().marketingData, {
                    sellerCoupon: '',
                    sellerCouponName: ''
                  }),
                  packageItems: (orderForm == null ? undefined : orderForm.packageItems) || [{
                    items: [],
                    totalShippingValue: 0
                  }],
                  appTotalizers: orderForm == null ? undefined : orderForm.appTotalizers,
                  installmentInfo: orderForm == null ? undefined : orderForm.installmentInfo,
                  allItemsQuantity: orderForm == null ? undefined : orderForm.allItemsQuantity,
                  prime: orderForm == null ? undefined : orderForm.prime
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function REMOVE_SELLER_COUPON() {
            return _REMOVE_SELLER_COUPON.apply(this, arguments);
          }
          return REMOVE_SELLER_COUPON;
        }(),
        REMOVE_DISCOUNT_COUPON: function () {
          var _REMOVE_DISCOUNT_COUPON = (0, _asyncToGenerator2.default)(function* () {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _yield$getApolloClien9 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormRemoveDiscountCouponDocument,
                  variables: {
                    orderFormId: getState().orderFormId
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien9.data;
              var _ref4 = data || {},
                orderForm = _ref4.orderFormRemoveDiscountCoupon;
              set(function () {
                return {
                  marketingData: Object.assign({}, getState().marketingData, {
                    coupon: ''
                  }),
                  packageItems: (orderForm == null ? undefined : orderForm.packageItems) || [{
                    items: [],
                    totalShippingValue: 0
                  }],
                  appTotalizers: orderForm == null ? undefined : orderForm.appTotalizers,
                  installmentInfo: orderForm == null ? undefined : orderForm.installmentInfo,
                  allItemsQuantity: orderForm == null ? undefined : orderForm.allItemsQuantity,
                  prime: orderForm == null ? undefined : orderForm.prime
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function REMOVE_DISCOUNT_COUPON() {
            return _REMOVE_DISCOUNT_COUPON.apply(this, arguments);
          }
          return REMOVE_DISCOUNT_COUPON;
        }(),
        ADD_AVAILABLE_GIFT: function () {
          var _ADD_AVAILABLE_GIFT = (0, _asyncToGenerator2.default)(function* (gift, giftId) {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _yield$getApolloClien10 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().query({
                  query: _$$_REQUIRE(_dependencyMap[6]).OrderFormSetGiftSizeDocument,
                  fetchPolicy: 'no-cache',
                  variables: {
                    giftId: giftId,
                    id: gift.id,
                    seller: gift.seller,
                    orderFormId: getState().orderFormId
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien10.data;
              var _ref5 = data || {},
                orderForm = _ref5.orderFormSetGiftSize;
              set({
                marketingData: orderForm.marketingData,
                appTotalizers: orderForm.appTotalizers,
                installmentInfo: orderForm.installmentInfo,
                allItemsQuantity: orderForm.allItemsQuantity,
                packageItems: (orderForm == null ? undefined : orderForm.packageItems) || [{
                  items: [],
                  totalShippingValue: 0
                }],
                selectableGift: orderForm.selectableGift,
                prime: orderForm == null ? undefined : orderForm.prime
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function ADD_AVAILABLE_GIFT(_x3, _x4) {
            return _ADD_AVAILABLE_GIFT.apply(this, arguments);
          }
          return ADD_AVAILABLE_GIFT;
        }(),
        REMOVE_UNAVAILABLE_ITEMS: function () {
          var _REMOVE_UNAVAILABLE_ITEMS = (0, _asyncToGenerator2.default)(function* () {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormRemoveUnavailableItemsDocument,
                context: {
                  clientName: 'gateway'
                },
                variables: {
                  orderFormId: getState().orderFormId
                }
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function REMOVE_UNAVAILABLE_ITEMS() {
            return _REMOVE_UNAVAILABLE_ITEMS.apply(this, arguments);
          }
          return REMOVE_UNAVAILABLE_ITEMS;
        }(),
        UPDATE_PRODUCT_COUNT: function () {
          var _UPDATE_PRODUCT_COUNT = (0, _asyncToGenerator2.default)(function* (index, item, countUpdated) {
            try {
              var _orderForm$messages;
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var errorsMessages = '';
              var isGiftCard = item.productCategories.includes('Cartão Presente');
              var handleQuantity = function handleQuantity() {
                if (isGiftCard) return countUpdated;
                if (item.isAssinaturaSimples && !isGiftCard) return 1;
                return countUpdated;
              };
              var _yield$getApolloClien11 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormUpdateItemDocument,
                  variables: {
                    orderFormId: getState().orderFormId,
                    index: index,
                    id: item.id,
                    seller: item.seller,
                    quantity: handleQuantity()
                  },
                  context: {
                    clientName: 'gateway'
                  }
                }),
                data = _yield$getApolloClien11.data;
              var _ref6 = data || {},
                orderForm = _ref6.orderFormUpdateItem;
              var mergeItems = (0, _$$_REQUIRE(_dependencyMap[9]).mergeItemsPackage)((orderForm == null ? undefined : orderForm.packageItems) || [{
                items: [],
                totalShippingValue: 0
              }]);
              if (orderForm != null && (_orderForm$messages = orderForm.messages) != null && _orderForm$messages.length) {
                errorsMessages = (0, _$$_REQUIRE(_dependencyMap[10]).getMessageErrorWhenUpdateItem)({
                  currentItem: item,
                  mergeItems: mergeItems,
                  updateItemResponse: orderForm,
                  currentUpdateValueItem: countUpdated,
                  appTotalizers: orderForm.appTotalizers
                });
              }
              set(function () {
                return {
                  packageItems: (orderForm == null ? undefined : orderForm.packageItems.map(function (subPackage) {
                    subPackage.items.map(function (packageItem) {
                      if (packageItem.productCategories.includes('Cartão Presente')) {
                        packageItem.itemColor = '';
                        return packageItem;
                      }
                      return packageItem;
                    });
                    return subPackage;
                  })) || [{
                    items: [],
                    totalShippingValue: 0
                  }],
                  selectableGift: orderForm == null ? undefined : orderForm.selectableGift,
                  marketingData: orderForm == null ? undefined : orderForm.marketingData,
                  appTotalizers: orderForm == null ? undefined : orderForm.appTotalizers,
                  installmentInfo: orderForm == null ? undefined : orderForm.installmentInfo,
                  allItemsQuantity: orderForm == null ? undefined : orderForm.allItemsQuantity,
                  prime: orderForm == null ? undefined : orderForm.prime,
                  deleteProductModal: {
                    show: false,
                    deleteInfo: undefined
                  },
                  productNotFound: errorsMessages,
                  hasPrimeSubscriptionInCart: orderForm == null ? undefined : orderForm.hasPrimeSubscriptionInCart
                };
              });
              yield (0, _$$_REQUIRE(_dependencyMap[11]).trackEventDitoStatusCart)({
                items: mergeItems,
                appTotalizers: orderForm == null ? undefined : orderForm.appTotalizers,
                clientProfileData: orderForm == null ? undefined : orderForm.clientProfileData
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function UPDATE_PRODUCT_COUNT(_x5, _x6, _x7) {
            return _UPDATE_PRODUCT_COUNT.apply(this, arguments);
          }
          return UPDATE_PRODUCT_COUNT;
        }(),
        ADD_GIFT: function () {
          var _ADD_GIFT = (0, _asyncToGenerator2.default)(function* (index, id) {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _yield$getApolloClien12 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormAddGiftDocument,
                  context: {
                    clientName: 'gateway'
                  },
                  variables: {
                    orderFormId: getState().orderFormId,
                    index: index,
                    id: id
                  }
                }),
                data = _yield$getApolloClien12.data;
              set(function () {
                var _data$orderFormAddGif;
                return {
                  packageItems: data == null ? undefined : data.orderFormAddGift.packageItems,
                  prime: data == null ? undefined : (_data$orderFormAddGif = data.orderFormAddGift) == null ? undefined : _data$orderFormAddGif.prime
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function ADD_GIFT(_x8, _x9) {
            return _ADD_GIFT.apply(this, arguments);
          }
          return ADD_GIFT;
        }(),
        REMOVE_GIFT: function () {
          var _REMOVE_GIFT = (0, _asyncToGenerator2.default)(function* (index, id) {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _yield$getApolloClien13 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormRemoveGiftDocument,
                  context: {
                    clientName: 'gateway'
                  },
                  variables: {
                    orderFormId: getState().orderFormId,
                    index: index,
                    id: id
                  }
                }),
                data = _yield$getApolloClien13.data;
              set(function () {
                var _data$orderFormRemove;
                return {
                  packageItems: data == null ? undefined : data.orderFormRemoveGift.packageItems,
                  prime: data == null ? undefined : (_data$orderFormRemove = data.orderFormRemoveGift) == null ? undefined : _data$orderFormRemove.prime
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function REMOVE_GIFT(_x10, _x11) {
            return _REMOVE_GIFT.apply(this, arguments);
          }
          return REMOVE_GIFT;
        }(),
        ACTIVE_MODAL_DELETE_PRODUCT: function () {
          var _ACTIVE_MODAL_DELETE_PRODUCT = (0, _asyncToGenerator2.default)(function* (product, index) {
            set(function () {
              return {
                deleteProductModal: {
                  show: true,
                  deleteInfo: {
                    product: product,
                    index: index
                  }
                }
              };
            });
          });
          function ACTIVE_MODAL_DELETE_PRODUCT(_x12, _x13) {
            return _ACTIVE_MODAL_DELETE_PRODUCT.apply(this, arguments);
          }
          return ACTIVE_MODAL_DELETE_PRODUCT;
        }(),
        CLOSE_MODAL_DELETE_PRODUCT: function () {
          var _CLOSE_MODAL_DELETE_PRODUCT = (0, _asyncToGenerator2.default)(function* () {
            set(function () {
              return {
                deleteProductModal: {
                  show: false,
                  deleteInfo: undefined
                }
              };
            });
          });
          function CLOSE_MODAL_DELETE_PRODUCT() {
            return _CLOSE_MODAL_DELETE_PRODUCT.apply(this, arguments);
          }
          return CLOSE_MODAL_DELETE_PRODUCT;
        }(),
        SELECT_GIFT_COLOR: function SELECT_GIFT_COLOR(giftColor) {
          set(function () {
            return {
              currentSelectedColorGift: giftColor
            };
          });
        },
        SELECT_GIFT_SIZE: function SELECT_GIFT_SIZE(giftSize) {
          set(function () {
            return {
              currentSelectedGiftSize: giftSize
            };
          });
        },
        SELECT_GIFT: function SELECT_GIFT(color, size) {
          set(function () {
            return {
              currentSelectedColorGift: color,
              currentSelectedGiftSize: size
            };
          });
        },
        CLEAR_PRODUCT_NOT_FOUND: function CLEAR_PRODUCT_NOT_FOUND() {
          set(function () {
            return {
              productNotFound: ''
            };
          });
        },
        ADD_ITEM: function () {
          var _ADD_ITEM = (0, _asyncToGenerator2.default)(function* (seller, id, quantity) {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _productDetailStore$g = _$$_REQUIRE(_dependencyMap[12]).productDetailStore.getState(),
                selectedGiftCardEmail = _productDetailStore$g.selectedGiftCardEmail,
                productDetail = _productDetailStore$g.productDetail;
              var isGiftCard = (productDetail == null ? undefined : productDetail.action) === _$$_REQUIRE(_dependencyMap[6]).ProductResultActionEnum.ShowGiftCard;
              var input = {
                orderFormId: getState().orderFormId,
                seller: seller,
                id: id,
                quantity: quantity
              };
              if (isGiftCard) {
                input = Object.assign({}, input, {
                  giftCard: {
                    email: selectedGiftCardEmail
                  }
                });
              }
              var _yield$getApolloClien14 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormAddItemDocument,
                  context: {
                    clientName: 'gateway'
                  },
                  variables: {
                    input: input
                  }
                }),
                data = _yield$getApolloClien14.data;
              var _ref7 = data || {},
                orderForm = _ref7.orderFormAddItem;
              set(function () {
                return {
                  packageItems: (orderForm == null ? undefined : orderForm.packageItems.map(function (subPackage) {
                    subPackage.items.map(function (packageItem) {
                      if (packageItem.productCategories.includes('Cartão Presente')) {
                        packageItem.itemColor = '';
                        return packageItem;
                      }
                      return packageItem;
                    });
                    return subPackage;
                  })) || [{
                    items: [],
                    totalShippingValue: 0
                  }],
                  selectableGift: orderForm == null ? undefined : orderForm.selectableGift,
                  marketingData: orderForm == null ? undefined : orderForm.marketingData,
                  appTotalizers: orderForm == null ? undefined : orderForm.appTotalizers,
                  installmentInfo: orderForm == null ? undefined : orderForm.installmentInfo,
                  allItemsQuantity: orderForm == null ? undefined : orderForm.allItemsQuantity,
                  prime: orderForm == null ? undefined : orderForm.prime,
                  deleteProductModal: {
                    show: false,
                    deleteInfo: undefined
                  },
                  hasPrimeSubscriptionInCart: orderForm == null ? undefined : orderForm.hasPrimeSubscriptionInCart
                };
              });
              yield (0, _$$_REQUIRE(_dependencyMap[13]).trackingOrderFormAddItem)({
                id: id,
                orderForm: orderForm,
                productDetail: productDetail
              });
            } catch (error) {
              _$$_REQUIRE(_dependencyMap[8]).ExceptionProvider.captureException(error);
              set(function () {
                return {
                  error: error.message
                };
              });
              throw new Error(error.message);
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function ADD_ITEM(_x14, _x15, _x16) {
            return _ADD_ITEM.apply(this, arguments);
          }
          return ADD_ITEM;
        }(),
        ADD_MULTIPLE_ITEMS: function () {
          var _ADD_MULTIPLE_ITEMS = (0, _asyncToGenerator2.default)(function* (orderItems) {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              if (!orderItems) return;
              var _productDetailStore$g2 = _$$_REQUIRE(_dependencyMap[12]).productDetailStore.getState(),
                selectedGiftCardEmail = _productDetailStore$g2.selectedGiftCardEmail,
                productDetail = _productDetailStore$g2.productDetail;
              var isGiftCard = (productDetail == null ? undefined : productDetail.action) === _$$_REQUIRE(_dependencyMap[6]).ProductResultActionEnum.ShowGiftCard;
              var arrOrderItems = orderItems.orderItems.map(function (orderItem) {
                return {
                  id: orderItem.id,
                  quantity: orderItem.quantity,
                  seller: orderItem.seller
                };
              });
              var input = {
                orderFormId: getState().orderFormId,
                orderItems: arrOrderItems
              };
              if (isGiftCard) {
                input = Object.assign({}, input, {
                  giftCard: {
                    email: selectedGiftCardEmail
                  }
                });
              }
              var _yield$getApolloClien15 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormAddMultipleItemDocument,
                  context: {
                    clientName: 'gateway'
                  },
                  variables: {
                    input: input
                  }
                }),
                data = _yield$getApolloClien15.data;
              var _ref8 = data || {},
                orderForm = _ref8.orderFormAddMultipleItem;
              set(function () {
                return {
                  packageItems: (orderForm == null ? undefined : orderForm.packageItems.map(function (subPackage) {
                    subPackage.items.map(function (packageItem) {
                      if (packageItem.productCategories.includes('Cartão Presente')) {
                        packageItem.itemColor = '';
                        return packageItem;
                      }
                      return packageItem;
                    });
                    return subPackage;
                  })) || [{
                    items: [],
                    totalShippingValue: 0
                  }],
                  selectableGift: orderForm == null ? undefined : orderForm.selectableGift,
                  marketingData: orderForm == null ? undefined : orderForm.marketingData,
                  appTotalizers: orderForm == null ? undefined : orderForm.appTotalizers,
                  installmentInfo: orderForm == null ? undefined : orderForm.installmentInfo,
                  allItemsQuantity: orderForm == null ? undefined : orderForm.allItemsQuantity,
                  prime: orderForm == null ? undefined : orderForm.prime,
                  deleteProductModal: {
                    show: false,
                    deleteInfo: undefined
                  },
                  hasPrimeSubscriptionInCart: orderForm == null ? undefined : orderForm.hasPrimeSubscriptionInCart
                };
              });
              yield (0, _$$_REQUIRE(_dependencyMap[13]).trackingOrderFormAddItem)({
                id: orderItems == null ? undefined : orderItems.orderFormId,
                orderForm: orderForm,
                productDetail: productDetail
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
              throw new Error(error.message);
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function ADD_MULTIPLE_ITEMS(_x17) {
            return _ADD_MULTIPLE_ITEMS.apply(this, arguments);
          }
          return ADD_MULTIPLE_ITEMS;
        }(),
        ADD_DELIVERY_TO_RESIDENCE: function () {
          var _ADD_DELIVERY_TO_RESIDENCE = (0, _asyncToGenerator2.default)(function* (deliveryOptions, address) {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _getState = getState(),
                orderFormId = _getState.orderFormId;
              var deliveryOptionsPickUp = deliveryOptions.map(function (option) {
                return {
                  itemIndex: option.itemIndex,
                  selectedSla: option.selectedSla,
                  selectedDeliveryChannel: _$$_REQUIRE(_dependencyMap[6]).DeliveryChannelEnum.Delivery
                };
              });
              var _yield$getApolloClien16 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormSelectAddressDocument,
                  context: {
                    clientName: 'gateway'
                  },
                  variables: {
                    input: {
                      orderFormId: orderFormId,
                      deliveryOptions: deliveryOptionsPickUp,
                      addressType: _$$_REQUIRE(_dependencyMap[6]).AddressTypeEnum.Residential,
                      addressId: address == null ? undefined : address.addressId,
                      cep: address == null ? undefined : address.postalCode,
                      street: address == null ? undefined : address.street,
                      neighborhood: address == null ? undefined : address.neighborhood,
                      city: address == null ? undefined : address.city,
                      state: address == null ? undefined : address.state,
                      complement: address == null ? undefined : address.complement,
                      number: address == null ? undefined : address.number
                    }
                  }
                }),
                data = _yield$getApolloClien16.data;
              var _ref9 = data || {},
                orderForm = _ref9.orderFormSelectAddress;
              set(function () {
                return {
                  packageItems: (orderForm == null ? undefined : orderForm.packageItems.map(function (subPackage) {
                    subPackage.items.map(function (packageItem) {
                      if (packageItem.productCategories.includes('Cartão Presente')) {
                        packageItem.itemColor = '';
                        return packageItem;
                      }
                      return packageItem;
                    });
                    return subPackage;
                  })) || [{
                    items: [],
                    totalShippingValue: 0
                  }],
                  selectableGift: orderForm == null ? undefined : orderForm.selectableGift,
                  marketingData: orderForm == null ? undefined : orderForm.marketingData,
                  appTotalizers: orderForm == null ? undefined : orderForm.appTotalizers,
                  installmentInfo: orderForm == null ? undefined : orderForm.installmentInfo,
                  allItemsQuantity: orderForm == null ? undefined : orderForm.allItemsQuantity,
                  prime: orderForm == null ? undefined : orderForm.prime,
                  deleteProductModal: {
                    show: false,
                    deleteInfo: undefined
                  },
                  hasPrimeSubscriptionInCart: orderForm == null ? undefined : orderForm.hasPrimeSubscriptionInCart
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
              throw new Error(error.message);
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function ADD_DELIVERY_TO_RESIDENCE(_x18, _x19) {
            return _ADD_DELIVERY_TO_RESIDENCE.apply(this, arguments);
          }
          return ADD_DELIVERY_TO_RESIDENCE;
        }(),
        ADD_DELIVERY_TO_PICKUP_IN_POINT: function () {
          var _ADD_DELIVERY_TO_PICKUP_IN_POINT = (0, _asyncToGenerator2.default)(function* (deliveryOptionsStore, storeAddress) {
            try {
              set(function () {
                return {
                  topBarLoading: true
                };
              });
              var _getState2 = getState(),
                orderFormId = _getState2.orderFormId,
                packageItems = _getState2.packageItems;
              var IndexIds = deliveryOptionsStore.map(function (item) {
                return item.itemIndex;
              });
              var newDeliveryOptionsStore = deliveryOptionsStore.map(function (item) {
                return {
                  itemIndex: item.itemIndex,
                  selectedSla: item.selectedSla,
                  selectedDeliveryChannel: item.selectedDeliveryChannel
                };
              });
              var mergeItems = (0, _$$_REQUIRE(_dependencyMap[9]).mergeItemsPackage)(packageItems);
              var deliveryOptionsPickUp = mergeItems.map(function (item) {
                if (!IndexIds.includes(String(item.index))) {
                  return {
                    itemIndex: String(item.index),
                    selectedSla: `Retire em Loja (${storeAddress == null ? undefined : storeAddress.addressId})`,
                    selectedDeliveryChannel: _$$_REQUIRE(_dependencyMap[6]).DeliveryChannelEnum.PickupInPoint
                  };
                }
                return null;
              }).filter(Boolean);
              var deliveryOptions = [].concat((0, _toConsumableArray2.default)(deliveryOptionsPickUp), (0, _toConsumableArray2.default)(newDeliveryOptionsStore));
              var _yield$getApolloClien17 = yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
                  mutation: _$$_REQUIRE(_dependencyMap[6]).OrderFormSelectAddressDocument,
                  context: {
                    clientName: 'gateway'
                  },
                  variables: {
                    input: {
                      orderFormId: orderFormId,
                      deliveryOptions: deliveryOptions,
                      addressType: _$$_REQUIRE(_dependencyMap[6]).AddressTypeEnum.Pickup,
                      addressId: storeAddress == null ? undefined : storeAddress.addressId,
                      cep: storeAddress == null ? undefined : storeAddress.postalCode,
                      street: storeAddress == null ? undefined : storeAddress.street,
                      neighborhood: storeAddress == null ? undefined : storeAddress.neighborhood,
                      city: storeAddress == null ? undefined : storeAddress.city,
                      state: storeAddress == null ? undefined : storeAddress.state,
                      complement: storeAddress == null ? undefined : storeAddress.complement,
                      number: storeAddress == null ? undefined : storeAddress.number
                    }
                  }
                }),
                data = _yield$getApolloClien17.data;
              var _ref10 = data || {},
                orderForm = _ref10.orderFormSelectAddress;
              set(function () {
                return {
                  packageItems: (orderForm == null ? undefined : orderForm.packageItems.map(function (subPackage) {
                    subPackage.items.map(function (packageItem) {
                      if (packageItem.productCategories.includes('Cartão Presente')) {
                        packageItem.itemColor = '';
                        return packageItem;
                      }
                      return packageItem;
                    });
                    return subPackage;
                  })) || [],
                  selectableGift: orderForm == null ? undefined : orderForm.selectableGift,
                  marketingData: orderForm == null ? undefined : orderForm.marketingData,
                  appTotalizers: orderForm == null ? undefined : orderForm.appTotalizers,
                  installmentInfo: orderForm == null ? undefined : orderForm.installmentInfo,
                  allItemsQuantity: orderForm == null ? undefined : orderForm.allItemsQuantity,
                  prime: orderForm == null ? undefined : orderForm.prime,
                  deleteProductModal: {
                    show: false,
                    deleteInfo: undefined
                  },
                  hasPrimeSubscriptionInCart: orderForm == null ? undefined : orderForm.hasPrimeSubscriptionInCart
                };
              });
            } catch (error) {
              set(function () {
                return {
                  error: error.message
                };
              });
              throw new Error(error.message);
            } finally {
              set(function () {
                return {
                  topBarLoading: false
                };
              });
            }
          });
          function ADD_DELIVERY_TO_PICKUP_IN_POINT(_x20, _x21) {
            return _ADD_DELIVERY_TO_PICKUP_IN_POINT.apply(this, arguments);
          }
          return ADD_DELIVERY_TO_PICKUP_IN_POINT;
        }(),
        ADD_DELIVERY_TYPE: function ADD_DELIVERY_TYPE(type, store) {
          set(function () {
            return {
              deliveryType: {
                type: type,
                store: store
              }
            };
          });
        },
        SAVE_ROULET_COUPON: function SAVE_ROULET_COUPON(coupon, timestamp) {
          set(function () {
            return {
              rouletCoupon: {
                code: coupon,
                timestamp: timestamp,
                blocked: false
              }
            };
          });
        },
        OPEN_ROULET: function OPEN_ROULET() {
          set(function () {
            return {
              rouletIsOpen: true
            };
          });
        },
        CLOSE_ROULET: function CLOSE_ROULET() {
          set(function () {
            return {
              rouletIsOpen: false
            };
          });
        },
        SET_ROULET_LOADING: function SET_ROULET_LOADING(value) {
          set(function () {
            return {
              rouletIsLoading: value
            };
          });
        },
        BLOCK_ROULET_COUPON: function BLOCK_ROULET_COUPON() {
          set(function () {
            return {
              rouletCoupon: Object.assign({}, getState().rouletCoupon, {
                blocked: true
              })
            };
          });
        },
        UNBLOCK_ROULET_COUPON: function UNBLOCK_ROULET_COUPON() {
          set(function () {
            return {
              rouletCoupon: Object.assign({}, getState().rouletCoupon, {
                blocked: false
              })
            };
          });
        }
      }
    };
  });
  var useBagStore = exports.useBagStore = (0, _$$_REQUIRE(_dependencyMap[14]).createZustandStoreWithSelectors)(bagStore);
