import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Box } from '../../../../components/Box/Box';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import testProps from '../../../../utils/testProps';

interface IFixedMenuItem {
  iconName: string;
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  testID: string;
}

function FixedMenuItem({
  iconName,
  title,
  onPress,
  disabled,
  testID,
}: IFixedMenuItem) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      {...testProps(testID)}
    >
      <Box
        justifyContent="flex-start"
        alignItems="center"
        marginY="micro"
        flexDirection="row"
        marginX="xxxs"
      >
        <IconLegacy name={iconName} color="preto" size={18} />

        <Box marginX="micro">
          <Typography
            alignSelf="flex-end"
            color="preto"
            fontSize={15}
            fontFamily="nunitoBold"
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

FixedMenuItem.defaultProps = {
  onPress: () => {},
  disabled: false,
};

export default FixedMenuItem;
