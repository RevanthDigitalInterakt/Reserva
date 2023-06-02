import { useNavigation } from '@react-navigation/native';
import { Box, Button, Typography } from '@usereservaapp/reserva-ui';
import React, { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import useDitoStore from '../../../zustand/useDitoStore';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { getApolloClient } from '../../../utils/getApolloClient';

export const AccountDeletedSuccessfully = () => {
  const navigation = useNavigation();
  const { onSignOut } = useAuthStore(['onSignOut']);

  const logout = useCallback(async () => {
    try {
      getApolloClient().clearStore();
      useDitoStore.persist.clearStorage();
    } catch (err) {
      //
    } finally {
      onSignOut();
    }
  }, [onSignOut]);

  useEffect(() => {
    logout();
  }, [logout]);

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
