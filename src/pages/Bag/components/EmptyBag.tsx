import React from 'react';

import { TopBarBackButton } from '../../../modules/Menu/components/TopBarBackButton';
import testProps from '../../../utils/testProps';
import IconComponent from '../../../components/IconComponent/IconComponent';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';

interface IEmptyBag {
  onPress?: () => void;
  backButtonPress: () => void;
  loading: boolean;
}

export function EmptyBag({ backButtonPress, onPress, loading }: IEmptyBag) {
  return (
    <>
      <TopBarBackButton showShadow backButtonPress={backButtonPress} loading={loading} />

      <Box
        flex={1}
        alignItems="center"
        paddingTop={70}
        testID="com.usereserva:id/empty_bag"
      >
        <IconComponent
          icon="bagEmpty"
          height={200}
          width={200}
        />

        <Box mx={37} mt="md">
          <Typography fontFamily="reservaSerifRegular" fontSize={24} {...testProps('com.usereserva:id/sacola_vazia')}>
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
}
