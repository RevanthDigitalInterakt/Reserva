import { Box, Icon } from '@usereservaapp/reserva-ui';
import React from 'react';
import type { IDefaultIconProps } from '../interfaces/icons';

interface ICPFIconProps extends IDefaultIconProps {
  isValid: boolean
}

function CPFIcon({ isValid, isEmpty }: ICPFIconProps) {
  return (
    <Box ml="nano">
      {isValid && !isEmpty && (
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

export default CPFIcon;
