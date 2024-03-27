import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { useNavigationToDelivery } from '../../../../hooks/useNavigationToDelivery';
import EventProvider from '../../../../utils/EventProvider';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { Actions } from '../../../../utils/EventProvider/Event';

function FooterAbandonedCart() {
  const { profile } = useAuthStore(['profile']);
  const { handleNavigateToDelivery } = useNavigationToDelivery();

  const isLogged = useMemo(() => (profile?.email), [profile?.email]);

  const onClickPurchase = useCallback(() => {
    try {
      EventProvider.logEvent('abandoned_cart', {
        action: Actions.click_button_finish_purchase,
        logged: isLogged ? 'logged in' : 'logged out',
      });
      handleNavigateToDelivery(profile);
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  }, []);
  return (
    <TouchableOpacity
      onPress={() => onClickPurchase()}
    >
      <View style={styles.container}>
        <Text style={styles.textFinishPurchase}>
          Finalizar compra
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default FooterAbandonedCart;
