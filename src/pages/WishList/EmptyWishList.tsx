import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Button, Typography } from '@usereservaapp/reserva-ui';
import IconComponent from '../../components/IconComponent/IconComponent';

export const EmptyWishList = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Box flex={1} alignItems="center" paddingTop={110}>
        <IconComponent icon="noWishList" />
        <Box mx={37} mt="md">
          <Typography fontFamily="reservaSerifRegular" fontSize={24}>
            Você ainda não tem favoritos :(
          </Typography>
        </Box>
        <Box mx={58} my={28}>
          <Typography
            fontFamily="nunitoRegular"
            fontSize={14}
            textAlign="center"
          >
            Navegue pelo nosso app e favorite produtos que são a sua cara!
          </Typography>
        </Box>
        <Button
          title="NAVEGAR"
          variant="primarioEstreito"
          width={258}
          onPress={() => navigation.navigate('Home')}
        />
      </Box>
    </ScrollView>
  );
};
