import { Linking } from 'react-native';
import EventProvider from '../../utils/EventProvider';
import { urlRon } from '../../utils/LinkingUtils/static/deepLinkMethods';
import { getAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { trackClickAlgoliaStore } from '../../zustand/useTrackAlgoliaStore/useTrackAlgoliaStore';
import { useSearchStore } from '../../zustand/useSearchStore';
import { TrackEventNameEnum, TrackEventSubTypeEnum, TrackEventTypeEnum } from '../../base/graphql/generated';
import { trackOrderStore } from '../../zustand/useTrackOrderStore/useTrackOrderStore';
import { order } from 'styled-system';
import { neighborhoodSchema } from '../Address/utils/inputValidations';
import { console } from 'inspector';

export function getURLParameter(url: string, name: string): string {
  const match = url.match(new RegExp(`[\\?&]${name.replace(/[\[\]]/g, '\\$&')}=([^&#]*)`));
  return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : '';
}

function sumArrayValues(arrays: any) {
  if (!arrays || arrays.length === 0) {
    return [];
  }

  return arrays[0].map((obj: any) => {
    let sumValue = obj.value;

    for (let i = 1; i < arrays.length; i += 1) {
      const correspondingObj = arrays[i].find(
        (item: any) => item.id === obj.id,
      );

      if (correspondingObj) {
        sumValue += correspondingObj.value;
      }
    }

    return {
      ...obj,
      value: sumValue,
    };
  });
}

function condenseArray(data: any) {
  const seenStrings = new Set();

  return data.filter((item: any) => {
    const str = JSON.stringify(item);

    if (!seenStrings.has(str)) {
      seenStrings.add(str);

      return true;
    }

    return false;
  });
}

const sumQuantity = (items: any) => items.reduce((acc: any, value: any) => acc + value.quantity, 0);

const getBrands = (items: any) => {
  const brandNames = items?.map(
    (item: any) => item?.additionalInfo?.brandName || '',
  );

  return brandNames ? brandNames?.join(',') : '';
};

const getAFContent = (items: any) => items.map((i: any) => ({
  id: i.productId,
  price: i.price / 100 || 0,
  quantity: i.quantity,
}));

const adaptOrderFormItemsTrack = (items: any) => (items || []).map((item: any) => ({
  price: item.price / 100,
  item_id: item.productId,
  item_name: item.name,
  item_variant: item.skuName,
  item_category: 'product',
  ///////////////////////////////////////////////////////
  referenceId: item.refId,
  sellingPrice: item.sellingPrice / 100,
  ean: item.ean,
  productSize: item.skuName.split(' - ')[0],
  prductColor: item.skuName.split(' - ')[1],
  brand: item?.productCategories[1] || '',
  skuId: item.id,
  quantity: item.quantity,
  productId: item.productId,
  productRefId: item.productRefId,
  name: item.name,
  category: item.productCategories || {},
  ///////////////////////////////////////////////////////

}));

console.debug("adatptitems");


//REZ


export const prepareEventDataPurchaseCompleted = (
  purchaseOrderForm: any,
  orderFormId: string,
) => {
  try {

    const onlyItems = purchaseOrderForm.map((order: any) => order.items).flat();

    const resValue = purchaseOrderForm
      .map((order: any) => order.value)
      .reduce((acc: any, value: any) => acc + value, 0);

    const Sellers = purchaseOrderForm.map((order: any) => order.sellers || []).flat();

    const visitorData = purchaseOrderForm.map((order: any) => {
      const address = order.shippingData?.selectedAddresses?.[0];

      return {
        city: address?.city || '',
        state: address?.state || '',
        postalCode: address?.postalCode || '',
        country: address?.country || '',
        street: address?.street || '',
        neighborhood: address?.neighborhood || '',
      };
    }).filter(data => data.city);

    const resTotalizers = purchaseOrderForm.map((order: any) => order.totals);

    const condensedResTotalizers = sumArrayValues(resTotalizers);


    const discountValues=purchaseOrderForm.map((order :any)=>{
      const discountTotal = order.totals.find((total: any) =>total.id === 'Discounts');
      return discountTotal?.value || 0;
    });

    const shipping=purchaseOrderForm.map((order :any)=>{
      const shippingTotal = order.totals.find((total: any) =>total.id === 'Shipping');
      return shippingTotal?.value || 0;
    });


    const resPaymentData = purchaseOrderForm.map((order: any) => order.paymentData);

    const resMarketingData = purchaseOrderForm.map((order: any) => order.marketingData);

    const condensedResMarketingData = condenseArray(resMarketingData);

    const resOrderValue = resValue / 100;

    const timestamp = Math.floor(Date.now() / 1000);

    const resProductIds = onlyItems.map((item: any) => item.productId);

    const resIds = onlyItems.map((item: any) => item.id);

    const resTotalQuantity = sumQuantity(onlyItems);

    const resWbrand = getBrands(onlyItems);

    const resAfContent = getAFContent(onlyItems);

    const resAdaptItems = adaptOrderFormItemsTrack(onlyItems);
    console.debug("printing adaptitems");
    console.debug(resAdaptItems);

    const resItemSubtotal = resTotalizers.map(
      (totalizer: any) => (totalizer.find((x: any) => x.id === 'Items')?.value || 0) / 100,
    );

    const condensedResItemSubtotal = resItemSubtotal.reduce(
      (acc: any, value: any) => acc + value,
      0,
    );

    let resAfRevenue = '0';

    if (condensedResItemSubtotal) {
      resAfRevenue = condensedResItemSubtotal.toFixed(2);
    }

    const resItemQuantity = sumQuantity(onlyItems);

    const resItemShippingTotal = resTotalizers.map(
      (totalizer: any) => (totalizer.find((x: any) => x.name === 'Shipping')?.value || 0) / 100,
    );

    const condensedResItemShippingTotal = resItemShippingTotal.reduce(
      (acc: any, value: any) => acc + value,
      0,
    );

    const resItemTotal = resItemSubtotal.map(
      (subTotal: any, index: any) => subTotal + resItemShippingTotal[index],
    );

    const condensedResItemTotal = resItemTotal.reduce(
      (acc: any, value: any) => acc + value,
      0,
    );

    const resRate = resPaymentData.map((payment: any) => {
      const innerResRate = payment?.transactions.map((transaction: any) => (
        (transaction?.payments.map(
          (innerPayment: any) => (innerPayment?.interestRate || 0) / 100,
        ) || 0) / 100
      ));

      return innerResRate;
    });

    const condensedResRate = resRate
      .flat()
      .reduce((acc: any, value: any) => acc + value, 0);

    const resOrderId = purchaseOrderForm.map((order: any) => order?.orderId.split('-')[0]);

    const resLastOrderId = purchaseOrderForm.map((order: any) => order?.orderId);

    const condensedResOrderId = condenseArray(resOrderId).toString();

    const resPaymentDataInfo = purchaseOrderForm.map((order: any) => order.paymentData);

    const condensedPaymentDataInfo = condenseArray(resPaymentDataInfo);

    const resPayments = resPaymentDataInfo.reduce((acc: any, item: any) => {
      if (item.transactions) {
        const payments = item.transactions
          .map((trans: any) => trans.payments)
          .flat();

        return [...acc, ...payments];
      }

      return acc;
    }, []);

    const resPaymentSystemName = resPayments.map(
      (payment: any) => payment?.paymentSystemName,
    );

    const condensedResPaymentSystemName = condenseArray(resPaymentSystemName).toString();

    const resPaymentSystem = resPayments.map(
      (payment: any) => payment?.paymentSystem,
    );

    const condensedResPaymentSystem = condenseArray(resPaymentSystem).toString();

    const resTransactionId = purchaseOrderForm.map(
      (order: any) => order.paymentData?.transactions[0]?.transactionId,
    );

    const condensedResTransactionId = condenseArray(resTransactionId);

    //////////////////////////////////////////////////////////////////////////////////////////

    const resCoupon = purchaseOrderForm.map(
      (order: any) => order.marketingData?.coupon,
    );

    const condensedResCoupon = condenseArray(resCoupon);

    const resCouponVendedor = purchaseOrderForm.map((order: any) => {
      const tags = order.marketingData?.marketingTags || [];
      const tag = tags.find((t: string) => t.startsWith('code_CodigoVendedor='));
      return tag ? tag.split('=')[1] : '';
    });

    const condensedResCouponVendedor = condenseArray(resCouponVendedor);

    //   const resShippingData = purchaseOrderForm.map((order: any) => order.shippingData);

    //   const resShipping = resShippingData.map((shipping: any) => {
    //     const shippingAddress = shipping?.selectedAddresses.map((shipaddress: any) => ({
    //       city : shipaddress.city,

    //   }))
    //   return shippingAddress;
    // });


    //////////////////////////////////////////////////////////////////////////////////////////

    return {
      orderFormItems: onlyItems,
      Sellers: Sellers,
      shippingdata: visitorData,
      discount:discountValues,
      shippingValue:shipping,

      /////////////////////////////////////////
      cupom: condensedResCoupon,
      cupomVendedor: condensedResCouponVendedor,
      // visitorData: resShipping,
      ////////////////////////////////////////
      orderFormId,
      orderValue: resOrderValue,
      timestamp,
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
      campaignSource:
        condensedResMarketingData[0]?.utmCampaign === null
          ? ''
          : condensedResMarketingData[0]?.utmCampaign,
      campaignMedium:
        condensedResMarketingData[0]?.utmMedium === null
          ? ''
          : condensedResMarketingData[0]?.utmMedium,
      resLastOrderId: JSON.stringify(resLastOrderId[0]),
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const triggerEventAfterPurchaseCompleted = async (
  dataPurchaseCompleted: any,
  userMail: string,
  itemsSkus: string[],
) => {

  /* ---- Event logPurchase ---- */
  EventProvider.logPurchase({
    affiliation: dataPurchaseCompleted.item_brand,
    coupon: 'coupon',
    currency: 'BRL',
    items: dataPurchaseCompleted?.adaptItems,
    shipping: dataPurchaseCompleted?.itemShippingTotal,
    tax: dataPurchaseCompleted?.rate,
    transaction_id: dataPurchaseCompleted?.orderId,
    value: dataPurchaseCompleted?.orderValue,
  });

  /* ---- Event af_purchase ---- */
  EventProvider.appsFlyer.logEvent('af_purchase', {
    af_revenue: dataPurchaseCompleted?.afRevenue,
    af_price: `${dataPurchaseCompleted?.orderValue?.toFixed(2)}`,
    af_content_id: dataPurchaseCompleted?.ids,
    af_content_type: 'product',
    af_currency: 'BRL',
    af_quantity: dataPurchaseCompleted?.itemQuantity,
    af_order_id: dataPurchaseCompleted?.orderFormId,
    af_content: dataPurchaseCompleted?.afContent,
    af_receipt_id: dataPurchaseCompleted?.orderFormId,
  });




  const { queryID } = useSearchStore.getState();

  trackClickAlgoliaStore.getState().onTrack(
    {
      typeEvent: TrackEventTypeEnum.Conversion,
      nameEvent: queryID
        ? TrackEventNameEnum.PurchasedItemsSearch
        : TrackEventNameEnum.PurchasedItems,
      sku: itemsSkus,
      subTypeEvent: TrackEventSubTypeEnum.Purchase,
      dataObject: dataPurchaseCompleted.orderFormItems.map((item) => ({
        discount: item?.discountPercent || 0,
        quantity: item?.quantity || 0,
        price: (item?.priceDefinition?.calculatedSellingPrice ?? 0) / 100,
      })),
      totalPrice: dataPurchaseCompleted?.orderValue,
      queryID,
      price: dataPurchaseCompleted.orderValue,
    },
  );

  trackOrderStore.getState().onTrack(dataPurchaseCompleted, userMail);

  /* ---- Event sendLastOrderData ---- */
  EventProvider.getPushTags((receivedTags) => {
    let newTotalOrdersValue = '0';
    if (receivedTags?.total_orders_value) {
      newTotalOrdersValue = parseFloat(receivedTags?.total_orders_value)?.toString();
    }

    EventProvider.sendPushTags('sendLastOrderData', {
      last_order_value: dataPurchaseCompleted?.orderValue?.toString(),
      total_orders_value: newTotalOrdersValue?.toString(),
      last_purchase_date: dataPurchaseCompleted?.timestamp?.toString(),
    });
  });

  /* ---- Event Purchase ---- */
  EventProvider.OneSignal?.sendOutcomeWithValue('Purchase', (dataPurchaseCompleted?.orderValue)?.toFixed(2));


  /* ---- Event ron_purchase ---- */
  const [initialURL, isRon, ronItems] = await Promise.all([
    Linking.getInitialURL(),
    getAsyncStorageItem('@RNSession:Ron'),
    getAsyncStorageItem('@RNOrder:RonItems'),
  ]);

  const isRonSession = !!(urlRon(initialURL || '').match || isRon);

  if (ronItems?.length && isRonSession) {
    const hasAnyRonItem = ronItems.some(
      (id) => dataPurchaseCompleted.productIds.includes(id),
    );
    if (hasAnyRonItem) {
      EventProvider.logEvent(
        'ron_purchase',
        {
          coupon: 'coupon',
          currency: 'BRL',
          items: dataPurchaseCompleted.adaptItems,
          transaction_id: '',
          value: dataPurchaseCompleted.orderValue,
          item_brand: dataPurchaseCompleted.item_brand,
        },
      );
    }
  }

  EventProvider.sendPushTags('sendAbandonedCartTags', {
    cart_update: '',
    product_name: '',
    product_image: '',
  });
};