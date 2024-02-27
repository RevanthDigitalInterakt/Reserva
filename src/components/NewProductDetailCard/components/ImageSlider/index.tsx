/* eslint-disable react/no-array-index-key */
import React, {
  useCallback, useRef, useState,
} from 'react';
import {
  ScrollView,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  Animated,
  TouchableOpacity,
} from 'react-native';

import ImageComponent from '../../../ImageComponent/ImageComponent';
import type { ImageSliderProps } from './types';
import { Box } from '../../../Box/Box';
import { BulletsAnimated } from '../../../../pages/ProductDetail/components/BulletsAnimated';
import IconComponent from '../../../IconComponent/IconComponent';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { ProductResultActionEnum } from '../../../../base/graphql/generated';

export function ImageSlider({
  images,
  width = 360,
  height = 374,
  onGoBack,
  onGoNext,
  imageIndexActual,
}: ImageSliderProps) {
  const { productDetail } = useProductDetailStore(['productDetail']);

  const [actualImage, setActualImage] = useState(0);
  const isKitLook = productDetail?.action === ProductResultActionEnum.ShowKit;

  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  imageIndexActual?.(actualImage);

  const onChangeImage = (
    scrollEvent: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const actualItem = Math.ceil(
      scrollEvent.nativeEvent.contentOffset.x / (width + 12),
    );

    if (
      actualItem !== actualImage
      && images
      && actualItem <= Math.ceil(images.length)
    ) {
      setActualImage(actualItem);
    }
  };

  const goNext = useCallback(() => {
    if (onGoNext) {
      onGoNext({
        image: images[actualImage + 1] || '',
        index: actualImage + 1,
      });
    }

    scrollRef.current?.scrollTo({ x: (actualImage + 1) * width });
  }, [actualImage, images, onGoNext, width]);

  const goBack = useCallback(() => {
    if (onGoBack) {
      onGoBack({
        image: images[actualImage - 1] || '',
        index: actualImage - 1,
      });
    }

    scrollRef.current?.scrollTo({ x: (actualImage - 1) * width });
  }, [actualImage, images, onGoBack, width]);

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
        {actualImage < images?.length - 1 && (
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
          {images?.map((image) => (
            <Box key={`product-card-${image}`} alignItems="center" width={width} height={height}>
              <ImageComponent
                key={image}
                source={{ uri: image }}
                height={height}
                width={width}
                resizeMode="contain"
              />
            </Box>
          ))}
        </Animated.ScrollView>
      </Box>

      {isKitLook && <BulletsAnimated data={images} scrollX={scrollX} />}
    </>
  );
}
