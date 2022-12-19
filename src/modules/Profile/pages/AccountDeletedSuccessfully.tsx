import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

import { Box, Typography, Button } from '@usereservaapp/reserva-ui';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useAuth } from '../../../context/AuthContext';
import OneSignal from "react-native-onesignal";

export const AccountDeletedSuccessfully = () => {
  const navigation = useNavigation();
  const { setCookie, setEmail } = useAuth();

  const logout = () => {
    AsyncStorage.removeItem('@RNAuth:cookie');
    AsyncStorage.removeItem('@RNAuth:email');
    AsyncStorage.removeItem('@RNAuth:typeLogin');
    AsyncStorage.removeItem('@RNAuth:lastLogin');
    OneSignal.removeExternalUserId();
    setCookie(null);
    setEmail(null);
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <TopBarBackButton
        loading={false}
        backButtonPress={() => {
          navigation.navigate('Home');
        }}
      />
      <Box paddingTop={20} paddingX={20} bg="white" flex={1}>
        <Box mb={14} bg="white" mr="40%">
          <Typography fontFamily="reservaSerifRegular" fontSize={22}>
            Esse processo pode levar até 24 horas.
          </Typography>
        </Box>

        <Box mr="30%">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
            Sentimos muito por ver você partir. Esperamos ver você em breve.
          </Typography>
        </Box>
      </Box>

      <Box paddingX={20} mb={24}>
        <Button
          variant="primarioEstreitoOutline"
          width="100%"
          height={50}
          onPress={() => {
            navigation.navigate('Home');
            // logout();
          }}
        >
          <Typography
            letterSpacing={2}
            color="preto"
            fontFamily="nunitoRegular"
            fontSize={13}
          >
            VOLTAR PARA HOME
          </Typography>
        </Button>
      </Box>
    </SafeAreaView>
  );
};
