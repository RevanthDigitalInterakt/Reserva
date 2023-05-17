import React, { useCallback } from 'react';
import { Box, ProductHorizontalListCard, Typography } from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import useBagStore from '../../../../zustand/useBagStore/useBagStore';
import type { IItemsBag } from '../../../../zustand/useBagStore/types/bagStore';
import EventProvider from '../../../../utils/EventProvider';
import { MktplaceName } from '../../../../modules/MarketplaceIn/components/MktPlaceName';
import { slugify } from '../../../../utils/slugify';

const ShowFirstPurchaseDiscount = ({ discountText }: { discountText: string }) => (
  <Box paddingBottom="nano" testID="com.usereserva:id/ShowFirstPurchaseDiscount">
    <Typography
      fontFamily="nunitoRegular"
      fontSize={11}
      color="verdeSucesso"
    >
      {discountText}
    </Typography>
  </Box>
);

const ShowTotalDiscountFirstPurchase = ({ priceDiscount }: { priceDiscount: string }) => (
  <Box
    position="absolute"
    zIndex={5}
    top={84}
    right={21}
    testID="com.usereserva:id/ShowTotalDiscountFirstPurchase"
  >
    <Typography
      color="verdeSucesso"
      fontFamily="nunitoRegular"
      fontSize={11}
    >
      -R$
      {' '}
      {priceDiscount}
    </Typography>
  </Box>
);

export default function BagProductList() {
  const { currentBagItems, dispatch } = useBagStore();
  const navigation = useNavigation();

  const handleActiveTopBarLoading = useCallback(() => {
    dispatch({
      actionType: 'SET_TOP_BAR_LOADING',
      payload: {
        value: true,
      },
    });
  }, [dispatch]);

  const handleAddProductToGift = useCallback(async (
    isGift: boolean,
    index: number,
    id: string | null | undefined,
  ) => {
    if (!id) return;

    await dispatch({
      actionType: 'SET_TOP_BAR_LOADING',
      payload: {
        value: {
          topBarLoading: true,
        },
      },
    });

    if (isGift) {
      await dispatch({
        actionType: 'HANDLE_ADD_GIFT',
        payload: {
          value: {
            index,
            id,
          },
        },
      });

      return;
    }

    await dispatch({
      actionType: 'HANDLE_REMOVE_GIFT',
      payload: {
        value: {
          index,
          id,
        },
      },
    });
  }, [dispatch]);

  const handleDeleteProductModal = useCallback((product: IItemsBag, index: number) => {
    handleActiveTopBarLoading();

    dispatch({
      actionType: 'HANDLE_ACTIVE_MODAL_DELETE_PRODUCT',
      payload: {
        value: {
          show: true,
          product,
          index,
        },
      },
    });
  }, [dispatch, handleActiveTopBarLoading]);

  const handleAddCount = useCallback(
    async (countUpdated: number, item: IItemsBag, index: number) => {
      await handleActiveTopBarLoading();

      await dispatch({
        actionType: 'HANDLE_UPDATE_PRODUCT_COUNT',
        payload: {
          value: {
            index,
            item,
            countUpdated,
          },
        },
      });
    }, [dispatch, handleActiveTopBarLoading],
  );

  const handleSubCount = useCallback(
    async (countUpdated: number, oldCountValue: number, item: IItemsBag, index: number) => {
      if (oldCountValue <= 1) {
        await handleDeleteProductModal(item, index);
        return;
      }

      EventProvider.logEvent('remove_from_cart', {
        item_id: item.id,
        item_categories: 'product',
      });

      await dispatch({
        actionType: 'HANDLE_UPDATE_PRODUCT_COUNT',
        payload: {
          value: { index, item, countUpdated },
        },
      });
    }, [dispatch, handleDeleteProductModal],
  );

  const handleNavigationToDatail = useCallback(({
    productId, name, skuName, id,
  }: IItemsBag) => {
    EventProvider.logEvent('select_item', {
      item_list_id: productId,
      item_list_name: name,
    });

    navigation.navigate('ProductDetail', {
      productId,
      itemId: id,
      sizeSelected: skuName?.split('-')[1] || '',
    });
  }, [EventProvider, navigation]);

  return (
    <>
      {currentBagItems.map((item, index: number) => {
        if (item.sellingPrice !== 0 && item.isGift === false) {
          return (
            <Box key={item.key} bg="white" marginTop="xxxs" testID="com.usereserva:id/BagProductList">
              {!!item.showFirstPurchaseDiscountMessage && (
                <ShowFirstPurchaseDiscount discountText={item.showFirstPurchaseDiscountMessage} />
              )}

              {!!item.showTotalDiscountFirstPurchaseValue && (
                <ShowTotalDiscountFirstPurchase
                  priceDiscount={item.showFirstPurchaseDiscountMessage || ''}
                />
              )}

              <ProductHorizontalListCard
                isBag
                mktplaceNameComponent={
                  <MktplaceName sellerId={item.seller} showIconModalInfo />
                }
                installmentsNumber={0}
                installmentsPrice={0}
                discountApi={item.discountApi || 0}
                disableCounter={item.disableCounter}
                currency="R$"
                discountTag={item.discountPercent > 0 ? item.discountPercent : undefined}
                itemColor={item.itemColor}
                ItemSize={item.itemSize}
                productTitle={item.productTitle}
                price={item.listPrice / 100}
                priceWithDiscount={item.priceWithDiscount}
                count={item.quantity}
                testID={`product_card_bag_${slugify(item.productId + item.skuName)}`}
                isGift={item.isAddedAsGift}
                isGiftable={item.isGiftable}
                handleToggleGift={
                  (isGift) => handleAddProductToGift(isGift, index, item.giftOfferingId)
                }
                onClickAddCount={(count) => handleAddCount(count, item, index)}
                onClickSubCount={(count) => handleSubCount(count, item.quantity, item, index)}
                onClickClose={() => handleDeleteProductModal(item, index)}
                imageSource={item.imageSource}
                handleNavigateToProductDetail={() => handleNavigationToDatail(item)}
              />
            </Box>
          );
        }
        return null;
      })}
    </>
  );
}
