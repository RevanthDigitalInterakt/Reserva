import React from 'react';

import { Box } from '../../../../components/Box/Box';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import { Typography } from '../../../../components/Typography/Typography';
import configDeviceSizes from '../../../../utils/configDeviceSizes';

function ProductNotFound() {
  return (
    <Box
      bg="white"
      height={configDeviceSizes.DEVICE_HEIGHT}
      mt="xxl"
      alignItems="center"
      px="micro"
    >
      <Box mb="sm">
        <IconComponent width={120} height={120} icon="searchNotFound" />
      </Box>
      <Box>
        <Typography fontFamily="nunitoRegular" fontSize={13} textAlign="center">
          Não encontramos produtos que corresponde a sua busca.
        </Typography>
      </Box>
    </Box>
  );
}

export default ProductNotFound;
