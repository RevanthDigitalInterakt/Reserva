import React from 'react';
import { Box, Button, Typography } from '@usereservaapp/reserva-ui';
import IconComponent from '../IconComponent/IconComponent';

interface IWithoutInternet {
  onLoad?: () => void;
}

function WithoutInternet({ onLoad }: IWithoutInternet) {
  return (
    <Box
      bg="white"
      height="100%"
      alignItems="center"
      justifyContent="center"
      testID="com.usereserva:id/without_internet_container"
    >
      <Box marginRight="micro">
        <IconComponent icon="withoutInternet" />
      </Box>

      <Box mt="xxxs" mb="nano">
        <Typography fontFamily="nunitoBold" fontSize={16}>
          Sem comunicação com a Internet
        </Typography>
      </Box>

      <Box>
        <Typography fontFamily="nunitoRegular" fontSize={13}>
          Por favor, verifique a sua conexão para continuar navegando.
        </Typography>
      </Box>

      {!!onLoad && (
        <Box mt="md" width="100%">
          <Button
            onPress={onLoad}
            marginX="micro"
            inline
            title="TENTAR NOVAMENTE"
            variant="primarioEstreito"
          />
        </Box>
      )}
    </Box>
  );
}

export default WithoutInternet;
