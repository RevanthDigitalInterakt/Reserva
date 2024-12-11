import React, { useCallback, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../ProductSelectors/ProductSelectors.styles';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
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
import useSearchStore from '../../../../zustand/useSearchStore';

function ProductAddToCart({ isFixed = false, fvcReferenceId }: ProductAddToCartProps) {
  const { getString, getBoolean } = useRemoteConfig();
  const { navigate } = useNavigation();
  const { onTrack } = useTrackClickAlgoliaStore(['onTrack']);
  const { queryID } = useSearchStore(['queryID']);
  const {
    actions, packageItems, orderFormId, appTotalizers,
  } = useBagStore(['actions', 'orderFormId', 'packageItems', 'appTotalizers']);
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
    if (fvcReferenceId) {
      navigate('FacaVc', { type: fvcReferenceId });
      return;
    }

    try {
      if (!selectedSize || loading) return;

      if (!sizeIsSelected && addToBagButtonIsFixed) {
        setDrawerIsOpen(true);
        return;
      }

      setLoading(true);

      const mergeItems = mergeItemsPackage(packageItems);

      const orderFormItem = mergeItems.find((item) => item.id === selectedSize.itemId);

      onTrack({
        typeEvent: TrackEventTypeEnum.Conversion,
        nameEvent: queryID
          ? TrackEventNameEnum.CartItemsSearch
          : TrackEventNameEnum.CartItems,
        sku: [orderFormItem?.ean || ''],
        subTypeEvent: TrackEventSubTypeEnum.AddToCart,
        dataObject: [
          {
            discount: orderFormItem?.discountPercent || 0,
            price: orderFormItem?.price || 0,
            quantity: orderFormItem?.quantity || 0,
          },
        ],
        totalPrice: appTotalizers.total,
        queryID,
      });

      await actions.ADD_ITEM(
        selectedSize.seller,
        selectedSize.itemId,
        orderFormItem ? orderFormItem.quantity + 1 : 1,
      );

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
    selectedSize,
    setDrawerIsOpen,
    sizeIsSelected,
    fvcReferenceId,
  ]);

  const buttonAddCartActive = useMemo(() => {
    if (fvcReferenceId) return true;

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
        title={fvcReferenceId ? 'PERSONALIZE DO SEU JEITO' : 'ADICIONAR À SACOLA'}
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
