import React from 'react';
import {
  Typography, Box, Button, Image,
} from '@usereservaapp/reserva-ui';
import { ScrollView } from 'react-native';
import { images } from '../../../../assets';
import testProps from '../../../../utils/testProps';

interface IEmptyBag {
  onPress?: () => void;
}

export const EmptyProductCatalog = ({ onPress }: IEmptyBag) => (
  <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    {...testProps('com.usereserva:id/empty_catalog_container')}
  >
    <Box flex={1} alignItems="center" paddingTop={140} paddingX={25}>
      <Image source={images.emptyProductCatalog} />
      <Box mx={37} mt="xxxs">
        <Typography fontFamily="reservaSerifBlack" fontSize={44}>
          OOPS!
        </Typography>
      </Box>
      <Box mx={10} mt={3}>
        <Typography fontFamily="nunitoBold" fontSize={15} textAlign="center">
          O item que você está procurando já sumiu.
        </Typography>
      </Box>
      <Box mx={10}>
        <Typography fontFamily="nunitoRegular" fontSize={15} textAlign="center">
          Mas há um infinito de outras peças pra você encontrar por aqui.
        </Typography>
      </Box>
    </Box>

    <Box
      paddingX={25}
      width="100%"
      flex={1}
      paddingTop={10}
      paddingBottom={40}
      justifyContent="flex-end"
    >
      <Button
        testID="com.usereserva:id/button_back_to_home_empty_product_catalog"
        onPress={onPress}
        inline
        title="VOLTAR PARA HOME"
        variant="primarioEstreito"
      />
    </Box>
  </ScrollView>
);
