import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Pressable, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';

import type { HomeCarouselItemOutput, HomeCarouselOutput } from '../../../../base/graphql/generated';
import { COLORS } from '../../../../base/styles';
import { Box } from '../../../../components/Box/Box';
import CarouselPaginationItem from '../../../../components/CarouselPaginationItem';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import CarrouselScrollIndicator from '../../../../modules/Home/component/CarouselScrollIndicator';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import testProps from '../../../../utils/testProps';
import { styles } from './HomeMainCarousel.styles';
import { useHomeStore } from '../../../../zustand/useHomeStore';
import { getHomeContent } from '../../../../utils/getHomeContent';

interface IHomeMainCarousel {
  data: HomeCarouselOutput;
}

function HomeMainCarousel({ data }: IHomeMainCarousel) {
  const { selectedStateGeolocation } = useHomeStore(['selectedStateGeolocation']);

  const [newCarouselData, setNewCarouselData] = useState<HomeCarouselItemOutput[]>([]);

  const navigation = useNavigation();
  const progressValue = useSharedValue<number>(0);
  const { getBoolean } = useRemoteConfig();

  const [currIndex, setCurrIndex] = useState(0);
  const $carousel = useRef<ICarouselInstance>();

  const slideDelay = useMemo(
    () => (data.showtime || 10) * 1000,
    [data.showtime],
  );

  const showNewHome = getBoolean('show_new_home');

  const carouselHeight = useMemo(() => {
    const [item] = data.items;

    const { width, height } = item!.image;

    return width && height
      ? (height * configDeviceSizes.DEVICE_WIDTH) / width
      : 500;
  }, [newCarouselData]);

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

      return navigation.navigate('ProductCatalog', navigateParams);
    },
    [navigation],
  );

  useEffect(() => {
    const payload = getHomeContent(data.items, selectedStateGeolocation);
    setNewCarouselData(payload);
  }, [data.items, selectedStateGeolocation]);

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
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 50,
        }}
        enabled={newCarouselData.length > 1}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
        data={newCarouselData}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0)', position: 'relative' }}
        onSnapToItem={setCurrIndex}
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
                      height: carouselHeight,
                    },
                    showNewHome
                      ? {
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                      }
                      : null,
                  ]}
                  resizeMode="cover"
                  source={{ uri: item.image.url }}
                />
              </Pressable>
            </Box>
          </Box>
        )}
      />

      {showNewHome ? (
        <View
          style={[styles.bulletsWrapper, { width: newCarouselData.length * 24.5 }]}
        >
          {newCarouselData.map((item, i) => (
            <CarouselPaginationItem
              backgroundColor={COLORS.WHITE}
              animValue={progressValue}
              index={i}
              actualPosition={currIndex}
              key={`home-main-carousel-${item.image.url}`}
              length={newCarouselData.length}
              slideDelay={slideDelay}
              onFinishAnimation={() => $carousel.current?.next()}
            />
          ))}
        </View>
      ) : (
        <CarrouselScrollIndicator
          carouselLength={newCarouselData.length}
          actualPosition={currIndex}
          slideDelay={slideDelay}
          onFinishAnimation={() => $carousel.current?.next()}
        />
      )}
    </View>
  );
}

export default HomeMainCarousel;
