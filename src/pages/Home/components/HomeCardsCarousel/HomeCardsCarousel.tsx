import React, { useRef } from 'react';
import { Animated, View } from 'react-native';

import type { HomeCarouselOutput } from '../../../../base/graphql/generated';
import { Box } from '../../../../components/Box/Box';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import testProps from '../../../../utils/testProps';
import HomeCard from '../HomeCard';
import { styles } from './HomeCardsCarousel.styles';
import type { IPriceRange } from '../../../../utils/generateFacets';

interface IHomeCardsCarousel {
  data: HomeCarouselOutput;
}

function HomeCardsCarousel({ data }: IHomeCardsCarousel) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Box {...testProps('cards_carrousel_container')}>
      <Animated.FlatList
        {...testProps('cards_carrousel_animated_flat_list')}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data.items}
        snapToOffsets={[...Array(data.items.length)].map(
          (_x, i) => i * (configDeviceSizes.DEVICE_WIDTH * 0.85 - 48) + (i - 1) * 48,
        )}
        keyExtractor={(item) => `card-home-${item.image.url}`}
        snapToAlignment="start"
        scrollEventThrottle={16}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContainer}
        bounces={false}
        renderItem={({ item }) => (
          <HomeCard
            imageUrl={item.image.url}
            reference={item.reference}
            reservaMini={item.reservaMini}
            orderBy={item.orderBy}
            filters={{
              priceFilter: item?.filters?.priceFilter as IPriceRange,
            }}
          />
        )}
      />

      <Box height={24} flexDirection="row" alignSelf="center">
        <Animated.View
          {...testProps('com.usereserva:id/cards_carrousel_animated_view')}
          style={[
            styles.slidingIndicatorStyle,
            {
              position: 'absolute',
              transform: [
                {
                  translateX: Animated.divide(
                    scrollX,
                    configDeviceSizes.DEVICE_WIDTH * 0.88 - 48,
                  ).interpolate({
                    inputRange: [0, 1],
                    outputRange: [6, 25.8],
                  }),
                },
              ],
            },
          ]}
        />

        {data.items.map((item) => (
          <View key={`cards-item-${item.image.url}`} style={styles.bulletsWrapper}>
            <View style={styles.bullet} />
          </View>
        ))}
      </Box>
    </Box>
  );
}

export default HomeCardsCarousel;
