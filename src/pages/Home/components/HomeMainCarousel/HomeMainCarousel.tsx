import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { Pressable, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from 'react-native-reanimated-carousel/lib/typescript/types';
import type { HomeCarouselItemOutput, HomeCarouselOutput } from '../../../../base/graphql/generated';
import NewBanner from '../../../../components/Banner/NewBanner';
import { Box } from '../../../../components/Box/Box';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import CarrouselScrollIndicator from '../../../../modules/Home/component/CarouselScrollIndicator';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import testProps from '../../../../utils/testProps';

interface IHomeMainCarousel {
  data: HomeCarouselOutput;
}

function HomeMainCarousel({ data }: IHomeMainCarousel) {
  const navigation = useNavigation();

  const [currIndex, setCurrIndex] = useState(0);

  const $carousel = useRef<ICarouselInstance>();

  const slideDelay = useMemo(() => (data.showtime || 10) * 1000, [data.showtime]);

  const carouselHeight = useMemo(() => {
    const [item] = data.items;

    const { width, height } = item!.image;

    return (width && height) ? ((height * configDeviceSizes.DEVICE_WIDTH) / width) : 500;
  }, [data.items]);

  const onPress = useCallback((item: HomeCarouselItemOutput) => {
    const { reservaMini, orderBy } = item;

    return navigation.navigate('ProductCatalog', {
      facetInput: item.facets,
      referenceId: item.reference,
      reservaMini,
      orderBy,
    });
  }, [navigation]);

  if (data.items.length === 1) {
    const [item] = data.items;

    return (
      <NewBanner
        image={item!.image.url}
        reference={item!.reference}
        facets={item!.facets}
        reservaMini={item!.reservaMini}
        orderBy={item!.orderBy}
      />
    );
  }

  return (
    <View style={{ flex: 1 }} {...testProps('default_carrousel_container')}>
      <Carousel
        {...testProps('default_carrousel_content')}
        loop
        width={configDeviceSizes.DEVICE_WIDTH}
        height={carouselHeight}
        ref={(carousel) => {
          if (carousel) $carousel.current = carousel;
        }}
        panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
        data={data.items}
        style={{ backgroundColor: 'rgba(0, 0, 255, 0)', position: 'relative' }}
        onSnapToItem={setCurrIndex}
        renderItem={({ item }) => (
          <Box alignItems="flex-start">
            <Box mb="quarck" width={1}>
              <Pressable
                {...testProps('carrousel_button')}
                onPress={() => onPress(item)}
                delayLongPress={100}
              >
                <ImageComponent
                  style={{ height: carouselHeight }}
                  resizeMode="cover"
                  source={{ uri: item.image.url }}
                />
              </Pressable>
            </Box>
          </Box>
        )}
      />

      <CarrouselScrollIndicator
        carouselLength={data.items.length}
        actualPosition={currIndex}
        slideDelay={slideDelay}
        onFinishAnimation={() => $carousel.current?.next()}
      />
    </View>
  );
}

export default HomeMainCarousel;
