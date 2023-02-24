import { Box } from '@usereservaapp/reserva-ui';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { Carousel } from '../../../../graphql/homePage/HomeQuery';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import Card from '../Card';
import styles from './styles';

interface MktBrandsCarouselProps {
  carousel: Carousel | undefined;
}
const MktBrandsCarousel: React.FC<MktBrandsCarouselProps> = ({
  carousel,
}) => {
  const myCards = carousel?.itemsCollection?.items ? carousel?.itemsCollection.items : [];
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const roundDotPosition = ({ value }: { value: number }) => {
      clearTimeout(timer);
      const step = 280;
      const newPosition = Math.round(value / step) * step;
      if (value === newPosition) {
        return;
      }
      timer = setTimeout(() => {
        scrollX.setValue(newPosition);
      }, 150);
    };
    scrollX.addListener(roundDotPosition);
  }, []);

  return (
    <Box>
      <Box>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={myCards}
          snapToOffsets={[...Array((Math.round(myCards.length / 4)))].map(
            (_x, i) => i * (configDeviceSizes.DEVICE_WIDTH * 0.85 - 48) + (i - 1) * 48,
          )}
          snapToAlignment="start"
          scrollEventThrottle={16}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingLeft: 4,
            paddingRight: 4,
            marginTop: 14,
            marginBottom: 8,
          }}
          bounces={false}
          renderItem={({ item, index }) => (
            <Box>
              <Card
                index={index}
                image={item.image}
                reference={item.reference}
                width={configDeviceSizes.DEVICE_WIDTH * 0.161}
              />
            </Box>
          )}
        />
        <Box height={24} flexDirection="row" alignSelf="center" style={{ marginBottom: 18 }}>
          <Animated.View
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
          {[...Array((Math.round(myCards.length / 4)))].map((_item, index) => (
            <Box
              key={index}
              justifyContent="center"
              alignItems="center"
              width={19}
            >
              <Box
                borderWidth={1}
                width={7}
                height={7}
                borderRadius={7}
                borderColor="#6F6F6F"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MktBrandsCarousel;
