import React from 'react';
import { Box, Typography } from '@usereservaapp/reserva-ui';
import testProps from '../../../../utils/testProps';

interface IProductDescription {
  title: string;
  description: string;
  testID: string;
}

function ProductDescription({ title, description, testID }: IProductDescription) {
  return (
    <Box {...testProps(testID)}>
      <Box mt="xxs">
        <Typography fontFamily="nunitoBold" fontSize={15}>{title}</Typography>

        <Box mt="nano">
          <Typography fontFamily="nunitoRegular" fontSize={13}>{description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDescription;
