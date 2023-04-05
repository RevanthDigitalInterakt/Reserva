import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Box, Image } from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from 'react-native-reanimated-carousel/lib/typescript/types';
import type { Carousel as CarouselType, CarrouselCard } from '../../../graphql/homePage/HomeQuery';
import CarrouselScrollIndicator from './CarouselScrollIndicator';
import configDeviceSizes from '../../../utils/configDeviceSizes';
import testProps from '../../../utils/testProps';

interface DefaultCarrouselProps {
  carrousel: CarouselType;
}

const DefaultCarrousel = ({ carrousel }: DefaultCarrouselProps) => {
  const $carousel = useRef<ICarouselInstance>();
  const [currIndex, setCurrIndex] = useState(0);

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

    return item ? ((item.image.height * configDeviceSizes.DEVICE_WIDTH) / item.image.width) : 500;
  }, [carrouselCards]);

  const onPressImage = useCallback((item: CarrouselCard) => {
    const {
      linkMktIn, reference, reservaMini, orderBy, filters,
    } = item;

    if (linkMktIn) {
      return navigation.navigate(linkMktIn);
    }

    const facetInput = [];
    const [categoryType, categoryData] = reference?.split(':') || [undefined, undefined];

    if (categoryType === 'category') {
      categoryData?.split('|').forEach((cat: string) => {
        facetInput.push({ key: 'c', value: cat });
      });
    } else {
      facetInput.push({ key: 'productClusterIds', value: categoryData });
    }

    return navigation.navigate('ProductCatalog', {
      facetInput,
      referenceId: reference,
      reservaMini,
      orderBy,
      filters: {
        categories: filters?.categoriesFilterCollection
          ?.items.map(({ category }) => category),
        priceFilter: filters?.priceFilter,
      },
    });
  }, []);

  if (carrouselCards.length > 0) {
    return (
      <View style={{ flex: 1 }} {...testProps('com.usereserva:id/default_carrousel_container')}>
        <Carousel
          testID="com.usereserva:id/default_carrousel_content"
          loop
          width={configDeviceSizes.DEVICE_WIDTH}
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
                  {...testProps('com.usereserva:id/carrousel_button')}
                  onPress={() => onPressImage(item)}
                  delayLongPress={100}
                  delayPressOut={100}
                >
                  {item?.image?.url
                    ? (
                      <Image
                        resizeMode="cover"
                        height={item?.image?.height}
                        autoHeight
                        width={configDeviceSizes.DEVICE_WIDTH}
                        source={{ uri: item?.image?.url }}
                        isSkeletonLoading
                      />
                    )
                    : <View />}

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
};

export default DefaultCarrousel;
