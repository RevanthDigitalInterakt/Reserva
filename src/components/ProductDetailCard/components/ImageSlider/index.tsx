import React, {
  useCallback, useRef, useState,
} from 'react';
import {
  ScrollView,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { Button } from '../../../Button';
import ImageComponent from '../../../ImageComponent/ImageComponent';
import type { ImageSliderProps } from './types';
import { Box } from '../../../Box/Box';
import { IconLegacy } from '../../../IconLegacy/IconLegacy';

export function ImageSlider({
  images,
  width = 360,
  height = 374,
  onGoBack,
  onGoNext,
  imageIndexActual,
}: ImageSliderProps) {
  const [actualImage, setActualImage] = useState(0);

  const scrollRef = useRef<ScrollView>(null);

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
    <Box width={width} height={height}>
      {actualImage > 0 && (
      <Box
        position="absolute"
        style={{ elevation: 3 }}
        zIndex={1}
        left={32}
        top={height / 2 - 32}
      >
        <Button
          p="nano"
          variant="icone"
          onPress={() => {
            goBack();
          }}
          icon={<IconLegacy name="ChevronLeft" color="neutroFrio2" size={23} />}
        />
      </Box>
      )}
      {actualImage < (images?.length || 0) - 1 && (
      <Box
        position="absolute"
        style={{ elevation: 3 }}
        zIndex={1}
        right={32}
        top={height / 2 - 32}
      >
        <Button
          p="nano"
          variant="icone"
          onPress={() => {
            goNext();
          }}
          icon={<IconLegacy name="ChevronRight" color="neutroFrio2" size={23} />}
        />
      </Box>
      )}
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={(event) => {
          onChangeImage(event);
        }}
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
      </ScrollView>
    </Box>
  );
}
