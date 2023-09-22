import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Pressable, View } from 'react-native';
import { Box } from '@usereservaapp/reserva-ui';
import { useSharedValue } from 'react-native-reanimated';
import testProps from '../../../../utils/testProps';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import type { HomeCarouselItemOutput, HomeCarouselOutput } from '../../../../base/graphql/generated';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import { COLORS } from '../../../../base/styles/colors';
import { styles } from './HomeMainCarousel.styles';
import CarrouselScrollIndicator from '../../../../modules/Home/component/CarouselScrollIndicator';
import CarouselPaginationItem from '../../../../components/CarouselPaginationItem';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';

interface IHomeMainCarousel {
  data: HomeCarouselOutput;
}

function HomeMainCarousel({ data }: IHomeMainCarousel) {
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
  }, [data.items]);

  const onPress = useCallback(
    (item: HomeCarouselItemOutput) => {
      const { reservaMini, orderBy } = item;

      return navigation.navigate('ProductCatalog', {
        facetInput: item.facets,
        referenceId: item.reference,
        reservaMini,
        orderBy,
      });
    },
    [navigation],
  );

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
        enabled={data.items.length > 1}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
        data={data.items}
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
          style={[styles.bulletsWrapper, { width: data.items.length * 24.5 }]}
        >
          {data.items.map((item, i) => (
            <CarouselPaginationItem
              backgroundColor={COLORS.WHITE}
              animValue={progressValue}
              index={i}
              actualPosition={currIndex}
              key={`home-main-carousel-${item.image.url}`}
              length={data.items.length}
            />
          ))}
        </View>
      ) : (
        <CarrouselScrollIndicator
          carouselLength={data.items.length}
          actualPosition={currIndex}
          slideDelay={slideDelay}
          onFinishAnimation={() => $carousel.current?.next()}
        />
      )}
    </View>
  );
}

export default HomeMainCarousel;
