import React from 'react';
import type { IDefaultIconProps } from '../interfaces/icons';

import { Box } from '../../../../../components/Box/Box';
import { IconLegacy } from '../../../../../components/IconLegacy/IconLegacy';

interface IEmailIconProps extends IDefaultIconProps {}
function EmailIcon({ isEmpty }: IEmailIconProps) {
  return (
    <Box ml="nano">
      {!isEmpty && (
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

export default EmailIcon;
