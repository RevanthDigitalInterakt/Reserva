import React, { useCallback, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import LottieView from 'lottie-react-native';
import DropShadow from 'react-native-drop-shadow';
import { loadingSpinner } from '../../../../../assets/animations';
import EventProvider from '../../../../utils/EventProvider';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { ModalBag } from '../../../../components/ModalBag/ModalBag';
import testProps from '../../../../utils/testProps';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { NewButton } from '../../../../components/NewButton';
import { NewCheckBox } from '../../../../components/NewCheckBox';
import styles from './styles';
import { mergeItemsPackage } from '../../../../utils/mergeItemsPackage';

export function GiftCardAddToCart() {
  const { actions, packageItems, orderFormId } = useBagStore(['actions', 'orderFormId', 'packageItems']);
  const {
    productDetail,
    selectedGiftCardSku,
    selectedSize,
    assinaturaSimples,
    selectedGiftCardEmail,
  } = useProductDetailStore([
    'productDetail',
    'selectedGiftCardSku',
    'selectedSize',
    'assinaturaSimples',
    'selectedGiftCardEmail',
  ]);

  const [showAnimationBag, setShowAnimationBag] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedGiftCard = useMemo(() => {
    if (!selectedGiftCardSku) return null;
    return productDetail?.giftCard?.options?.find(
      (option) => option.itemId === selectedGiftCardSku,
    );
  }, [selectedGiftCardSku, productDetail?.giftCard?.options]);

  const addTagsUponCartUpdate = useCallback(() => {
    if (!selectedGiftCard || !productDetail) return;

    const timestamp = Math.floor(Date.now() / 1000);

    EventProvider.sendPushTags('sendAbandonedCartTags', {
      cart_update: timestamp.toString(),
      product_name: selectedGiftCard?.name,
      product_image: selectedGiftCard?.images[0],
    });
  }, [selectedGiftCard, productDetail]);

  const validateForm = useCallback(() => {
    if (!selectedGiftCardEmail) return Alert.alert('Ops...', 'Por favor, informe o e-mail do presenteado');
    if (!termsAccepted) return Alert.alert('Ops...', 'Por favor, aceite os termos e condições');
    if (!selectedGiftCard) return Alert.alert('Ops...', 'Por favor, selecione um valor para o cartão');
    return true;
  }, [selectedGiftCardEmail, selectedGiftCard, termsAccepted]);

  const buttonAddCartActive = useMemo(() => {
    if (!selectedGiftCard || !productDetail || !termsAccepted || !selectedGiftCardEmail) {
      return false;
    }

    return !(productDetail?.properties.isAssinaturaSimples && !assinaturaSimples?.accepted);
  }, [assinaturaSimples, productDetail, selectedSize, termsAccepted, selectedGiftCardEmail]);

  const onAddProductToCart = useCallback(async () => {
    try {
      validateForm();
      if (!buttonAddCartActive || loading) return;

      setLoading(true);

      const mergeItems = mergeItemsPackage(packageItems);
      const orderFormItem = mergeItems.find((item) => item.id === selectedGiftCard!.itemId);

      await actions.ADD_ITEM(
        '1',
        selectedGiftCard!.itemId,
        orderFormItem ? orderFormItem.quantity + 1 : 1,
      );

      setShowAnimationBag(true);
      addTagsUponCartUpdate();
    } catch (err) {
      ExceptionProvider.captureException(err, "onAddProductToCart - GiftCardAddToCart", { orderFormId });
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
    buttonAddCartActive,
    selectedGiftCardEmail, selectedGiftCard, termsAccepted,
  ]);

  const handleTerms = useCallback(() => {
    setTermsAccepted(!termsAccepted);
  }, [termsAccepted]);

  return (
    <DropShadow style={styles.container}>
      <ModalBag
        isVisible={showAnimationBag}
        onBackdropPress={() => setShowAnimationBag(false)}
      />

      <NewCheckBox onPress={handleTerms} checked={termsAccepted} />

      <NewButton
        onPress={onAddProductToCart}
        text={loading ? '' : 'ADICIONAR À SACOLA'}
        disabled={!buttonAddCartActive}
        {...testProps('com.usereserva:id/button_add_to_bag')}
      />

      {loading && (
        <View style={styles.loader}>
          <LottieView source={loadingSpinner} style={{ width: 16, height: 16 }} autoPlay loop />
        </View>
      )}
    </DropShadow>
  );
}
