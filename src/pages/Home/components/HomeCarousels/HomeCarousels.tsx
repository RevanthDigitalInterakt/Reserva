import React, { useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Box } from '@usereservaapp/reserva-ui';
import { useHomeStore } from '../../../../zustand/useHomeStore';
import { COLORS } from '../../../../base/styles/colors';
import type { HomeCarouselOutput } from '../../../../base/graphql/generated';
import { HomePageSectionTypeEnum } from '../../../../base/graphql/generated';
import HomeMainCarousel from '../HomeMainCarousel';
import HomeBrandsCarousel from '../HomeBrandsCarousel';
import HomeCardsCarousel from '../HomeCardsCarousel';
import testProps from '../../../../utils/testProps';

function HomeCarousels() {
  const { carousels, loading } = useHomeStore(['carousels', 'loading']);

  const renderCarousel = useCallback((item: HomeCarouselOutput) => {
    if (!item.items.length) return null;

    const relationalObject: { [key in HomePageSectionTypeEnum | 'DEFAULT']: () => JSX.Element | null } = {
      [HomePageSectionTypeEnum.Main]: () => <HomeMainCarousel data={item} />,
      [HomePageSectionTypeEnum.Brands]: () => <HomeBrandsCarousel data={item} />,
      [HomePageSectionTypeEnum.Cards]: () => <HomeCardsCarousel data={item} />,
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
    <View>
      {carousels.map((carousel) => (
        <View
          {...testProps('carousels_cards')}
          key={`item-${carousel.type}-${carousel.showtime}-${carousel.items.length}`}>
          {renderCarousel(carousel)}
        </View>
      ))}
    </View>
  );
}

export default HomeCarousels;
