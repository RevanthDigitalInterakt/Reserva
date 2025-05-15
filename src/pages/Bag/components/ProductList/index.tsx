import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import type { TItemBag } from '../../../../zustand/useBagStore/types/bagStore';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { createNavigateToProductParams } from '../../../../utils/createNavigateToProductParams';
import { getBrands } from '../../../../utils/getBrands';
import ProductListItem from '../ProductListItem';
import ProductListItemPrime from '../ProductListItem/ProductListItemPrime';
import { mergeItemsPackage } from '../../../../utils/mergeItemsPackage';
import { useTrackClickAlgoliaStore } from '../../../../zustand/useTrackAlgoliaStore/useTrackAlgoliaStore';
import {
  TrackEventNameEnum,
  TrackEventSubTypeEnum,
  TrackEventTypeEnum,
} from '../../../../base/graphql/generated';
import useSearchStore from '../../../../zustand/useSearchStore';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import ReactMoE, { MoEProperties } from 'react-native-moengage';


export default function BagProductList() {
  const { actions, packageItems, appTotalizers } = useBagStore([
    'actions',
    'packageItems',
    'appTotalizers',
  ]);
  const { productDetail ,selectedColor, selectedSize} = useProductDetailStore(['productDetail', 'selectedColor', 'selectedSize']);
  const { onTrack } = useTrackClickAlgoliaStore(['onTrack']);
  const { queryID } = useSearchStore(['queryID']);
  const navigation = useNavigation();
  const items = useMemo(() => mergeItemsPackage(packageItems), [packageItems]);

  const availableList = useMemo(
    () => items.filter((item) => item.availability === 'available'),
    [items],
  );

  const handleAddProductToGift = useCallback(
    async (
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
    },
    [actions],
  );

  const handleDeleteProductModal = useCallback(
    (product: TItemBag, index: number) => {
      actions.ACTIVE_MODAL_DELETE_PRODUCT(product, index);
    },
    [actions],
  );

  const onLoadItems = useCallback(() => {
    const productIds = packageItems[0]?.items.map(
      (payload) => payload.ean,
    ) as string[] | null | undefined;

    if (packageItems.length > 1) {
      const packages = packageItems.map((packs) => packs.items);

      const itemsPackage = packages
        .map((item) => item.map((i) => ({
          discount: i.discountPercent,
          quantity: i.quantity,
          price: i.price,
        })))
        .reduce((acc, curr) => acc.concat(curr), []);

      onTrack({
        typeEvent: TrackEventTypeEnum.Conversion,
        nameEvent: queryID
          ? TrackEventNameEnum.CartItemsSearch
          : TrackEventNameEnum.CartItems,
        sku: productIds,
        subTypeEvent: TrackEventSubTypeEnum.AddToCart,
        dataObject: itemsPackage,
        totalPrice: appTotalizers.total,
        queryID,
      });

      return;
    }

    const newData = packageItems[0]?.items.map((payload) => ({
      discount: payload.discountPercent,
      quantity: payload.quantity,
      price: payload.priceWithDiscount,
    }));

    onTrack({
      typeEvent: TrackEventTypeEnum.Conversion,
      nameEvent: queryID
        ? TrackEventNameEnum.CartItemsSearch
        : TrackEventNameEnum.CartItems,
      sku: productIds,
      subTypeEvent: TrackEventSubTypeEnum.AddToCart,
      dataObject: newData,
      totalPrice: appTotalizers.total,
      queryID,
    });
  }, [packageItems]);



  const handleAddCount = useCallback(
    async (countUpdated: number, item: TItemBag, index: number) => {
      await actions.UPDATE_PRODUCT_COUNT(index, item, countUpdated);

      EventProvider.logEvent('add_to_cart', {
        item_id: item.id,
        item_name: productDetail?.productName || item.productTitle,
        item_category: 'product',
        item_brand: getBrands(mergeItemsPackage(packageItems) || []),
        currency: 'BRL',
        price: (item.price || 0) / 100,
        quantity: countUpdated,
        seller: item.seller,
      });

      const color = selectedColor?.colorName || '';
      const size = selectedSize?.size || '';


      const moeProps = new MoEProperties();
      moeProps.addAttribute('price', (item.price || 0) / 100,);

      moeProps.addAttribute('variant', color + '-' + size);
      moeProps.addAttribute('skuId', item.id);
      moeProps.addAttribute('quantity', countUpdated);
      moeProps.addAttribute('brand', productDetail?.categoryTree[0] || '');
      moeProps.addAttribute('name', productDetail?.productName || item.productTitle);
      moeProps.addAttribute('category', productDetail?.categoryTree || []);

      ReactMoE.trackEvent('AddToCart', moeProps);
    },
    [actions, packageItems],
  );

  const handleSubCount = useCallback(
    async (
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

      if(countUpdated==0)
      {
        
          const color = selectedColor?.colorName || '';
          const size = selectedSize?.size || '';
    
          const moeProps = new MoEProperties();
          moeProps.addAttribute('skuId', item.id);
          moeProps.addAttribute('name', item.productTitle || productDetail?.name);
          moeProps.addAttribute('category', productDetail?.categoryTree || []);
          moeProps.addAttribute('brand', productDetail?.categoryTree[0] || '');
          moeProps.addAttribute('price', (item.price || 0) / 100,);
          moeProps.addAttribute('quantity', countUpdated);
          moeProps.addAttribute('variant', color + '-' + size);

    
          ReactMoE.trackEvent('RemoveFromCart', moeProps);
     }
      

      await actions.UPDATE_PRODUCT_COUNT(index, item, countUpdated);
    },
    [actions, handleDeleteProductModal],
  );

  const handleNavigationToDetail = useCallback(
    ({
      productId, name, id, isPrimeSubscription,
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
    },
    [navigation],
  );

  useEffect(() => {
    onLoadItems();
  }, [packageItems]);

  return (
    <View style={{ gap: 25 }}>
      {availableList.map((item, index: number) => {
        if (item.sellingPrice !== 0 && item.isGift === false) {
          return item.isPrimeSubscription ? (
            <ProductListItemPrime
              key={`${item.productId}-${String(item.index)}`}
              data={item}
              onDelete={() => handleDeleteProductModal(item, index)}
              onPress={() => handleNavigationToDetail(item)}
            />
          ) : (
            <ProductListItem
              key={`${item.productId}-${String(item.index)}`}
              data={item}
              onAddCount={(count) => handleAddCount(count, item, index)}
              onSubCount={(count) => handleSubCount(count, item.quantity, item, index)}
              onDelete={() => handleDeleteProductModal(item, index)}
              onPress={() => handleNavigationToDetail(item)}
              onAddGift={() => handleAddProductToGift(
                item.isAddedAsGift,
                index,
                item.giftOfferingId,
              )}
            />
          );
        }

        return null;
      })}
    </View>
  );
}
