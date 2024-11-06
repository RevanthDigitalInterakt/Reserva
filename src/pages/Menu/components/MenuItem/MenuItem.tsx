import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import type { MenuCategoryItemOutput, MenuCategoryOutput } from '../../../../base/graphql/generated';
import { Box } from '../../../../components/Box/Box';
import { BadgeRound } from '../../../../components/Badge/Badge';
import { Divider } from '../../../../components/Divider/Divider';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import { slugify } from '../../../../utils/slugify';
import testProps from '../../../../utils/testProps';
import MenuSubItem from '../MenuSubItem';
import { TypographyContainer } from '../../../../components/TypographyContainer/TypographyContainer';

interface IMenuItem {
  data: MenuCategoryOutput;
  opened: boolean;
  onPress: (data: Omit<MenuCategoryItemOutput, '__typename'>) => void;
}

function MenuItem({ data, opened, onPress }: IMenuItem) {
  const nameItem = data.name.toUpperCase();
  const itemsAddBadge = ['PERSONALIZAÇÕES', 'KIT LOOK'];

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
          <TypographyContainer>
            <Typography
              color={data.highlight ? 'vermelhoAlerta' : 'preto'}
              fontSize={13}
              fontFamily="nunitoBold"
            >
              {nameItem}
            </Typography>
            {itemsAddBadge.includes(nameItem) && <BadgeRound text="Novidade" />}
          </TypographyContainer>

          <Box>
            <IconLegacy
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
          <View
            {...testProps('com.usereserva:id/animation_container')}
          >
            {data.children.map((item, index) => (
              <MenuSubItem
                {...testProps(`com.usereserva:id/menu_sub_item_${index}`)}
                key={`menusubitem-${item.name}-${item.type}-${item.customUrl}-${data.name}-${data.type}`}
                data={item}
                onPress={onPress}
              />
            ))}
          </View>
        </>
      )}
    </Box>
  );
}

export default MenuItem;
