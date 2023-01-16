import { Box, Icon } from '@usereservaapp/reserva-ui';
import React from 'react';
import { IDefaultIconProps } from '../interfaces/icons';

interface BirthDateIconProps extends IDefaultIconProps {}

function BirthDateIcon({ isEmpty }: BirthDateIconProps) {
  return (
    <Box ml="nano">
      {!isEmpty && (
        <Icon
          color="preto"
          name="Check"
          size={18}
          marginX="micro"
        />
      )}
    </Box>
  );
}

export default BirthDateIcon;
