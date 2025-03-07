import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography/Typography';
import { getApolloClient } from '../../../utils/getApolloClient';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

export function AccountDeletedSuccessfully() {
  const navigation = useNavigation();
  const { onSignOut } = useAuthStore(['onSignOut']);

  const logout = useCallback(async () => {
    try {
      getApolloClient().clearStore();
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
}
