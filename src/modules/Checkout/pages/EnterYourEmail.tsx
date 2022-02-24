import React, { useCallback, useEffect } from 'react';
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
  const [validateFieldEmail, setValidateFieldEmail] = useState(true);
  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const hasEmail = useCallback((): boolean => {
    return email.length > 0;
  }, [email]);

  const onCheckCustomerMail = async () => {
    setLoading(true);
    validateEmail(email);
    if (isCheckEmail) {
      if (
        email === orderForm?.clientProfileData?.email &&
        orderForm?.clientProfileData?.firstName &&
        orderForm?.clientProfileData?.lastName
      ) {
        console.log('EMIAL>>>>>>>>>>>>>', email);
        await identifyCustomer(email);
        navigation.navigate('DeliveryScreen');
      } else {
        const hasCustomer = await identifyCustomer(email);

        setLoading(false);
        if (!hasCustomer) {
          navigation.navigate('CreateCartProfile');
          return;
        }
        navigation.navigate('DeliveryScreen');
      }
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (email) {
      validateEmail(email);
    }
  }, [email]);

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!hasEmail || !re.test(email)) {
      setValidateFieldEmail(false);
      setIsCheckEmail(false);
    } else {
      setValidateFieldEmail(true);
      setIsCheckEmail(true);
    }
  };

  return (
    <SafeAreaView flex={1} backgroundColor={'white'}>
      <TopBarBackButton
        showShadow
        loading={loading}
        backButtonPress={() => navigation.goBack()}
      />
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
              onChangeText={(text) => {
                setEmail(text), validateEmail(email);
              }}
              placeholder={'Digite seu e-mail'}
              touched={!validateFieldEmail}
              error="Verifique o e-mail digitado."
            />
          </Box>
          <Button
            onPress={onCheckCustomerMail}
            title="CONTINUAR"
            variant="primarioEstreito"
            inline
            marginX="xxl"
            disabled={loading || !validateFieldEmail}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
