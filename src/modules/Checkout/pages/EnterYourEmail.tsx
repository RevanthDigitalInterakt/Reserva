import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Typography, Box, Button, Divider, TextField } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useNavigation } from '@react-navigation/native';
import { IdentifyCustomer } from '../../../services/vtexService';
import { useCart } from '../../../context/CartContext';
import { useState } from 'react';
import { RootStackParamList } from '../../../routes/StackNavigator';

export const EnterYourEmail = () => {
  const navigation = useNavigation();
  const { orderForm, identifyCustomer } = useCart();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const hasEmail = useCallback((): boolean => {
    return email.length > 0;
  }, [email]);

  const onCheckCustomerMail = async () => {
    setLoading(true);
    const hasCustomer = await identifyCustomer(email);

    setLoading(false);
    if (!hasCustomer) {
      navigation.navigate('CreateCartProfile');
      return;
    }

    navigation.navigate('DeliveryScreen');
  };

  return (
    <SafeAreaView flex={1} backgroundColor={'white'}>
      <TopBarBackButton showShadow loading={loading} />
      <ScrollView>
        <Box paddingX={'xxxs'} paddingY={'sm'}>
          <Box>
            <Typography variant={'subtituloSessoes'}>
              Informe seu e-mail para continuar:
            </Typography>
          </Box>
          <Box marginY="xs">
            <TextField
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder={'Digite seu e-mail'}
            />
          </Box>
          <Button
            onPress={onCheckCustomerMail}
            title="CONTINUAR"
            variant="primarioEstreito"
            inline
            marginX="xxl"
            disabled={loading}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
