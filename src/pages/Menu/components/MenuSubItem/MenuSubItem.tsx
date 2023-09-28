import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import testProps from '../../../../utils/testProps';
import type { MenuCategoryItemOutput } from '../../../../base/graphql/generated';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { Typography } from '../../../../components/Typography/Typography';
import { Box } from '../../../../components/Box/Box';

interface IMenuSubItem {
  data: MenuCategoryItemOutput;
  testID: string;
  onPress: (data: Omit<MenuCategoryItemOutput, '__typename'>) => void;
}

function MenuSubItem({ data, testID, onPress }: IMenuSubItem) {
  useEffect(() => {
    EventProvider.logEvent('page_view', {
      item_brand: defaultBrand.picapau,
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => onPress(data)}
      {...testProps(testID)}
    >
      <Box
        bg="backgroundMenuOpened"
        justifyContent="space-between"
        paddingY="micro"
        flexDirection="row"
        paddingX="xxs"
      >
        <Typography
          fontSize={13}
          fontFamily={data.highlight ? 'nunitoBold' : 'nunitoRegular'}
        >
          {data.name}
        </Typography>
      </Box>
    </TouchableOpacity>
  );
}

export default MenuSubItem;
