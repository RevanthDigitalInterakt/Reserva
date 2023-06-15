import React from 'react';

import {
  Typography, Box, Button, Image,
} from '@usereservaapp/reserva-ui';

import { images } from '../../../assets';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

interface IEmptyBag {
  onPress?: () => void;
  backButtonPress: () => void;
  loading: boolean;
}

export const EmptyBag = ({ backButtonPress, onPress, loading }: IEmptyBag) => (
  <>
    <TopBarBackButton showShadow backButtonPress={backButtonPress} loading={loading} />
    <Box
      flex={1}
      alignItems="center"
      paddingTop={110}
      testID="com.usereserva:id/empty_bag"
    >
      <Image source={images.bagEmpty} height={200} width={200} autoHeight />
      <Box mx={37} mt="md">
        <Typography fontFamily="reservaSerifRegular" fontSize={24}>
          Sua sacola está vazia
        </Typography>
      </Box>
      <Box mx="md" my="sm">
        <Typography fontFamily="nunitoRegular" fontSize={14} textAlign="center">
          Navegue pelo nosso app e descubra produtos que são sua cara!
        </Typography>
      </Box>
      <Box width="100%">
        <Button
          testID="com.usereserva:id/button_going_shopping_empty_bag"
          onPress={onPress}
          marginX="md"
          inline
          title="IR ÀS COMPRAS"
          variant="primarioEstreito"
        />
      </Box>
    </Box>
  </>
);
