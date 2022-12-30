import React from 'react';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomBar, BottomBarButton, Box } from '@usereservaapp/reserva-ui';
import { slugify } from '../utils/slugify';

type OnPressType = {
  key: string;
  name: string;
};

export const TabBar = ({ state, navigation }: BottomTabBarProps<{}>) => {
  const onPress = ({ key, name }: OnPressType, isFocused: Boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(name);
    }
  };

  return (
    <Box flexDirection="row">
      <BottomBar>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { params } = route;

          return (
            <BottomBarButton
              testID={`bottom_tab_${slugify(params?.label)}-${index}`}
              key={route.key}
              isSlected={isFocused}
              onPress={() => onPress(route, isFocused)}
              iconName={route.name === 'WishList' ? 'Heart' : route.name}
              label={params?.label || ''}
            />
          );
        })}
      </BottomBar>
    </Box>
  );
};
