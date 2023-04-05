import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Typography, Box, Divider,
} from '@usereservaapp/reserva-ui';
import testProps from '../../../utils/testProps';

interface ItemListHelpProps {
  title: string,
  onPress?: Function,
}

const ItemList = ({
  title,
  onPress,
}: ItemListHelpProps) => (
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

export default ItemList;
