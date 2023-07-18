import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorageItem } from '../hooks/useAsyncStorageProvider';
import EventProvider from './EventProvider';
import { defaultBrand } from './defaultWBrand';
import { getBrands } from './getBrands';
import type { OrderFormQuery } from '../base/graphql/generated';

export const trackingOrderFormAddItem = async (id: string, orderForm?: OrderFormQuery['orderForm']) =>
{
  try
  {
    const product = orderForm?.items.find(
      (item) => item.id === id,
    );

    if (!product)
    {
      return;
    }

    EventProvider.logEvent('page_view', {
      wbrand: defaultBrand.picapau,
    });

    EventProvider.logEvent('add_to_cart', {
      item_id: id,
      item_price: (product?.price || 0) / 100, // convertPrice
      item_quantity: product.quantity,
      item_category: 'product',
      currency: 'BRL',
      seller: product.seller,
      wbrand: getBrands(orderForm?.items || []),
    });

    const ditoId = orderForm?.clientProfileData?.email
      ? await getAsyncStorageItem('@Dito:userRef')
      : await AsyncStorage.getItem('@Dito:anonymousID');

    EventProvider.sendTrackEvent(
      'adicionou-produto-ao-carrinho', {
      id: ditoId,
      action: 'adicionou-produto-ao-carrinho',
      data: {
        marca: product?.additionalInfo?.brandName || '',
        id_produto: id,
        nome_produto: product?.name || '',
        nome_categoria: Object.entries(product.productCategories)
          .map(([categoryId, categoryName]) => `${categoryId}: ${categoryName}`)
          .join(', '),
        tamanho: product.skuName.split(' - ')[1],
        cor: product.skuName.split(' - ')[0],
        preco_produto: (product.sellingPrice || 0) / 100, // convertPrice
        origem: 'app',
      },
    },
    );
  } catch (e)
  {
    EventProvider.captureException(e);
  }
};
