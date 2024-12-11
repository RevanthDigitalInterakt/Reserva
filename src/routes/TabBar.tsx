import React from 'react';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { addMinutes, isAfter, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { slugify } from '../utils/slugify';
import testProps from '../utils/testProps';
import { BottomBar, BottomBarButton } from './BottomBar';
import { Box } from '../components/Box/Box';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import EventProvider from '../utils/EventProvider';

type OnPressType = {
  key: string;
  name: string;
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const { actions, rouletCoupon } = useBagStore(['actions', 'rouletCoupon']);
  const onPress = async ({ key, name }: OnPressType, isFocused: Boolean) => {
    if (name === 'Roulet') {
      EventProvider.logEvent('click_na_roleta', {});
      if (rouletCoupon.timestamp) {
        const dateFromTimestamp = parseISO(rouletCoupon.timestamp);
        const dateAfter60Minutes = addMinutes(dateFromTimestamp, 60);
        const nowUTC = utcToZonedTime(new Date(), 'America/Sao_Paulo');
        const isBlocked = !isAfter(nowUTC, dateAfter60Minutes);
        if (isBlocked) {
          return actions.BLOCK_ROULET_COUPON();
        }
        actions.UNBLOCK_ROULET_COUPON();
      }
      actions.SET_ROULET_LOADING(true);
      actions.OPEN_ROULET();
    } else {
      actions.SET_ROULET_LOADING(false);
      actions.CLOSE_ROULET();
    }

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

          if (route.name === 'NewOffersPage') {
            return (
              <BottomBarButton
                {...testProps(`com.usereserva:id/bottom-tab-perfil${slugify(params?.label)}`)}
                key={route.key}
                isSlected={isFocused}
                hidden
                onPress={() => onPress(route, isFocused)}
                iconName={route.name === 'WishList' ? 'Heart' : route.name}
                label={params?.label || ''}
              />
            );
          }

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
