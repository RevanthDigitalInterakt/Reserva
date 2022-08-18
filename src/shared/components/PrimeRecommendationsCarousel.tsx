import React, { useRef, useState } from 'react';
import {
  Dimensions,
  TouchableHighlight,
  Animated,
  StyleSheet,
} from 'react-native';
import { Box, Image, Button, Icon, Typography } from '@danilomsou/reserva-ui';

import { PriceCustom } from '../../modules/Checkout/components/PriceCustom';
const DEVICE_WIDTH = Dimensions.get('window').width;

interface IPrimeRecommendationsCarousel {
  prime?: any;
  onPress: () => void;
}

export const PrimeRecommendationsCarousel = ({
  prime,
  onPress,
}: IPrimeRecommendationsCarousel) => {
  const primeMokado = [
    {
      image: {
        url: 'https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg',
      },
    },
    {
      image: {
        url: 'https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg',
      },
    },
    {
      image: {
        url: 'https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg',
      },
    },
    {
      image: {
        url: 'https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg',
      },
    },
    {
      image: {
        url: 'https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg',
      },
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
            { useNativeDriver: true }
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={myCards}
          snapToOffsets={[...Array(myCards.length)].map(
            (x, i) => i * (DEVICE_WIDTH * 0.85 - 28) + (i - 1) * 28
          )}
          snapToAlignment="start"
          scrollEventThrottle={16}
          decelerationRate="fast"
          bounces={false}
          renderItem={({ item, index }) => (
            <Box>
              <Card onPress={onPress} image={item.image} key={index} />
            </Box>
          )}
        />
      </Box>
    </Box>
  );
};

interface ICard {
  image: string;
  onPress: () => void;
}
const Card = ({ image, onPress }: ICard) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  return (
    <Box>
      <Box position="absolute" zIndex={5} right={14} top={5}>
        <Button
          width={30}
          height={30}
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          variant="icone"
          onPress={() => {
            setIsFavorited(!isFavorited);
          }}
          icon={
            <Icon
              name={isFavorited ? 'HeartRaised' : 'Heart'}
              size={18}
              color="preto"
            />
          }
        />
      </Box>
      <TouchableHighlight
        onPress={onPress}
        style={{
          marginLeft: 14,
          marginRight: 14,
        }}
      >
        <Image
          autoHeight
          width={DEVICE_WIDTH * 0.85 - 28}
          source={{ uri: image.url }}
        />
      </TouchableHighlight>
      <Box mt="nano" marginX={14}>
        <Box>
          <Typography fontFamily="nunitoSemiBold">NOME DO PRODUTO</Typography>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <PriceCustom
            fontFamily="nunitoBold"
            color="fullBlack"
            sizeInterger={15}
            sizeDecimal={11}
            num={999}
          />
          <Box flexDirection="row" alignItems="center">
            <Typography fontFamily="nunitoBold" color="fullBlack">
              5x {''}
            </Typography>
            <PriceCustom
              fontFamily="nunitoBold"
              color="fullBlack"
              sizeInterger={15}
              sizeDecimal={11}
              num={77}
            />
          </Box>
        </Box>

        <Box flexDirection="row" justifyContent="space-between">
          <Box flexDirection="row" alignItems="center">
            <PriceCustom
              fontFamily="nunitoBold"
              color="#A01E21"
              sizeInterger={15}
              sizeDecimal={11}
              num={77777 / 100}
            />
            <Box marginLeft="nano">
              <Typography
                fontFamily="reservaDisplayRegular"
                fontSize={12}
                color="#A01E21"
              >
                Prime
              </Typography>
            </Box>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <Typography fontFamily="nunitoBold" color="#A01E21">
              6x {''}
            </Typography>
            <PriceCustom
              fontFamily="nunitoBold"
              color="#A01E21"
              sizeInterger={15}
              sizeDecimal={11}
              num={5555 / 100}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
