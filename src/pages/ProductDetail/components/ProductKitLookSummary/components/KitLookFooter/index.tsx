import { Platform, Text } from 'react-native';
import React from 'react';

import styles from './styles';
import { Box } from '../../../../../../components/Box/Box';
import { platformType } from '../../../../../../utils/platformType';
import { PriceCustom } from '../../../../../../modules/Checkout/components/PriceCustom';
import { Button } from '../../../../../../components/Button';
import { useBagStore } from '../../../../../../zustand/useBagStore/useBagStore';
import { useNavigationToDelivery } from '../../../../../../hooks/useNavigationToDelivery';
import { useAuthStore } from '../../../../../../zustand/useAuth/useAuthStore';

export default function KitLookFooter() {
  const {
    items,
    appTotalizers,
    installmentInfo,
  } = useBagStore([
    'appTotalizers',
    'topBarLoading',
    'installmentInfo',
    'items',
  ]);

  const { profile } = useAuthStore(['profile']);

  const {
    handleNavigateToDelivery,
    navigateToDeliveryDisable,
  } = useNavigationToDelivery();

  // if (!items?.length) {
  //   return null;
  // }

  return (
    <Box
      width="100%"
      bg="white"
      height={125}
      px="xxs"
      style={{ elevation: Platform.OS === platformType.ANDROID ? 5 : 0 }}
      boxShadow={Platform.OS === platformType.ANDROID ? null : 'bottomBarShadow'}
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        py="xxs"
      >
        <Box>
          <Text style={styles.textFinalValue}>
            Valor Final:
          </Text>

          <PriceCustom
            fontFamily="nunitoBold"
            sizeInterger={18}
            sizeDecimal={11}
            num={appTotalizers.total}
            color="verdeSucesso"
          />
        </Box>

        {/* {installmentInfo.totalPrice > 0 && appTotalizers.total > 0 && ( */}
        <Box alignItems="flex-end">
          <Text style={styles.textLabelInstallments}>
            em até
          </Text>
          <Box flexDirection="row">
            <Text style={styles.textInstallments}>
              {installmentInfo.installmentsNumber}
              x de
              {' '}
            </Text>

            <PriceCustom
              fontFamily="reservaSansBold"
              color="preto"
              sizeInterger={14}
              sizeDecimal={11}
              num={installmentInfo.installmentPrice}
            />
          </Box>
        </Box>
        {/* )} */}
      </Box>

      <Button
        disabled={(
          items.length === 0 || navigateToDeliveryDisable
        )}
        onPress={() => handleNavigateToDelivery(profile)}
        title="ADICIONAR À SACOLA"
        variant="primarioMaiorConfirmacao"
        inline
        testID="com.usereserva:id/bag_button_go_to_delivery"
      />
    </Box>
  );
}
