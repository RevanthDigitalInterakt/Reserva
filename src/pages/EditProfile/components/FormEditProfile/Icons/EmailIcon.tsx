import { Box, Icon } from '@usereservaapp/reserva-ui';
import React from 'react';
import type { IDefaultIconProps } from '../interfaces/icons';

interface IEmailIconProps extends IDefaultIconProps {}
function EmailIcon({ isEmpty }: IEmailIconProps) {
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

export default EmailIcon;
