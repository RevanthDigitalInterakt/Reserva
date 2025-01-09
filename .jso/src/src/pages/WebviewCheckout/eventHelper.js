  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getURLParameter = getURLParameter;
  exports.triggerEventAfterPurchaseCompleted = exports.prepareEventDataPurchaseCompleted = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function getURLParameter(url, name) {
    var match = url.match(new RegExp(`[\\?&]${name.replace(/[\[\]]/g, '\\$&')}=([^&#]*)`));
    return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : '';
  }
  function sumArrayValues(arrays) {
    if (!arrays || arrays.length === 0) {
      return [];
    }
    return arrays[0].map(function (obj) {
      var sumValue = obj.value;
      for (var i = 1; i < arrays.length; i += 1) {
        var correspondingObj = arrays[i].find(function (item) {
          return item.id === obj.id;
        });
        if (correspondingObj) {
          sumValue += correspondingObj.value;
        }
      }
      return Object.assign({}, obj, {
        value: sumValue
      });
    });
  }
  function condenseArray(data) {
    var seenStrings = new Set();
    return data.filter(function (item) {
      var str = JSON.stringify(item);
      if (!seenStrings.has(str)) {
        seenStrings.add(str);
        return true;
      }
      return false;
    });
  }
  var sumQuantity = function sumQuantity(items) {
    return items.reduce(function (acc, value) {
      return acc + value.quantity;
    }, 0);
  };
  var getBrands = function getBrands(items) {
    var brandNames = items == null ? undefined : items.map(function (item) {
      var _item$additionalInfo;
      return (item == null ? undefined : (_item$additionalInfo = item.additionalInfo) == null ? undefined : _item$additionalInfo.brandName) || '';
    });
    return brandNames ? brandNames == null ? undefined : brandNames.join(',') : '';
  };
  var getAFContent = function getAFContent(items) {
    return items.map(function (i) {
      return {
        id: i.productId,
        price: i.price / 100 || 0,
        quantity: i.quantity
      };
    });
  };
  var adaptOrderFormItemsTrack = function adaptOrderFormItemsTrack(items) {
    return (items || []).map(function (item) {
      return {
        price: item.price / 100,
        item_id: item.productId,
        quantity: item.quantity,
        item_name: item.name,
        item_variant: item.skuName,
        item_category: 'product'
      };
    });
  };
  var prepareEventDataPurchaseCompleted = exports.prepareEventDataPurchaseCompleted = function prepareEventDataPurchaseCompleted(purchaseOrderForm, orderFormId) {
    try {
      var _condensedResMarketin, _condensedResMarketin2, _condensedResMarketin3, _condensedResMarketin4;
      var onlyItems = purchaseOrderForm.map(function (order) {
        return order.items;
      }).flat();
      var resValue = purchaseOrderForm.map(function (order) {
        return order.value;
      }).reduce(function (acc, value) {
        return acc + value;
      }, 0);
      var resTotalizers = purchaseOrderForm.map(function (order) {
        return order.totals;
      });
      var condensedResTotalizers = sumArrayValues(resTotalizers);
      var resPaymentData = purchaseOrderForm.map(function (order) {
        return order.paymentData;
      });
      var resMarketingData = purchaseOrderForm.map(function (order) {
        return order.marketingData;
      });
      var condensedResMarketingData = condenseArray(resMarketingData);
      var resOrderValue = resValue / 100;
      var timestamp = Math.floor(Date.now() / 1000);
      var resProductIds = onlyItems.map(function (item) {
        return item.productId;
      });
      var resIds = onlyItems.map(function (item) {
        return item.id;
      });
      var resTotalQuantity = sumQuantity(onlyItems);
      var resWbrand = getBrands(onlyItems);
      var resAfContent = getAFContent(onlyItems);
      var resAdaptItems = adaptOrderFormItemsTrack(onlyItems);
      var resItemSubtotal = resTotalizers.map(function (totalizer) {
        var _totalizer$find;
        return (((_totalizer$find = totalizer.find(function (x) {
          return x.id === 'Items';
        })) == null ? undefined : _totalizer$find.value) || 0) / 100;
      });
      var condensedResItemSubtotal = resItemSubtotal.reduce(function (acc, value) {
        return acc + value;
      }, 0);
      var resAfRevenue = '0';
      if (condensedResItemSubtotal) {
        resAfRevenue = condensedResItemSubtotal.toFixed(2);
      }
      var resItemQuantity = sumQuantity(onlyItems);
      var resItemShippingTotal = resTotalizers.map(function (totalizer) {
        var _totalizer$find2;
        return (((_totalizer$find2 = totalizer.find(function (x) {
          return x.name === 'Shipping';
        })) == null ? undefined : _totalizer$find2.value) || 0) / 100;
      });
      var condensedResItemShippingTotal = resItemShippingTotal.reduce(function (acc, value) {
        return acc + value;
      }, 0);
      var resItemTotal = resItemSubtotal.map(function (subTotal, index) {
        return subTotal + resItemShippingTotal[index];
      });
      var condensedResItemTotal = resItemTotal.reduce(function (acc, value) {
        return acc + value;
      }, 0);
      var resRate = resPaymentData.map(function (payment) {
        var innerResRate = payment == null ? undefined : payment.transactions.map(function (transaction) {
          return ((transaction == null ? undefined : transaction.payments.map(function (innerPayment) {
            return ((innerPayment == null ? undefined : innerPayment.interestRate) || 0) / 100;
          })) || 0) / 100;
        });
        return innerResRate;
      });
      var condensedResRate = resRate.flat().reduce(function (acc, value) {
        return acc + value;
      }, 0);
      var resOrderId = purchaseOrderForm.map(function (order) {
        return order == null ? undefined : order.orderId.split('-')[0];
      });
      var condensedResOrderId = condenseArray(resOrderId).toString();
      var resPaymentDataInfo = purchaseOrderForm.map(function (order) {
        return order.paymentData;
      });
      var condensedPaymentDataInfo = condenseArray(resPaymentDataInfo);
      var resPayments = resPaymentDataInfo.reduce(function (acc, item) {
        if (item.transactions) {
          var payments = item.transactions.map(function (trans) {
            return trans.payments;
          }).flat();
          return [].concat((0, _toConsumableArray2.default)(acc), (0, _toConsumableArray2.default)(payments));
        }
        return acc;
      }, []);
      var resPaymentSystemName = resPayments.map(function (payment) {
        return payment == null ? undefined : payment.paymentSystemName;
      });
      var condensedResPaymentSystemName = condenseArray(resPaymentSystemName).toString();
      var resPaymentSystem = resPayments.map(function (payment) {
        return payment == null ? undefined : payment.paymentSystem;
      });
      var condensedResPaymentSystem = condenseArray(resPaymentSystem).toString();
      var resTransactionId = purchaseOrderForm.map(function (order) {
        var _order$paymentData, _order$paymentData$tr;
        return (_order$paymentData = order.paymentData) == null ? undefined : (_order$paymentData$tr = _order$paymentData.transactions[0]) == null ? undefined : _order$paymentData$tr.transactionId;
      });
      var condensedResTransactionId = condenseArray(resTransactionId);
      return {
        orderFormItems: onlyItems,
        orderFormId: orderFormId,
        orderValue: resOrderValue,
        timestamp: timestamp,
        totalQuantity: resTotalQuantity,
        productIds: resProductIds,
        ids: resIds,
        adaptItems: resAdaptItems,
        item_brand: resWbrand,
        afContent: resAfContent,
        itemSubtotal: condensedResItemSubtotal,
        afRevenue: resAfRevenue,
        itemQuantity: resItemQuantity,
        itemShippingTotal: condensedResItemShippingTotal,
        itemTotal: condensedResItemTotal,
        rate: condensedResRate,
        orderId: condensedResOrderId,
        paymentSystem: condensedResPaymentSystem,
        paymentSystemName: condensedResPaymentSystemName,
        transactionId: condensedResTransactionId,
        totalizers: condensedResTotalizers,
        paymentData: condensedPaymentDataInfo,
        marketingData: condensedResMarketingData,
        campaignSource: ((_condensedResMarketin = condensedResMarketingData[0]) == null ? undefined : _condensedResMarketin.utmCampaign) === null ? '' : (_condensedResMarketin2 = condensedResMarketingData[0]) == null ? undefined : _condensedResMarketin2.utmCampaign,
        campaignMedium: ((_condensedResMarketin3 = condensedResMarketingData[0]) == null ? undefined : _condensedResMarketin3.utmMedium) === null ? '' : (_condensedResMarketin4 = condensedResMarketingData[0]) == null ? undefined : _condensedResMarketin4.utmMedium
      };
    } catch (e) {
      throw new Error(e);
    }
  };
  var triggerEventAfterPurchaseCompleted = exports.triggerEventAfterPurchaseCompleted = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (dataPurchaseCompleted, userMail, itemsSkus) {
      var _dataPurchaseComplete3, _dataPurchaseComplete4;
      var userRefDito = (yield (0, _$$_REQUIRE(_dependencyMap[7]).getAsyncStorageItem)('@Dito:userRef')) || '';

      /* ---- Event fez-pedido-produto ---- */
      dataPurchaseCompleted.orderFormItems.forEach(function (item) {
        var _item$skuName, _item$skuName$split, _item$skuName$split$, _item$skuName2, _item$skuName2$split, _item$skuName2$split$, _item$priceDefinition, _item$priceDefinition2;
        _EventProvider.default.sendTrackEvent('fez-pedido-produto', {
          id: userRefDito,
          action: 'fez-pedido-produto',
          data: {
            id: userRefDito,
            id_transacao: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.orderId,
            quantidade: item == null ? undefined : item.quantity,
            marca: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.item_brand,
            id_produto: item == null ? undefined : item.productId,
            nome_produto: (0, _$$_REQUIRE(_dependencyMap[8]).removeSkuColorProductName)(item == null ? undefined : item.name, item == null ? undefined : item.skuName),
            categorias_produto: item == null ? undefined : item.productCategories,
            tamanho: (item == null ? undefined : (_item$skuName = item.skuName) == null ? undefined : (_item$skuName$split = _item$skuName.split('-')) == null ? undefined : (_item$skuName$split$ = _item$skuName$split[1]) == null ? undefined : _item$skuName$split$.trim()) || '',
            cor: (item == null ? undefined : (_item$skuName2 = item.skuName) == null ? undefined : (_item$skuName2$split = _item$skuName2.split('-')) == null ? undefined : (_item$skuName2$split$ = _item$skuName2$split[0]) == null ? undefined : _item$skuName2$split$.trim()) || '',
            preco_produto: ((_item$priceDefinition = item == null ? undefined : (_item$priceDefinition2 = item.priceDefinition) == null ? undefined : _item$priceDefinition2.calculatedSellingPrice) != null ? _item$priceDefinition : 0) / 100,
            origem: 'app'
          }
        });
      });
      var _useSearchStore$getSt = _$$_REQUIRE(_dependencyMap[9]).useSearchStore.getState(),
        queryID = _useSearchStore$getSt.queryID;
      _$$_REQUIRE(_dependencyMap[10]).trackClickAlgoliaStore.getState().onTrack({
        typeEvent: _$$_REQUIRE(_dependencyMap[11]).TrackEventTypeEnum.Conversion,
        nameEvent: queryID ? _$$_REQUIRE(_dependencyMap[11]).TrackEventNameEnum.PurchasedItemsSearch : _$$_REQUIRE(_dependencyMap[11]).TrackEventNameEnum.PurchasedItems,
        sku: itemsSkus,
        subTypeEvent: _$$_REQUIRE(_dependencyMap[11]).TrackEventSubTypeEnum.Purchase,
        dataObject: dataPurchaseCompleted.orderFormItems.map(function (item) {
          var _item$priceDefinition3, _item$priceDefinition4;
          return {
            discount: (item == null ? undefined : item.discountPercent) || 0,
            quantity: (item == null ? undefined : item.quantity) || 0,
            price: ((_item$priceDefinition3 = item == null ? undefined : (_item$priceDefinition4 = item.priceDefinition) == null ? undefined : _item$priceDefinition4.calculatedSellingPrice) != null ? _item$priceDefinition3 : 0) / 100
          };
        }),
        totalPrice: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.orderValue,
        queryID: queryID,
        price: dataPurchaseCompleted.orderValue
      });
      _$$_REQUIRE(_dependencyMap[12]).trackOrderStore.getState().onTrack(dataPurchaseCompleted, userMail);

      /* ---- Event sendLastOrderData ---- */
      _EventProvider.default.getPushTags(function (receivedTags) {
        var _dataPurchaseComplete, _newTotalOrdersValue, _dataPurchaseComplete2;
        var newTotalOrdersValue = '0';
        if (receivedTags != null && receivedTags.total_orders_value) {
          var _parseFloat;
          newTotalOrdersValue = (_parseFloat = parseFloat(receivedTags == null ? undefined : receivedTags.total_orders_value)) == null ? undefined : _parseFloat.toString();
        }
        _EventProvider.default.sendPushTags('sendLastOrderData', {
          last_order_value: dataPurchaseCompleted == null ? undefined : (_dataPurchaseComplete = dataPurchaseCompleted.orderValue) == null ? undefined : _dataPurchaseComplete.toString(),
          total_orders_value: (_newTotalOrdersValue = newTotalOrdersValue) == null ? undefined : _newTotalOrdersValue.toString(),
          last_purchase_date: dataPurchaseCompleted == null ? undefined : (_dataPurchaseComplete2 = dataPurchaseCompleted.timestamp) == null ? undefined : _dataPurchaseComplete2.toString()
        });
      });

      /* ---- Event Purchase ---- */
      _EventProvider.default.OneSignal.sendOutcomeWithValue('Purchase', dataPurchaseCompleted == null ? undefined : (_dataPurchaseComplete3 = dataPurchaseCompleted.orderValue) == null ? undefined : _dataPurchaseComplete3.toFixed(2));

      /* ---- Event af_purchase ---- */
      _EventProvider.default.appsFlyer.logEvent('af_purchase', {
        af_revenue: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.afRevenue,
        af_price: `${dataPurchaseCompleted == null ? undefined : (_dataPurchaseComplete4 = dataPurchaseCompleted.orderValue) == null ? undefined : _dataPurchaseComplete4.toFixed(2)}`,
        af_content_id: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.ids,
        af_content_type: 'product',
        af_currency: 'BRL',
        af_quantity: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.itemQuantity,
        af_order_id: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.orderFormId,
        af_content: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.afContent,
        af_receipt_id: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.orderFormId
      });

      /* ---- Event purchase uxCam */
      _UxCam.default.logEvent('purchase', {
        affiliation: dataPurchaseCompleted.item_brand,
        coupon: 'coupon',
        currency: 'BRL',
        items: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.adaptItems,
        shipping: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.itemShippingTotal,
        tax: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.rate,
        transaction_id: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.orderId,
        value: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.orderValue
      });

      /* ---- Event ron_purchase ---- */
      var _yield$Promise$all = yield Promise.all([_reactNative.Linking.getInitialURL(), (0, _$$_REQUIRE(_dependencyMap[7]).getAsyncStorageItem)('@RNSession:Ron'), (0, _$$_REQUIRE(_dependencyMap[7]).getAsyncStorageItem)('@RNOrder:RonItems')]),
        _yield$Promise$all2 = (0, _slicedToArray2.default)(_yield$Promise$all, 3),
        initialURL = _yield$Promise$all2[0],
        isRon = _yield$Promise$all2[1],
        ronItems = _yield$Promise$all2[2];
      var isRonSession = !!((0, _$$_REQUIRE(_dependencyMap[13]).urlRon)(initialURL || '').match || isRon);
      if (ronItems != null && ronItems.length && isRonSession) {
        var hasAnyRonItem = ronItems.some(function (id) {
          return dataPurchaseCompleted.productIds.includes(id);
        });
        if (hasAnyRonItem) {
          _EventProvider.default.logEvent('ron_purchase', {
            coupon: 'coupon',
            currency: 'BRL',
            items: dataPurchaseCompleted.adaptItems,
            transaction_id: '',
            value: dataPurchaseCompleted.orderValue,
            item_brand: dataPurchaseCompleted.item_brand
          });
        }
      }

      /* ---- Event fez-pedido ---- */
      _EventProvider.default.sendTrackEvent('fez-pedido', {
        id: userRefDito,
        action: 'fez-pedido',
        data: {
          quantidade_produtos: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.totalQuantity,
          id_transacao: (dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.orderId) || '',
          metodo_pagamento: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.paymentSystemName,
          subtotal: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.itemSubtotal,
          total: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.orderValue,
          total_frete: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.itemShippingTotal,
          origem: 'app',
          dispositivo: _reactNative.Platform.OS,
          id: userRefDito,
          client_provider: _reactNative.Platform.OS
        }
      });

      /* ---- Event logPurchase ---- */
      _EventProvider.default.logPurchase({
        affiliation: dataPurchaseCompleted.item_brand,
        coupon: 'coupon',
        currency: 'BRL',
        items: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.adaptItems,
        shipping: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.itemShippingTotal,
        tax: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.rate,
        transaction_id: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.orderId,
        value: dataPurchaseCompleted == null ? undefined : dataPurchaseCompleted.orderValue
      });
      _EventProvider.default.sendPushTags('sendAbandonedCartTags', {
        cart_update: '',
        product_name: '',
        product_image: ''
      });
    });
    return function triggerEventAfterPurchaseCompleted(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
