import React, { useCallback, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from '../ProductSelectors/ProductSelectors.styles';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import { useCart } from '../../../../context/CartContext';
import EventProvider from '../../../../utils/EventProvider';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { ModalBag } from '../../../../components/ModalBag/ModalBag';
import testProps from '../../../../utils/testProps';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import { Button } from '../../../../components/Button';
import { loadingSpinner } from '../../../../../assets/animations';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import type { ProductAddToCartProps } from './types';
import { mergeItemsPackage } from '../../../../utils/mergeItemsPackage';
import OneP5P from '../../../../components/OneP5P/OneP5P';
import { useTrackClickAlgoliaStore } from '../../../../zustand/useTrackAlgoliaStore/useTrackAlgoliaStore';
import { TrackEventNameEnum, TrackEventSubTypeEnum, TrackEventTypeEnum } from '../../../../base/graphql/generated';

function ProductAddToCart({ isFixed = false }: ProductAddToCartProps) {
  const { getString, getBoolean } = useRemoteConfig();
  const { restoreCart } = useCart();
  const { onTrack } = useTrackClickAlgoliaStore(['onTrack']);
  const { actions, packageItems, orderFormId } = useBagStore(['actions', 'orderFormId', 'packageItems']);
  const {
    productDetail,
    selectedColor,
    selectedSize,
    assinaturaSimples,
    setDrawerIsOpen,
    sizeIsSelected,
  } = useProductDetailStore([
    'productDetail',
    'selectedColor',
    'selectedSize',
    'assinaturaSimples',
    'sizeIsSelected',
    'setDrawerIsOpen',
  ]);

  const [showAnimationBag, setShowAnimationBag] = useState(false);
  const [loading, setLoading] = useState(false);
  const showOnep5p = useMemo(() => getBoolean('show_onep5p_pdp'), []);
  const addToBagButtonIsFixed = useMemo(() => getBoolean('add_to_bag_button_is_fixed'), []);

  const addTagsUponCartUpdate = useCallback(() => {
    if (!selectedColor || !productDetail) return;

    const timestamp = Math.floor(Date.now() / 1000);

    EventProvider.sendPushTags('sendAbandonedCartTags', {
      cart_update: timestamp.toString(),
      product_name: productDetail.productName,
      product_image: selectedColor.images[0],
    });
  }, [selectedColor, productDetail]);

  const onAddProductToCart = useCallback(async () => {
    try {
      if (!selectedSize || loading) return;

      if (!sizeIsSelected && addToBagButtonIsFixed) {
        setDrawerIsOpen(true);
        return;
      }

      setLoading(true);

      const mergeItems = mergeItemsPackage(packageItems);

      const orderFormItem = mergeItems.find((item) => item.id === selectedSize.itemId);

      onTrack(
        TrackEventTypeEnum.Conversion,
        TrackEventNameEnum.CartItems,
        [orderFormItem?.id || ''],
        TrackEventSubTypeEnum.AddToCart,
        [
          {
            discount: orderFormItem?.discountPercent || 0,
            price: orderFormItem?.price || 0,
            quantity: orderFormItem?.quantity || 0,
          },
        ],
      );

      await actions.ADD_ITEM(
        selectedSize.seller,
        selectedSize.itemId,
        orderFormItem ? orderFormItem.quantity + 1 : 1,
      );

      await restoreCart(orderFormId);

      setShowAnimationBag(true);
      addTagsUponCartUpdate();
      setDrawerIsOpen(false);
    } catch (err) {
      ExceptionProvider.captureException(err, { orderFormId });
      Alert.alert('Ocorreu um erro', err.message);

      actions.CREATE_NEW_ORDER_FORM();
    } finally {
      setLoading(false);
    }
  }, [
    actions,
    addTagsUponCartUpdate,
    loading,
    packageItems,
    orderFormId,
    restoreCart,
    selectedSize,
    setDrawerIsOpen,
    sizeIsSelected,
  ]);

  const buttonAddCartActive = useMemo(() => {
    if (!selectedSize || !productDetail) return false;

    if (selectedSize.disabled) return false;

    if (productDetail?.properties.isAssinaturaSimples && !assinaturaSimples?.accepted) {
      return false;
    }

    return true;
  }, [assinaturaSimples, productDetail, selectedSize]);

  return (
    <View
      style={isFixed && styles.fixedWrapper}
    >
      <ModalBag
        isVisible={showAnimationBag}
        onBackdropPress={() => setShowAnimationBag(false)}
      />

      <Button
        height={70}
        title="ADICIONAR À SACOLA"
        variant="primarioEstreito"
        buttonBackgroundColor={getString('pdp_button_add_bag')}
        disabled={!buttonAddCartActive || loading}
        onPress={onAddProductToCart}
        inline
        {...testProps('com.usereserva:id/button_add_to_bag')}
      />
      {showOnep5p && !addToBagButtonIsFixed && (<OneP5P comingFrom="PDP" />)}

      {!!loading && (
        <View style={styles.containerLoading}>
          <LottieView source={loadingSpinner} style={{ width: 16, height: 16 }} autoPlay loop />
        </View>
      )}
    </View>
  );
}

export default ProductAddToCart;
