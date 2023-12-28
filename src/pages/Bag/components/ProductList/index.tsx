import React, { useCallback, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import type { TItemBag } from '../../../../zustand/useBagStore/types/bagStore';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { createNavigateToProductParams } from '../../../../utils/createNavigateToProductParams';
import { getBrands } from '../../../../utils/getBrands';
import { useCart } from '../../../../context/CartContext';
import ProductListItem from '../ProductListItem';
import ProductListItemPrime from '../ProductListItem/ProductListItemPrime';

export default function BagProductList() {
  const { orderForm } = useCart();
  const { actions, items } = useBagStore(['actions', 'items']);
  const navigation = useNavigation();

  const availableList = useMemo(() => items.filter((item) => item.availability === 'available'), [items]);

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

    navigation.navigate('ProductDetail', createNavigateToProductParams({ productId, skuId: id }));
  }, [navigation]);

  return (
    <>
      {availableList.map((item, index: number) => {
        if (item.sellingPrice !== 0 && item.isGift === false) {
          return item.isPrimeSubscription ? (
            <ProductListItemPrime
              data={item}
              onDelete={() => handleDeleteProductModal(item, index)}
              onPress={() => handleNavigationToDetail(item)}
            />
          ) : (
            <ProductListItem
              data={item}
              onAddCount={(count) => handleAddCount(count, item, index)}
              onSubCount={(count) => handleSubCount(count, item.quantity, item, index)}
              onDelete={() => handleDeleteProductModal(item, index)}
              onPress={() => handleNavigationToDetail(item)}
              onAddGift={() => (
                handleAddProductToGift(item.isAddedAsGift, index, item.giftOfferingId)
              )}
            />
          );
        }

        return null;
      })}
    </>
  );
}
