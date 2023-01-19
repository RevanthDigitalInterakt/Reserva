import React, { useRef } from 'react';
import {
  Dimensions,
  TouchableHighlight,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import { Box, Image, Typography } from '@usereservaapp/reserva-ui';
import { platformType } from '../../utils/platformType';

const DEVICE_WIDTH = Dimensions.get('window').width;

interface IPrimeAdvantagesCarousel {
  prime: any;
  onPress: () => void;
}

export const PrimeAdvantagesCarousel = ({
  prime,
  onPress,
}: IPrimeAdvantagesCarousel) => {
  const primeMokado = [
    {
      image: {
        url: 'https://images.ctfassets.net/6jsfqc13oxv4/4KVDPRc9AVQERWwuBSkkk/c4b786e5480eb986ff22e4e2d95d528e/banner-card-app-namorados-camisetas.jpg',
      },
      title: 'Frete grátis',
      subtitle: 'Em toda compra*, sem valor mínimo e válido em todo o Brasil.',
    },
    {
      image: {
        url: 'https://images.ctfassets.net/6jsfqc13oxv4/4KVDPRc9AVQERWwuBSkkk/c4b786e5480eb986ff22e4e2d95d528e/banner-card-app-namorados-camisetas.jpg',
      },
      title: 'Frete grátis',
      subtitle: 'Em toda compra*, sem valor mínimo e válido em todo o Brasil.',
    },
    {
      image: {
        url: 'https://images.ctfassets.net/6jsfqc13oxv4/4KVDPRc9AVQERWwuBSkkk/c4b786e5480eb986ff22e4e2d95d528e/banner-card-app-namorados-camisetas.jpg',
      },
      title: 'Frete grátis',
      subtitle: 'Em toda compra*, sem valor mínimo e válido em todo o Brasil.',
    },
  ];
  const myCards = primeMokado;
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
            (x, i) => i * (DEVICE_WIDTH * 0.85 - 28) + (i - 1) * 28,
          )}
          snapToAlignment="start"
          scrollEventThrottle={16}
          decelerationRate="fast"
          bounces={false}
          renderItem={({ item, index }) => (
            <Box>
              <Card
                onPress={onPress}
                data={item}
                key={index}
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
                      DEVICE_WIDTH * 0.85 - 28,
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
                borderRadius={16}
                borderColor="#6F6F6F"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
interface ICard {
  data: {
    image: any;
    title: string;
    subtitle?: string;
  };
  onPress: () => void;
}
const Card = ({
  data,
  onPress,
}: ICard) => (
  <TouchableHighlight
    onPress={onPress}
    style={{
      marginLeft: 14, marginRight: 14,
    }}
  >
    <Box
      bg="white"
      style={{ elevation: Platform.OS === platformType.ANDROID ? 8 : 0 }}
      boxShadow={Platform.OS === platformType.ANDROID ? null : 'bottomBarShadow'}
      height={220}
      width={DEVICE_WIDTH * 0.85 - 28}
      borderRadius={16}
      alignItems="center"
      paddingY={20}
      paddingX={26}
      mb={16}
      mt={16}
    >
      <Image
        height={96}
        width={96}
        source={{ uri: data.image.url }}
      />
      <Box marginY={8}>
        <Typography
          fontFamily="reservaSerifBold"
          fontSize={24}
        >
          {data.title}
        </Typography>
      </Box>
      <Box>
        <Typography
          fontFamily="reservaSerifBold"
          fontSize={16}
          textAlign="center"
        >
          {data.subtitle}
        </Typography>
      </Box>
    </Box>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  slidingIndicatorStyle: {
    backgroundColor: '#6F6F6F',
    width: 7,
    height: 7,
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 16,
  },
});
