import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import {
  ScrollView,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

import ImageComponent from '../../../ImageComponent/ImageComponent';
import { Box } from '../../../Box/Box';
import type { IParamsCarrouselMedias } from './types';
import { BulletsAnimated } from '../../../../pages/ProductDetail/components/BulletsAnimated';
import IconComponent from '../../../IconComponent/IconComponent';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { ProductResultActionEnum } from '../../../../base/graphql/generated';

export function CarrouselMedias({
  images,
  onGoBack,
  onGoNext,
  width = 360,
  height = 374,
  videoThumbnail,
  imageIndexActual,
}: IParamsCarrouselMedias) {
  const { productDetail } = useProductDetailStore(['productDetail']);
  const [actualImage, setActualImage] = useState(0);
  const isKitLook = productDetail?.action === ProductResultActionEnum.ShowKit;

  const videoRef = useRef<Video>(null);
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  imageIndexActual?.(actualImage);

  const medias = useMemo(() => (
    videoThumbnail ? [videoThumbnail, ...images] : images
  ), [images, videoThumbnail]);

  const onChangeImage = (
    scrollEvent: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const actualItem = Math.ceil(
      scrollEvent.nativeEvent.contentOffset.x / (width + 12),
    );

    if (
      actualItem !== actualImage
      && medias
      && actualItem <= Math.ceil(medias.length)
    ) {
      setActualImage(actualItem);
    }
  };

  const goNext = useCallback(() => {
    if (onGoNext) {
      onGoNext({
        image: medias[actualImage + 1] || '',
        index: actualImage + 1,
      });
    }

    scrollRef.current?.scrollTo({ x: (actualImage + 1) * width });
  }, [actualImage, medias, onGoNext, width]);

  const goBack = useCallback(() => {
    if (onGoBack) {
      onGoBack({
        image: medias[actualImage - 1] || '',
        index: actualImage - 1,
      });
    }

    scrollRef.current?.scrollTo({ x: (actualImage - 1) * width });
  }, [actualImage, medias, onGoBack, width]);

  return (
    <>
      <Box width={width} height={height}>
        {actualImage > 0 && (
          <Box
            position="absolute"
            style={{ elevation: 3 }}
            zIndex={1}
            left={32}
            top={height / 2 - 32}
          >
            <TouchableOpacity
              onPress={() => {
                goBack();
              }}
            >
              <IconComponent
                icon="chevronLeftFill"
                width={32}
                height={32}
              />
            </TouchableOpacity>
          </Box>
        )}
        {actualImage < (medias?.length || 0) - 1 && (
          <Box
            position="absolute"
            style={{ elevation: 3 }}
            zIndex={1}
            right={32}
            top={height / 2 - 32}
          >
            <TouchableOpacity
              onPress={() => {
                goNext();
              }}
            >
              <IconComponent
                icon="chevronRightFill"
                width={32}
                height={32}
              />
            </TouchableOpacity>
          </Box>
        )}
        <Animated.ScrollView
          horizontal
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                listener(event: NativeSyntheticEvent<NativeScrollEvent>) {
                  onChangeImage(event);
                },
                useNativeDriver: true,
              },
            )
          }
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
        >
          {medias?.map((media, index) => (
            <Box
              key={`product-card-${media}`}
              alignItems="center"
              width={width}
              height={height}
            >
              {videoThumbnail && index === 0 ? (
                <Video
                  ref={videoRef}
                  source={{
                    uri: videoThumbnail,
                  }}
                  resizeMode="cover"
                  paused={false}
                  repeat
                  style={{
                    width,
                    height,
                  }}
                />
              )
                : (
                  <ImageComponent
                    key={media}
                    source={{ uri: media }}
                    height={height}
                    width={width}
                    resizeMode="contain"
                  />
                )}
            </Box>
          ))}
        </Animated.ScrollView>
      </Box>

      {isKitLook && <BulletsAnimated data={images} scrollX={scrollX} />}
    </>
  );
}
