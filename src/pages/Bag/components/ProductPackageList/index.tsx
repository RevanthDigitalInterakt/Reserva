import React, { useCallback, useEffect, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import type { TItemBag } from '../../../../zustand/useBagStore/types/bagStore';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { createNavigateToProductParams } from '../../../../utils/createNavigateToProductParams';
import { getBrands } from '../../../../utils/getBrands';
import ProductListItem from '../ProductListItem';
import { productPackageListStyles } from './ProductPackageList.styles';
import ProductUnavailable from '../ProductUnavailable';
import DeliveryItemInfo from '../DeliveryItemInfo';
import ProductListItemPrime from '../ProductListItem/ProductListItemPrime';
import { useTrackClickAlgoliaStore } from '../../../../zustand/useTrackAlgoliaStore/useTrackAlgoliaStore';
import { TrackEventNameEnum, TrackEventSubTypeEnum, TrackEventTypeEnum } from '../../../../base/graphql/generated';
import useSearchStore from '../../../../zustand/useSearchStore';
import { mergeItemsPackage } from '../../../../utils/mergeItemsPackage';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';

export default function BagProductPackageList() {
  const { actions, packageItems, appTotalizers } = useBagStore(['actions', 'packageItems', 'appTotalizers']);
  const { productDetail } = useProductDetailStore(['productDetail']);
  const { onTrack } = useTrackClickAlgoliaStore(['onTrack']);
  const { queryID } = useSearchStore(['queryID']);
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

  const onLoadItems = useCallback(() => {
    const productIds = packageItems[0]?.items.map(
      (payload) => payload.ean,
    ) as string[] | null | undefined;

    if (packageItems.length > 1) {
      const packages = packageItems.map((packs) => packs.items);

      const newArr = packages.map(
        (item) => item.map((i) => ({
          ean: i.ean,
        })),
      ).reduce((acc, cur) => acc.concat(cur), []);

      const eans = newArr.map((item) => item.ean) as string[];

      const items = packages.map((item) => item.map((i) => ({
        discount: i.discountPercent,
        quantity: i.quantity,
        price: i.price,
      }))).reduce((acc, curr) => acc.concat(curr), []);

      onTrack({
        typeEvent: TrackEventTypeEnum.Conversion,
        nameEvent: queryID
          ? TrackEventNameEnum.CartItemsSearch
          : TrackEventNameEnum.CartItems,
        sku: eans,
        subTypeEvent: TrackEventSubTypeEnum.AddToCart,
        dataObject: items,
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

  const handleAddCount = useCallback(async (
    countUpdated: number,
    item: TItemBag,
    index: number,
  ) => {
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
  }, [actions, packageItems]);

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

  useEffect(() => {
    onLoadItems();
  }, [packageItems]);

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
