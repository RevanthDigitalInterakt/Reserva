import React, { useEffect, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Animated } from 'react-native';
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
  return (
    <Box
    // marginY={15}
    >
      <Box>
        {/* <Box paddingLeft={15}>
          <Typography fontFamily="nunitoBold" fontSize={16}>
            {carrousel.title}
          </Typography>
        </Box> */}
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
          // disableIntervalMomentum
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
          // marginY={5}
          marginTop={3}
          marginBottom={1}
          flexDirection={'row'}
          alignSelf={'center'}
        >
          {Array(3).fill(0).map((_, index) => (
            index != 0
              ? <Box
                width={8}
                height={8}
                bg="white"
                borderRadius={'xxxs'}
                borderColor='#6F6F6F'
                borderWidth={1}
                ml={'nano'}
              />
              : <Box
                width={8}
                height={8}
                bg="white"
                borderRadius={'xxxs'}
                borderColor='#6F6F6F'
                borderWidth={1}
              />
          ))}
          <Animated.View
            style={{
              width: 8,
              height: 8,
              backgroundColor: '#6F6F6F',
              borderRadius: 20,
              position: 'absolute',
              transform: [{
                translateX: Animated.divide(scrollX, DEVICE_WIDTH * 0.85 - 100).interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 8 + 5]
                })
              }]
            }}
          />
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
        // facetInput,
        referenceId: reference,
      });
    }
  };

  return (
    <Box>
      {/* <Box> */}
      <Button onPress={handleNavigation}>
        <Image
          autoHeight
          width={DEVICE_WIDTH * 0.85 - 16}
          source={{ uri: image.url }} />
      </Button>
      {/* <Box
          style={{ maxWidth: width }}
          marginLeft={10}
          marginTop="quarck"
          marginBottom={5}
        >
          <Typography fontFamily="reservaSansBold" fontSize={16}>
            {name.toUpperCase()}
          </Typography>
          <Typography
            style={{
              marginLeft: 10,
              height: (12 + 4) * 3,
            }}
            numberOfLines={3}
            fontFamily="reservaSansRegular"
            fontSize={12}
            color="neutroFrio2"
          >
            {description}
          </Typography>
        </Box>
      </Box> */}
      {/* <TouchableOpacity
        onPress={handleNavigation}
        style={{ bottom: 0, marginLeft: 10 }}
      >
        <Typography fontSize={14} fontFamily="nunitoBold">
          {referenceLabel}
        </Typography>
      </TouchableOpacity> */}
    </Box>
  );
};
