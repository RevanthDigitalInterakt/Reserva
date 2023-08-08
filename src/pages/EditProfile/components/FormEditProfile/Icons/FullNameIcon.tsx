import React from 'react';
import { Box, Icon } from '@usereservaapp/reserva-ui';
import type { IDefaultIconProps } from '../interfaces/icons';

interface IFullNameIconProps extends IDefaultIconProps {}

function FullNameIcon({ isEmpty }: IFullNameIconProps) {
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

export default FullNameIcon;
