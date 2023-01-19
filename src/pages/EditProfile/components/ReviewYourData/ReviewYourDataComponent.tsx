import React from 'react';
import { Box, Typography } from '@usereservaapp/reserva-ui';

function ReviewYourDataComponent(): JSX.Element {
  return (
    <>
      <Box alignSelf="flex-start" mb="xxxs">
        <Typography variant="tituloSessoes">
          Revise seus dados
        </Typography>
      </Box>

      <Box alignSelf="flex-start" mb="xxxs">
        <Typography fontFamily="reservaSerifRegular" fontSize={16}>
          Para continuar, todos os dados devem ser inseridos por
          completo.
        </Typography>
      </Box>
    </>
  );
}

export default ReviewYourDataComponent;
