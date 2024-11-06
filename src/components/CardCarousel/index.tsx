import React, { useRef, useState } from 'react';
import {
  Image, Pressable, View,
} from 'react-native';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import CarouselPaginationItem from '../CarouselPaginationItem';
import { COLORS } from '../../base/styles/colors';
import testProps from '../../utils/testProps';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { Typography } from '../Typography/Typography';

interface ICardCarousel {
  bannerCarousel: {
    title: string;
    items: {
      id?: string | null | undefined;
      banner: string;
    }[];
  }
}

export function CardCarousel({ bannerCarousel }: ICardCarousel) {
  const navigation = useNavigation();
  const $carousel = useRef<ICarouselInstance>();
  const progressValue = useSharedValue<number>(0);
  const [currIndex, setCurrIndex] = useState(0);

  const handleNavigation = (id: string) => {
    const [categoryType, categoryData] = id.split(':');
    if (categoryType === 'product') {
      navigation.navigate('ProductDetail', {
        productId: categoryData,
        itemId: categoryData,
      });

      return;
    }

    const navigateParams: {
      referenceId: string;
    } = {
      referenceId: id,
    };

    navigation.navigate('ProductCatalog', navigateParams);
  };

  return (
    <View style={{
      padding: 16,
      gap: 12,

    }}
    >
      <Typography fontFamily="reservaSerifBold" fontSize={18}>
        {bannerCarousel.title}
      </Typography>
      <Carousel
        {...testProps('default_carrousel_content')}
        loop
        width={configDeviceSizes.DEVICE_WIDTH}
        height={152}
        ref={(carousel) => {
          if (carousel) $carousel.current = carousel;
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 130,
        }}
        enabled={bannerCarousel.items.length > 1}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
        data={bannerCarousel.items}
        onSnapToItem={setCurrIndex}
        defaultIndex={0}
        style={{
          position: 'relative',
        }}
        renderItem={({ item }) => (
          <Pressable
            {...testProps('carrousel_button')}
            onPress={() => handleNavigation(item.id!)}
            delayLongPress={100}
          >
            <Image
              style={{
                width: 242,
                height: 152,
                borderRadius: 15,
              }}
              source={{ uri: item.banner }}
            />
          </Pressable>
        )}
      />

      <View
        style={[styles.bulletsWrapper, { width: bannerCarousel.items.length * 24.5 }]}
      >
        {bannerCarousel.items.map((item, i) => (
          <CarouselPaginationItem
            backgroundColor={COLORS.BLACK}
            borderColor="#C3C7CD"
            animValue={progressValue}
            index={i}
            actualPosition={currIndex}
            key={`offers-page-banner-carousel-${item.banner}`}
            length={bannerCarousel.items.length}
            slideDelay={10000}
            onFinishAnimation={() => $carousel.current?.next()}
          />
        ))}
      </View>
    </View>
  );
}
