import EventProvider from './EventProvider';
import { defaultBrand } from './defaultWBrand';
import type { OrderFormQuery, ProductQuery } from '../base/graphql/generated';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { mergeItemsPackage } from './mergeItemsPackage';
import { getBrands } from './getBrands';

type TrackingOrderFormType = {
  id: string
  orderForm?: OrderFormQuery['orderForm']
  productDetail?: ProductQuery['product'] | null
};

export const trackingOrderFormAddItem = async (trackingProduct: TrackingOrderFormType) => {
  try {
    const mergedItems = mergeItemsPackage(trackingProduct.orderForm?.packageItems || []);

    const product = mergedItems.find(
      (item) => item.id === trackingProduct.id,
    );

    if (!product) {
      return;
    }

    EventProvider.logEvent('page_view', {
      item_brand: defaultBrand.picapau,
    });

    EventProvider.logEvent('add_to_cart', {
      item_id: trackingProduct.id,
      item_name: trackingProduct.productDetail?.productName || product.productTitle,
      item_category: 'product',
      item_brand: getBrands(mergedItems || []),
      currency: 'BRL',
      price: (product?.price || 0) / 100,
      quantity: product.quantity,
      seller: product.seller,
    });
  } catch (e) {
    ExceptionProvider.captureException(e, 'trackingOrderFormAddItem - trackingOrderFormAddItem.ts');
  }
};
