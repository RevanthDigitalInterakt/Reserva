import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { Box, Image } from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from 'react-native-reanimated-carousel/lib/typescript/types';
import type { Carrousel, CarrouselCard } from '../../../graphql/homePage/HomeQuery';
import CarrouselScrollIndicator from './CarouselScrollIndicator';

interface DefaultCarrouselProps {
  carrousel: Carrousel;
}

export function DefaultCarrousel({ carrousel }: DefaultCarrouselProps) {
  const $carousel = useRef<ICarouselInstance>();
  const [currIndex, setCurrIndex] = useState(0);

  const { width: DEVICE_WIDTH } = useWindowDimensions();
  const navigation = useNavigation();

  const slideDelay = useMemo(() => (carrousel?.showtime || 10) * 1000, [carrousel]);

  const carrouselCards = useMemo(() => {
    const cc: CarrouselCard[] = [];

    (carrousel?.itemsCollection?.items || []).map((c: CarrouselCard) => {
      if (!c.mkt) cc.push(c);
      return c;
    });

    return cc;
  }, [carrousel]);

  const carouselHeight = useMemo(() => {
    const [item] = carrouselCards;

    return item ? ((item.image.height * DEVICE_WIDTH) / item.image.width) : 500;
  }, [carrouselCards]);

  const onPressImage = useCallback((item: CarrouselCard) => {
    const facetInput = [];
    const [categoryType, categoryData] = item.reference.split(':');

    if (categoryType === 'category') {
      categoryData?.split('|').forEach((cat: string) => {
        facetInput.push({ key: 'c', value: cat });
      });
    } else {
      facetInput.push({ key: 'productClusterIds', value: categoryData });
    }

    navigation.navigate('ProductCatalog', {
      facetInput,
      referenceId: item.reference,
      reservaMini: item.reservaMini,
      orderBy: item.orderBy,
    });
  }, []);

  if (carrouselCards.length > 0) {
    return (
      <View style={{ flex: 1 }}>
        <Carousel
          loop
          width={DEVICE_WIDTH}
          height={carouselHeight}
          ref={(carousel) => {
            if (carousel) $carousel.current = carousel;
          }}
          panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
          data={carrouselCards}
          style={{ backgroundColor: 'rgba(0, 0, 255, 0)', position: 'relative' }}
          onSnapToItem={setCurrIndex}
          renderItem={({ item }) => (
            <Box alignItems="flex-start">
              <Box mb="quarck" width={1 / 1}>
                <TouchableHighlight
                  onPress={() => onPressImage(item)}
                  delayLongPress={100}
                  delayPressOut={100}
                >
                  <Image
                    resizeMode="cover"
                    height={item.image.height}
                    autoHeight
                    width={DEVICE_WIDTH}
                    source={{ uri: item.image.url }}
                    isSkeletonLoading
                  />
                </TouchableHighlight>
              </Box>
            </Box>
          )}
        />

        <CarrouselScrollIndicator
          carouselLength={carrouselCards.length}
          actualPosition={currIndex}
          slideDelay={slideDelay}
          onFinishAnimation={() => $carousel.current?.next()}
        />
      </View>
    );
  }

  return null;
}

export default DefaultCarrousel;
