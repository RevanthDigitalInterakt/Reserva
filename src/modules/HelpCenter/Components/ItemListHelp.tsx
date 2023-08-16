import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import testProps from '../../../utils/testProps';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Divider } from '../../../components/Divider/Divider';

interface ItemListHelpProps {
  title: string,
  onPress?: Function,
}

function ItemList({
  title,
  onPress,
}: ItemListHelpProps) {
  return (
    <>
      <TouchableOpacity
        {...testProps('com.usereserva:id/item_list_help_center')}
        onPress={onPress}
      >
        <Box mb="xxs" mt="xxs" flexDirection="row">
          <Box>
            <Typography fontSize={14} fontFamily="nunitoBold">{title}</Typography>
          </Box>
        </Box>
      </TouchableOpacity>
      <Divider variant="fullWidth" />
    </>
  );
}

export default ItemList;
