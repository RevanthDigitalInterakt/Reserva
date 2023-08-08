import React from 'react';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomBar, BottomBarButton, Box } from '@usereservaapp/reserva-ui';
import { slugify } from '../utils/slugify';
import testProps from '../utils/testProps';

type OnPressType = {
  key: string;
  name: string;
};

export function TabBar({ state, navigation }: BottomTabBarProps<{}>) {
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
              {...testProps(`com.usereserva:id/bottom-tab-perfil${slugify(params?.label)}`)}
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
}
