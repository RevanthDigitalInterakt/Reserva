import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LottieView from 'lottie-react-native';

import styles from './styles';
import { Box } from '../../../../../../components/Box/Box';
import { PriceCustom } from '../../../../../../modules/Checkout/components/PriceCustom';

import { useBagStore } from '../../../../../../zustand/useBagStore/useBagStore';
import { useProductDetailStore } from '../../../../../../zustand/useProductDetail/useProductDetail';
import { ExceptionProvider } from '../../../../../../base/providers/ExceptionProvider';
import { loadingSpinner } from '../../../../../../../assets/animations';
import { ModalBag } from '../../../../../../components/ModalBag/ModalBag';

export default function KitLookFooter() {
  const [btnDisabled, setBtnDisabled] = useState<boolean>();
  const [showAnimationBag, setShowAnimationBag] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { itemsTotalizer, selectedKitItems } = useProductDetailStore(['itemsTotalizer', 'selectedKitItems']);
  const {
    actions,
    orderFormId,
    installmentInfo,
  } = useBagStore(['actions', 'orderFormId', 'installmentInfo']);

  const onAddProductToCart = useCallback(async () => {
    try {
      if (!selectedKitItems || loading) return;

      setLoading(true);

      await actions.ADD_MULTIPLE_ITEMS(selectedKitItems);

      await actions.REFETCH_ORDER_FORM();

      setShowAnimationBag(true);
    } catch (err) {
      ExceptionProvider.captureException(err, "onAddProductToCart - ProductKitLookSummary");
      Alert.alert('Ocorreu um erro', err.message);
    } finally {
      setLoading(false);
      setIsClick(true);
    }
  }, [
    actions,
    loading,
    orderFormId,
    selectedKitItems,
  ]);

  const disabledBtn = useCallback(() => {
    setBtnDisabled(selectedKitItems?.orderItems.length === 0);
  }, [selectedKitItems]);

  useEffect(() => {
    disabledBtn();
  }, [selectedKitItems]);

  return (
    <View
      style={styles.mainContainer}
    >
      <ModalBag
        isVisible={showAnimationBag}
        onBackdropPress={() => setShowAnimationBag(false)}
      />

      <View
        style={styles.boxBody}
      >
        <View>
          <Text style={styles.textFinalValue}>
            Valor Final:
          </Text>

          <PriceCustom
            fontFamily="nunitoBold"
            sizeInterger={18}
            sizeDecimal={11}
            num={itemsTotalizer}
            color="verdeSucesso"
          />
        </View>

        {isClick && (
          <Box alignItems="flex-end">
            <Text style={styles.textLabelInstallments}>
              em até
            </Text>
            <Box flexDirection="row">
              {installmentInfo.installmentsNumber > 1 && (
                <Text style={styles.textInstallments}>
                  {installmentInfo.installmentsNumber}
                  x de
                  {' '}
                </Text>
              )}

              <PriceCustom
                fontFamily="reservaSansBold"
                color="preto"
                sizeInterger={14}
                sizeDecimal={11}
                num={installmentInfo.installmentPrice}
              />
            </Box>
          </Box>
        )}
      </View>

      <TouchableOpacity
        disabled={btnDisabled || loading}
        testID="com.usereserva:id/bag_button_go_to_delivery"
        onPress={() => onAddProductToCart()}
        style={
          btnDisabled || loading
            ? styles.btnTouchAddToBagDisabled
            : styles.btnTouchAddToBag
        }
      >
        <Text
          style={styles.btnTextAddToBag}
        >
          Adicionar à sacola
        </Text>
      </TouchableOpacity>

      {!!loading && (
        <View style={styles.containerLoading}>
          <LottieView source={loadingSpinner} style={{ width: 16, height: 16 }} autoPlay loop />
        </View>
      )}
    </View>
  );
}
