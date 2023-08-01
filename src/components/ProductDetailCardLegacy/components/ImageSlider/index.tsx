/* eslint-disable react/no-array-index-key */
import React, { createRef, useCallback, useState } from 'react';
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Box, Icon } from '@usereservaapp/reserva-ui';
import { Button } from '../../../Button';
import type { ImageSliderProps } from './types';
import ImageComponent from '../../../ImageComponent/ImageComponent';

const scrollref = createRef<ScrollView>();

export const ImageSlider = ({
  images,
  width = 360,
  height = 374,
  onGoBack,
  onGoNext,
  imageIndexActual,
}: ImageSliderProps) => {
  const [actualImage, setActualImage] = useState(0);

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

    scrollref.current?.scrollTo({ x: (actualImage + 1) * width });
  }, [actualImage, images, onGoNext, width]);

  const goBack = useCallback(() => {
    if (onGoBack) {
      onGoBack({
        image: images[actualImage - 1] || '',
        index: actualImage - 1,
      });
    }

    scrollref.current?.scrollTo({ x: (actualImage - 1) * width });
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
            icon={<Icon name="ChevronLeft" color="neutroFrio2" size={23} />}
          />
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
          <Button
            p="nano"
            variant="icone"
            onPress={() => {
              goNext();
            }}
            icon={<Icon name="ChevronRight" color="neutroFrio2" size={23} />}
          />
        </Box>
      )}
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={(event) => {
          onChangeImage(event);
        }}
        ref={scrollref}
        showsHorizontalScrollIndicator={false}
      >
        {images?.map((image, index) => (
          <Box key={`product-card-${index}`} alignItems="center" width={width} height={height}>
            <ImageComponent
              key={index}
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
};
