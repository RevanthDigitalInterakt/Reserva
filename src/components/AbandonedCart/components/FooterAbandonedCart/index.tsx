import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { useNavigationToDelivery } from '../../../../hooks/useNavigationToDelivery';
import EventProvider from '../../../../utils/EventProvider';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { Actions } from '../../../../utils/EventProvider/Event';
import testProps from '../../../../utils/testProps';

function FooterAbandonedCart() {
  const { profile } = useAuthStore(['profile']);
  const { handleNavigateToDelivery } = useNavigationToDelivery();

  const isLogged = useMemo(() => (profile?.email), [profile]);

  const onClickPurchase = useCallback(() => {
    try {
      EventProvider.logEvent('abandoned_cart', {
        action: Actions.click_button_finish_purchase,
        logged: isLogged ? 'logged in' : 'logged out',
      });

      handleNavigateToDelivery(profile, 'Home');
    } catch (error) {
      ExceptionProvider.captureException(error, "FooterAbandonedCart.ts");
    }
  }, [profile]);
  return (
    <TouchableOpacity
      onPress={() => onClickPurchase()}
      {...testProps('abandoned_cart_button_finish_purchase')}
    >
      <View
        style={styles.container}
        {...testProps('abandoned_cart_footer_container')}
      >
        <Text
          style={styles.textFinishPurchase}
          testID="com.usereserva:id/abandoned_cart_finish_purchase"
        >
          Finalizar compra
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default FooterAbandonedCart;
