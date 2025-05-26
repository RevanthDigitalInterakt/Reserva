import React, { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import type { TItemBag } from '../../../../zustand/useBagStore/types/bagStore';
import { createNavigateToProductParams } from '../../../../utils/createNavigateToProductParams';
import { ProductUnavailableListItem } from '../ProductUnavailableListItem/ProductUnavailableListItem';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { Box } from '../../../../components/Box/Box';
import { Divider } from '../../../../components/Divider/Divider';
import { mergeItemsPackage } from '../../../../utils/mergeItemsPackage';

export function UnavailableList() {
  const { actions, packageItems } = useBagStore(['packageItems', 'actions']);

  const navigation = useNavigation();

  const items = useMemo(() => mergeItemsPackage(packageItems), [packageItems]);

  const unavailableList = useMemo(() => items.filter((item) => item.availability !== 'available'), [items]);

  const handleDeleteProductModal = useCallback((product: TItemBag, index: number) => {
    actions.ACTIVE_MODAL_DELETE_PRODUCT(product, index);
  }, [actions]);
  const handleNavigationToDetail = useCallback(({
    id,
    name,
    productId,
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
      <Box paddingX="xxxs">
        <Divider marginTop="xxxs" variant="fullWidth" />
      </Box>
      <Box paddingX="xxxs" paddingY="xxxs">
        {unavailableList.map((item, index) => (
          <ProductUnavailableListItem
            data={item}
            key={item.productTitle}
            onPress={() => handleNavigationToDetail(item)}
            onDelete={() => handleDeleteProductModal(item, index)}
          />
        ))}
      </Box>
    </>
  );
}
