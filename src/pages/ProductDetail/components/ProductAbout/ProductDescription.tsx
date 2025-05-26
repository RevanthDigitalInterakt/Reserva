import React from 'react';
import testProps from '../../../../utils/testProps';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';

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
