import React, { useRef } from 'react';
import {
  Animated, StyleSheet,
  View,
} from 'react-native';
import type { Carousel } from '../../../graphql/homePage/HomeQuery';
import configDeviceSizes from '../../../utils/configDeviceSizes';
import Card from './Card';
import testProps from '../../../utils/testProps';
import { Box } from '../../../components/Box/Box';

interface CardsCarrouselProps {
  carrousel: Carousel;
}

const styles = StyleSheet.create({
  slidingIndicatorStyle: {
    backgroundColor: '#6F6F6F',
    width: 7,
    height: 7,
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 7,
  },
});

export const CardsCarrousel: React.FC<CardsCarrouselProps> = ({
  carrousel,
}) => {
  const myCards = carrousel.itemsCollection.items;
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Box {...testProps('com.usereserva:id/cards_carrousel_container')}>
      <Box>
        <Animated.FlatList
          {...testProps('com.usereserva:id/cards_carrousel_animated_flat_list')}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={myCards}
          snapToOffsets={[...Array(myCards.length)].map(
            (_x, i) => i * (configDeviceSizes.DEVICE_WIDTH * 0.85 - 48) + (i - 1) * 48,
          )}
          keyExtractor={(item) => item?.image?.url}
          snapToAlignment="start"
          scrollEventThrottle={16}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingLeft: 4,
            paddingRight: 4,
          }}
          bounces={false}
          renderItem={({ item, index }) => (
            <Card
              image={item?.image}
              name={item?.name}
              description={item?.description}
              reference={item?.reference}
              key={index}
              reservaMini={item?.reservaMini}
              orderBy={item?.orderBy}
              filters={item?.filters}
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
          {myCards.map((item) => (
            <View
              key={item?.image?.url}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 19,
              }}
            >
              <View style={{
                borderWidth: 1,
                width: 7,
                height: 7,
                borderRadius: 7,
                borderColor: '#6F6F6F',
              }}
              />
            </View>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
