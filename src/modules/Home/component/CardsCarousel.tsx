import React, { useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  Dimensions, Animated, StyleSheet,
} from 'react-native';
import { Box, Button, Image } from '@usereservaapp/reserva-ui';
import type { Carousel, CarrouselCard } from '../../../graphql/homePage/HomeQuery';
import EventProvider from '../../../utils/EventProvider';

const DEVICE_WIDTH = Dimensions.get('window').width;

interface CardsCarrouselProps {
  carrousel: Carousel;
}

export const CardsCarrousel: React.FC<CardsCarrouselProps> = ({
  carrousel,
}) => {
  const myCards = carrousel.itemsCollection.items;
  const scrollX = useRef(new Animated.Value(0)).current;

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
          snapToOffsets={[...Array(myCards.length)].map(
            (x, i) => i * (DEVICE_WIDTH * 0.85 - 48) + (i - 1) * 48,
          )}
          snapToAlignment="start"
          scrollEventThrottle={16}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingLeft: 4,
            paddingRight: 4,
          }}
          bounces={false}
          renderItem={({ item, index }) => (
            <Box>
              <Card
                image={item?.image}
                name={item?.name}
                description={item?.description}
                reference={item?.reference}
                referenceLabel={item?.referenceLabel}
                key={index}
                reservaMini={item?.reservaMini}
                orderBy={item?.orderBy}
              />
            </Box>
          )}
        />

        <Box height={24} flexDirection="row" alignSelf="center">
          <Animated.View
            style={[
              styles.slidingIndicatorStyle,
              {
                position: 'absolute',
                transform: [
                  {
                    translateX: Animated.divide(
                      scrollX,
                      DEVICE_WIDTH * 0.88 - 48,
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [6, 25.8],
                    }),
                  },
                ],
              },
            ]}
          />
          {myCards.map((_item, index) => (
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

interface CardProps extends CarrouselCard {
  referenceLabel: string;
}

const Card: React.FC<CardProps> = ({
  image,
  reference,
  reservaMini,
  orderBy,
}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    const facetInput = [];
    const [categoryType, categoryData] = reference.split(':');
    if (categoryType === 'product') {
      EventProvider.logEvent('select_item', {
        item_list_id: categoryData ?? '',
        item_list_name: '',
      });

      navigation.navigate('ProductDetail', {
        productId: categoryData,
        itemId: categoryData,
        colorSelected: '#FFFFFF',
      });
    } else {
      if (categoryType === 'category') {
        categoryData?.split('|').forEach((cat: string) => {
          facetInput.push({
            key: 'c',
            value: cat,
          });
        });
      } else {
        facetInput.push({
          key: 'productClusterIds',
          value: categoryData,
        });
      }
      navigation.navigate('ProductCatalog', {
        referenceId: reference,
        reservaMini,
        orderBy,
      });
    }
  };

  return (
    <Box>
      <Button onPress={handleNavigation}>
        <Image
          autoHeight
          width={DEVICE_WIDTH * 0.85 - 16}
          source={{ uri: image?.url }}
        />
      </Button>
    </Box>
  );
};

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
