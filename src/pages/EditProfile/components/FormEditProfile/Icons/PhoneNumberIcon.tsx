import { Box, Icon } from '@usereservaapp/reserva-ui';
import React from 'react';
import type { IDefaultIconProps } from '../interfaces/icons';

interface IPhoneNumberProps extends IDefaultIconProps {}

function PhoneNumberIcon({ isEmpty }: IPhoneNumberProps) {
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

export default PhoneNumberIcon;
