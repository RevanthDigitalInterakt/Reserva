import * as React from 'react';
import {
  Box, Divider, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import testProps from '../../../../utils/testProps';
import { slugify } from '../../../../utils/slugify';
import type { MenuCategoryOutput, MenuCategoryItemOutput } from '../../../../base/graphql/generated';
import MenuSubItem from '../MenuSubItem';

interface IMenuItem {
  data: MenuCategoryOutput;
  opened: boolean;
  onPress: (data: Omit<MenuCategoryItemOutput, '__typename'>) => void;
}

function MenuItem({ data, opened, onPress }: IMenuItem) {
  return (
    <Box>
      <TouchableOpacity
        onPress={() => onPress(data)}
        {...testProps(`com.usereserva:id/menu_button_${slugify(data.name)}`)}
      >
        <Box
          justifyContent="space-between"
          marginY="micro"
          flexDirection="row"
          marginX="xxxs"
        >
          <Typography
            color={data.highlight ? 'vermelhoAlerta' : 'preto'}
            fontSize={13}
            fontFamily="nunitoBold"
          >
            {data.name.toUpperCase()}
          </Typography>

          <Box>
            <Icon
              style={{ transform: [{ rotate: opened ? '90deg' : '0deg' }] }}
              name="ChevronRight"
              color="preto"
              size={12}
            />
          </Box>
        </Box>
      </TouchableOpacity>

      {opened && (
        <>
          <Divider variant="fullWidth" marginTop="micro" />
          <Animatable.View
            {...testProps('com.usereserva:id/animation_container')}
            animation="fadeIn"
          >
            {data.children.map((item, index) => (
              <MenuSubItem
                {...testProps(`com.usereserva:id/menu_sub_item_${index}`)}
                key={`menusubitem-${item.name}-${item.type}-${item.customUrl}-${data.name}-${data.type}`}
                data={item}
                onPress={onPress}
              />
            ))}
          </Animatable.View>
        </>
      )}
    </Box>
  );
}

export default MenuItem;
