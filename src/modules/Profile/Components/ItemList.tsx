import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { Box } from '../../../components/Box/Box';
import { Divider } from '../../../components/Divider/Divider';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../components/Typography/Typography';
import { slugify } from '../../../utils/slugify';
import testProps from '../../../utils/testProps';

interface ItemListProps {
  title: string;
  descr: string;
  onPress?: () => void;
  icon: string;
  arrowDown?: boolean;
  dropdownActive?: boolean;
}

function ItemList({
  onPress, icon, title, descr, arrowDown, dropdownActive,
}: ItemListProps) {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        {...testProps(`com.usereserva:id/generic_button_${slugify(title)}`)}
      >
        <Box mb="micro" mt="micro" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Box flexDirection="row" alignItems="center">
            <Box pr="micro" justifyContent="flex-start">
              {icon !== undefined && <IconLegacy name={icon} size={20} />}
            </Box>

            <Box>
              <Typography fontSize={14} fontFamily="nunitoBold">
                {title}
              </Typography>
              <Typography fontSize={14} fontFamily="nunitoRegular">
                {descr}
              </Typography>
            </Box>
          </Box>
          <Box alignItems="center" justifyContent="center">
            {arrowDown && (
            <Box alignItems="center" justifyContent="center">
              <IconLegacy name={dropdownActive ? 'ArrowUp' : 'ArrowDown'} color="vermelhoAlerta" size={18} />
            </Box>
            )}
          </Box>
        </Box>
      </TouchableOpacity>
      <Divider variant="fullWidth" />
    </>
  );
}

export default ItemList;
