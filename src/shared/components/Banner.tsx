import React from 'react';
import { Box, Image } from '@usereservaapp/reserva-ui';

interface IBanner {
  bannerImage: string;
}
export const Banner = ({ bannerImage }: IBanner) => (
  <Box>
    <Image height={200} source={bannerImage} width={1 / 1} />
  </Box>
);
