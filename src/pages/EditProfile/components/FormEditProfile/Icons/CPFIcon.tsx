import React from 'react';
import type { IDefaultIconProps } from '../interfaces/icons';

import { Box } from '../../../../../components/Box/Box';
import { IconLegacy } from '../../../../../components/IconLegacy/IconLegacy';

interface ICPFIconProps extends IDefaultIconProps {
  isValid: boolean
}

function CPFIcon({ isValid, isEmpty }: ICPFIconProps) {
  return (
    <Box ml="nano">
      {isValid && !isEmpty && (
        <IconLegacy
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
