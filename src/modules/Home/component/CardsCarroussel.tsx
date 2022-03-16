import React, { useEffect, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Animated, View, StyleSheet, useWindowDimensions } from 'react-native';
import { Box, Button, Image } from 'reserva-ui';
import { Carrousel, CarrouselCard } from 'src/graphql/homePage/HomeQuery';

const cardWidth = Dimensions.get('window').width * 0.85;
const cardPadding = Dimensions.get('window').width * 0.15 * 0.5;
const DEVICE_WIDTH = Dimensions.get('window').width;

interface CardsCarrouselProps {
  carrousel: Carrousel;
}

export const CardsCarrousel: React.FC<CardsCarrouselProps> = ({
  carrousel,
}) => {
  console.log('carrousel', carrousel);
  const myCards = carrousel.itemsCollection.items;
  const scrollX = useRef(new Animated.Value(0)).current

  const { width } = useWindowDimensions();
  const defaultProps = {
    dotSize: 24,
    borderPadding: -5,
  };
  const inputRange = [-width, -48, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [
      -30,
      0,
      30,
    ],
  });

  return (
    <Box>
      <Box>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={myCards}
          snapToOffsets={[...Array(myCards.length)].map(
            (x, i) => i * (DEVICE_WIDTH * 0.85 - 48) + (i - 1) * 48
          )}
          snapToAlignment='start'
          scrollEventThrottle={16}
          decelerationRate='fast'
          contentContainerStyle={{
            paddingLeft: 4,
            paddingRight: 4,
          }}
          // snapToInterval={cardWidth}
          // snapToAlignment="center"
          // pagingEnabled
          // decelerationRate={0}
          bounces={false}
          renderItem={({ item, index }) => (
            <Box>
              <Card
                image={item.image}
                name={item.name}
                description={item.description}
                reference={item.reference}
                referenceLabel={item.referenceLabel}
                key={index}
              />
            </Box>
          )}
        />

        <Box
          height={24}
          flexDirection='row'
          alignSelf='center'
        >
          <Animated.View
            style={[
              styles.slidingIndicatorStyle,
              {
                position: 'absolute',
                transform: [{ translateX }],
              },
            ]}
          />
          {myCards.map((_item, index) => {
            return (
              <Box
                key={index}
                justifyContent='center'
                alignItems='center'
                width={19}
              >
                <Box
                  borderWidth={1}
                  width={12}
                  height={12}
                  borderRadius={12}
                  borderColor='#6F6F6F'
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box >
  );
};

interface CardProps extends CarrouselCard {
  referenceLabel: string;
}

const Card: React.FC<CardProps> = ({
  image,
  referenceLabel,
  reference,
  description,
  name,
}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    const facetInput = [];
    const [categoryType, categoryData] = reference.split(':');
    if (categoryType === 'product') {
      navigation.navigate('ProductDetail', {
        productId: categoryData,
        itemId: categoryData,
        colorSelected: '#FFFFFF',
      })
    } else {
      if (categoryType === 'category') {
        categoryData.split('|').forEach((cat: string) => {
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
      });
    }
  };

  return (
    <Box>
      <Button onPress={handleNavigation}>
        <Image
          autoHeight
          width={DEVICE_WIDTH * 0.85 - 16}
          source={{ uri: image.url }} />
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  slidingIndicatorStyle: {
    backgroundColor: '#6F6F6F',
    width: 12,
    height: 12,
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 12,
  },
});