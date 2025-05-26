import React from 'react';
import { Box } from '../../components/Box/Box';
import { Typography } from '../../components/Typography/Typography';
import { Skeleton } from '../../modules/Checkout/components/Skeleton';

export default function () {
  return (
    <Box flex={1}>
      <Box paddingX="xxxs" paddingTop="md" mb="xs">
        <Typography variant="tituloSessoes">Favoritos</Typography>
      </Box>
      <Skeleton>
        {[0, 1, 2, 3, 4].map((key: number) => (
          <Box key={key} flexDirection="row" ml="xxs" mb="xxs">
            <Box width={96} height={146} bg="neutroFrio2" />
            <Box marginLeft="xxxs">
              <Box width={180} height={25} bg="neutroFrio2" />
              <Box width={127} height={25} bg="neutroFrio2" mt="nano" />
              <Box width={102} height={25} bg="neutroFrio2" mt="nano" />
              <Box width={180} height={32} bg="neutroFrio2" mt="xxs" />
            </Box>
          </Box>
        ))}
      </Skeleton>
    </Box>
  );
}
