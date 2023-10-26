import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { Button } from '../../../../components/Button';

interface NumberRegisteredSuccessfullyViewProps {
  navigateToCashbackInStore: () => void;
}

export function NumberRegisteredSuccessfullyView({
  navigateToCashbackInStore,
}: NumberRegisteredSuccessfullyViewProps) {
  return (
    <SafeAreaView>
      <ScrollView>
        <Box mx="xxs" mt="xxs">
          <Box mb="nano">
            <Typography
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
}
