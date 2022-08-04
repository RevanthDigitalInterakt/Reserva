import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Box, Button, Typography } from '@danilomsou/reserva-ui';

interface NumberRegisteredSuccessfullyViewProps {
  navigateToCashbackInStore: () => void;
}

export const NumberRegisteredSuccessfullyView = ({
  navigateToCashbackInStore,
}: NumberRegisteredSuccessfullyViewProps) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Box mx="xxs" mt="xxs">
          <Box mb="nano">
            <Typography
              style={{ lineHeight: 28 }}
              fontFamily="reservaSerifMedium"
              fontSize={28}
            >
              Obrigado!
            </Typography>
          </Box>

          <Box mb="xxs" mr={22}>
            <Typography
              fontFamily="nunitoRegular"
              fontSize={14}
              style={{ lineHeight: 19 }}
            >
              Seu número foi confirmado com sucesso. Aproveite o benefício!
            </Typography>
          </Box>

          <Button
            onPress={navigateToCashbackInStore}
            height={50}
            inline
            bg="verdeSucesso"
          >
            <Typography
              color="white"
              fontFamily="nunitoSemiBold"
              fontSize={13}
              style={{ lineHeight: 24, letterSpacing: 1.6 }}
            >
              CONTINUAR
            </Typography>
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
