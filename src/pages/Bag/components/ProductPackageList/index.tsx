import React, { useCallback, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import type { TItemBag } from '../../../../zustand/useBagStore/types/bagStore';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { createNavigateToProductParams } from '../../../../utils/createNavigateToProductParams';
import { getBrands } from '../../../../utils/getBrands';
import { useCart } from '../../../../context/CartContext';
import ProductListItem from '../ProductListItem';
import { productPackageListStyles } from './ProductPackageList.styles';
import ProductUnavailable from '../ProductUnavailable';
import DeliveryItemInfo from '../DeliveryItemInfo';
import ProductListItemPrime from '../ProductListItem/ProductListItemPrime';

export default function BagProductPackageList() {
  const { orderForm } = useCart();
  const { actions, packageItems } = useBagStore(['actions', 'packageItems']);
  const navigation = useNavigation();

  const hasPackageItems = useMemo(
    () => packageItems.length >= 1 && !!packageItems[0]?.metadata?.availability,
    [packageItems],
  );

  const handleAddProductToGift = useCallback(async (
    isAddedAsGift: boolean,
    index: number,
    id: string | null | undefined,
  ) => {
    if (!id) return;

    if (!isAddedAsGift) {
      await actions.ADD_GIFT(index, id);
      return;
    }

    await actions.REMOVE_GIFT(index, id);
  }, [actions]);

  const handleDeleteProductModal = useCallback((product: TItemBag, index: number) => {
    actions.ACTIVE_MODAL_DELETE_PRODUCT(product, index);
  }, [actions]);

  const handleAddCount = useCallback(async (
    countUpdated: number,
    item: TItemBag,
    index: number,
  ) => {
    await actions.UPDATE_PRODUCT_COUNT(index, item, countUpdated);

    EventProvider.logEvent('add_to_cart', {
      item_id: item.id,
      item_price: (item.price || 0) / 100,
      item_quantity: countUpdated,
      item_category: 'product',
      currency: 'BRL',
      seller: item.seller,
      item_brand: getBrands(orderForm?.items || []),
    });
  }, [actions, orderForm?.items]);

  const handleSubCount = useCallback(async (
    countUpdated: number,
    oldCountValue: number,
    item: TItemBag,
    index: number,
  ) => {
    if (oldCountValue <= 1) {
      await handleDeleteProductModal(item, index);
      return;
    }

    EventProvider.logEvent('remove_from_cart', {
      item_id: item.id,
      item_categories: 'product',
      item_brand: defaultBrand.reserva,
    });

    await actions.UPDATE_PRODUCT_COUNT(index, item, countUpdated);
  }, [actions, handleDeleteProductModal]);

  const handleNavigationToDetail = useCallback(({
    productId,
    name,
    id,
    isPrimeSubscription,
  }: TItemBag) => {
    EventProvider.logEvent('page_view', {
      item_brand: defaultBrand.picapau,
    });

    EventProvider.logEvent('select_item', {
      item_list_id: productId,
      item_list_name: name,
      item_brand: defaultBrand.reserva,
    });

    if (isPrimeSubscription) {
      navigation.navigate('PrimeLP');
      return;
    }

    navigation.navigate(
      'ProductDetail',
      createNavigateToProductParams({ productId, skuId: id }),
    );
  }, [navigation]);

  return (
    <View>
      {packageItems.map((packItem, idx) => (
        <View key={`${(packItem?.items[0]?.index || 0) + idx}-${packItem?.items[0]?.key}`}>
          {hasPackageItems
          && (
          <View style={productPackageListStyles.titleContainer}>
            <Text style={[
              productPackageListStyles.title,
              packItem?.metadata?.availability === 'UNAVAILABLE'
                ? productPackageListStyles.titleUnavailable : productPackageListStyles.title,
            ]}
            >
              {packItem?.metadata?.availability === 'UNAVAILABLE' ? (
                'Produtos indisponíveis'
              ) : (

                `Pacote ${idx + 1}`
              )}
            </Text>
          </View>
          )}

          <ProductUnavailable type="UNAVAILABLE" showCard={packItem?.metadata?.availability === 'UNAVAILABLE'} />
          <ProductUnavailable type="SOME_UNAVAILABLE" showCard={packItem?.metadata?.availability === 'SOME_UNAVAILABLE'} />

          <View style={{ gap: 15 }}>
            { packItem.items.map((item) => {
              if (item.sellingPrice !== 0 && !item.isGift) {
                return item.isPrimeSubscription ? (
                  <ProductListItemPrime
                    key={`${item.productId}-${String(item.index)}`}
                    data={item}
                    onDelete={() => handleDeleteProductModal(item, item.index)}
                    onPress={() => handleNavigationToDetail(item)}
                  />
                ) : (
                  <ProductListItem
                    key={`${item.productId}-${String(item.index)}`}
                    data={item}
                    onAddCount={(count) => handleAddCount(count, item, item.index)}
                    onSubCount={(count) => handleSubCount(count, item.quantity, item, item.index)}
                    onDelete={() => handleDeleteProductModal(item, item.index)}
                    onPress={() => handleNavigationToDetail(item)}
                    onAddGift={() => (
                      handleAddProductToGift(
                        item.isAddedAsGift,
                        item.index,
                        item.giftOfferingId,
                      )
                    )}
                  />
                );
              }

              return null;
            })}
          </View>
          {packItem?.metadata?.shippingEstimate && (
          <DeliveryItemInfo
            friendlyName={packItem?.metadata?.friendlyName!}
            shippingEstimate={packItem?.metadata?.shippingEstimate}
          />
          )}
          {(packageItems.length - 1) > idx && (
            <View style={productPackageListStyles.divider} />
          )}
        </View>
      ))}
    </View>
  );
}
