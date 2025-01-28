import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorageItem } from '../hooks/useAsyncStorageProvider';
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

    const ditoId = trackingProduct.orderForm?.clientProfileData?.email
      ? await getAsyncStorageItem('@Dito:userRef')
      : await AsyncStorage.getItem('@Dito:anonymousID');

    EventProvider.sendTrackEvent('adicionou-produto-ao-carrinho', {
      id: ditoId,
      action: 'adicionou-produto-ao-carrinho',
      data: {
        marca: product?.additionalInfo?.brandName || '',
        id_produto: trackingProduct.id,
        nome_produto: product?.name || '',
        categorias_produto: Object.entries(product.productCategories)
          .map(([categoryId, categoryName]) => `${categoryId}: ${categoryName}`)
          .join(', '),
        tamanho: product.skuName.split(' - ')[1] || '',
        cor: product.skuName.split(' - ')[0] || '',
        preco_produto: (product.sellingPrice || 0) / 100, // convertPrice
        origem: 'app',
      },
    });
  } catch (e) {
    ExceptionProvider.captureException(e, "trackingOrderFormAddItem - trackingOrderFormAddItem.ts");
  }
};
