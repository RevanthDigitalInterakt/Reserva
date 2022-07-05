import React from 'react';
import { Box, Image } from '@danilomsou/reserva-ui';

interface IBanner {
  bannerImage: string;
}
export const Banner = ({ bannerImage }: IBanner) => {
  return (
    <Box>
      <Image height={200} source={bannerImage} width={1 / 1} />
    </Box>
  );
};
