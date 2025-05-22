import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { Pressable, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';

import type { HomeCarouselItemOutput, OffersCarouselsOutput } from '../../../../base/graphql/generated';
import { COLORS } from '../../../../base/styles';
import { Box } from '../../../../components/Box/Box';
import CarouselPaginationItem from '../../../../components/CarouselPaginationItem';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import testProps from '../../../../utils/testProps';
import { styles } from './OffersMainCarousel.styles';
import EventProvider from '../../../../utils/EventProvider';

interface IOffersMainCarousel {
  data: OffersCarouselsOutput;
}

function OffersMainCarousel({ data }: IOffersMainCarousel) {
  const navigation = useNavigation();
  const progressValue = useSharedValue<number>(0);

  const [currIndex, setCurrIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>();

  const slideDelay = useMemo(
    () => (data.showtime || 10) * 1000,
    [data.showtime],
  );

  const onPress = useCallback(
    (item: HomeCarouselItemOutput) => {
      const { reservaMini, orderBy } = item;

      const navigateParams: {
        facetInput: string;
        referenceId: string;
        reservaMini: boolean;
        orderBy: string;
        filters: {
          priceFilter: {
            from: number;
            to: number;
          }
        }
      } = {
        facetInput: item.facets,
        referenceId: item.reference,
        reservaMini,
        orderBy,
      };
      if (
        (item.filters?.priceFilter?.from
          || item.filters?.priceFilter?.from === null)
        && item.filters?.priceFilter?.to) {
        navigateParams.filters = {
          priceFilter: {
            from: item.filters?.priceFilter?.from || 0,
            to: item.filters?.priceFilter?.to || 0,
          },
        };
      }

      EventProvider.logEvent('offers_main_banner_click', {
        category: item.reference,
      });

      return navigation.navigate('ProductCatalog', navigateParams);
    },
    [navigation],
  );

  return (
    <View style={{ flex: 1 }} {...testProps('default_carrousel_container')}>
      <Carousel
        {...testProps('default_carrousel_content')}
        loop
        width={configDeviceSizes.DEVICE_WIDTH}
        height={400}
        ref={(carousel) => {
          if (carousel) carouselRef.current = carousel;
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 50,
        }}
        enabled={data.items.length > 1}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
        data={data.items}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0)', position: 'relative' }}
        onSnapToItem={(index) => {
          setCurrIndex(index);
          EventProvider.logEvent('offers_main_banner_slide', {});
        }}
        renderItem={({ item }) => (
          <Box alignItems="flex-start" bg="white">
            <Box mb="quarck" width={1}>
              <Pressable
                {...testProps('carrousel_button')}
                onPress={() => onPress(item)}
                delayLongPress={100}
              >
                <ImageComponent
                  style={[
                    {
                      height: 400,
                    },
                  ]}
                  resizeMode="cover"
                  source={{ uri: item.image.url }}
                />
              </Pressable>
            </Box>
          </Box>
        )}
      />
      <View
        style={[styles.bulletsWrapper, { width: data.items.length * 24.5 }]}
      >
        {data.items.map((item, i) => (
          <CarouselPaginationItem
            backgroundColor={COLORS.WHITE}
            animValue={progressValue}
            index={i}
            actualPosition={currIndex}
            key={`offers-main-carousel-${item.image.url}`}
            length={data.items.length}
            slideDelay={slideDelay}
            onFinishAnimation={() => carouselRef.current?.next()}
          />
        ))}
      </View>

    </View>
  );
}

export default OffersMainCarousel;
