import React, { useCallback, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { Button } from '@usereservaapp/reserva-ui';
import LottieView from 'lottie-react-native';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';
import { styles } from '../ProductSelectors/ProductSelectors.styles';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import { useCart } from '../../../../context/CartContext';
import EventProvider from '../../../../utils/EventProvider';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { ModalBag } from '../../../../components/ModalBag/ModalBag';
import testProps from '../../../../utils/testProps';

function ProductAddToCart() {
  const { getString } = useRemoteConfig();
  const { addItem, orderForm } = useCart();
  const {
    productDetail,
    selectedColor,
    selectedSize,
    assinaturaSimples,
  } = useProductDetailStore([
    'productDetail',
    'selectedColor',
    'selectedSize',
    'assinaturaSimples',
  ]);

  const [showAnimationBag, setShowAnimationBag] = useState(false);
  const [loading, setLoading] = useState(false);

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

      setLoading(true);

      const orderFormItem = orderForm?.items.find((items) => items.id === selectedSize.itemId);

      const addItemResponse = await addItem({
        quantity: orderFormItem ? orderFormItem.quantity + 1 : 1,
        itemId: selectedSize.itemId,
        seller: selectedSize.seller || '',
      });

      // TODO: Update to use API Gateway
      if (!addItemResponse?.ok) {
        Alert.alert('Produto sem estoque', addItemResponse?.message);
        return;
      }

      setShowAnimationBag(true);
      addTagsUponCartUpdate();
    } catch (err) {
      Sentry.captureException(err);
      Alert.alert('Ocorreu um erro', err.message);
    } finally {
      setLoading(false);
    }
  }, [addItem, addTagsUponCartUpdate, loading, orderForm?.items, selectedSize]);

  const buttonAddCartActive = useMemo(() => {
    if (!selectedSize || !productDetail) return false;

    if (selectedSize.disabled) return false;

    if (productDetail?.properties.isAssinaturaSimples && !assinaturaSimples?.accepted) {
      return false;
    }

    return true;
  }, [assinaturaSimples, productDetail, selectedSize]);

  return (
    <View>
      <ModalBag
        isVisible={showAnimationBag}
        onBackdropPress={() => setShowAnimationBag(false)}
      />

      <Button
        mt="xxs"
        title="ADICIONAR À SACOLA"
        variant="primarioEstreito"
        buttonBackgroundColor={getString('pdp_button_add_bag')}
        disabled={!buttonAddCartActive || loading}
        onPress={onAddProductToCart}
        inline
        {...testProps('com.usereserva:id/button_add_to_bag')}
      />

      {!!loading && (
        <View style={styles.containerLoading}>
          <LottieView source={loadingSpinner} style={{ width: 16, height: 16 }} autoPlay loop />
        </View>
      )}
    </View>
  );
}

export default ProductAddToCart;
