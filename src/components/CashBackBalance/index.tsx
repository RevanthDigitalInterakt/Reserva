import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconWoodpecker from '../../../assets/icons/IconWoodpecker';
import { FONTS } from '../../base/styles';
import { useCashbackLazyQuery } from '../../base/graphql/generated';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import { PriceCustom } from '../PriceCustom/PriceCustom';
import { styles } from './styles';
import EventProvider from '../../utils/EventProvider';
import { MyCashbackScreensRoutes } from '../../modules/my-cashback/navigation/MyCashbackNavigator';

export default function CardCashback() {
  const navigation = useNavigation();
  const [balance, setBalance] = useState<number>(0);
  const { profile } = useAuthStore(['profile']);
  const [getCashback] = useCashbackLazyQuery({
    context: { clientName: 'gateway' }, fetchPolicy: 'cache-and-network',
  });
  const getCashbackData = useCallback(async () => {
    try {
      const { data } = await getCashback();

      if (!data?.cashback) return;
      const { wallet } = data.cashback;
      setBalance(wallet?.balanceInCents);
    } catch (error) {
      ExceptionProvider.captureException(error, "getCashbackData - CardCashback.tsx", { currentProfileDocument: profile?.document || "" });
    }
  }, [getCashback, profile]);

  useEffect(() => {
    if (profile?.document) {
      getCashbackData();
    }
  }, [profile?.document]);

  const handleClick = () => {
    EventProvider.logEvent('click_card_cashback', {
      value: balance,
    });
    navigation.navigate(MyCashbackScreensRoutes.MY_WALLET);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleClick}>
      <View style={styles.textsContainer}>
        <Text style={styles.title}>Saldo Cashback</Text>
        <PriceCustom
          fontFamily={FONTS.RESERVA_SANS_MEDIUM}
          sizeInteger={12}
          sizeDecimal={10}
          num={balance || 0}
          color="white"
        />
      </View>

      <IconWoodpecker />
    </TouchableOpacity>
  );
}
