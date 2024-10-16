import React, { useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useHomeStore } from '../../../../zustand/useHomeStore';
import { COLORS } from '../../../../base/styles/colors';
import type { OffersCarouselsOutput } from '../../../../base/graphql/generated';
import { HomePageSectionTypeEnum } from '../../../../base/graphql/generated';
import testProps from '../../../../utils/testProps';
import { Box } from '../../../../components/Box/Box';
import OffersMainCarousel from '../OffersMainCarousel/OffersMainCarousel';

export function OffersCarousels() {
  const { offersCarousels, loading } = useHomeStore(['offersCarousels', 'loading']);

  const renderCarousel = useCallback((item: OffersCarouselsOutput) => {
    if (!item.items.length) return null;

    const relationalObject: {
      [key in HomePageSectionTypeEnum | 'DEFAULT']: () => JSX.Element | null;
    } = {
      [HomePageSectionTypeEnum.Main]: () => (
        <OffersMainCarousel data={item} />
      ),
      DEFAULT: () => null,
    };

    return (relationalObject[item.type] || relationalObject.DEFAULT)();
  }, []);

  if (loading) {
    return (
      <Box bg="white" marginY="nano" justifyContent="center">
        <View style={{ height: 100 }} />

        <ActivityIndicator size="small" color={COLORS.BLACK} />
      </Box>
    );
  }

  return (
    <View style={{ height: 400 }}>
      {offersCarousels.map((carousel) => (
        <View
          {...testProps('carousels_cards')}
          key={`offers-item-${carousel.type}-${carousel.showtime}-${carousel.items.length}`}
        >
          {renderCarousel(carousel)}
        </View>
      ))}
    </View>
  );
}
