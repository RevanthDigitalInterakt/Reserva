import React, { useCallback, useRef, useState } from 'react';
import Video from 'react-native-video';
import { Box, Icon } from '@usereservaapp/reserva-ui';
import {
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableWithoutFeedback,
} from 'react-native';

import { Button } from '../../../Button';
import ImageComponent from '../../../ImageComponent/ImageComponent';

import type { IParamsCarrouselMedias } from './types';

export const CarrouselMedias = ({
  images,
  onGoBack,
  onGoNext,
  width = 360,
  height = 374,
  videoThumbnail,
  imageIndexActual,
}: IParamsCarrouselMedias) => {
  const [actualImage, setActualImage] = useState(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const videoRef = useRef<Video>(null);
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
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
      >
        {videoThumbnail ? (
          <TouchableWithoutFeedback
            key={`product-card-${videoThumbnail}`}
            onPress={() => setIsPaused(!isPaused)}
            style={{
              width,
              height,
            }}
          >
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
                backgroundColor: 'red',
              }}
            />
          </TouchableWithoutFeedback>
        ) : null}

        {images?.map((image) => (
          <Box
            key={`product-card-${image}`}
            alignItems="center"
            width={width}
            height={height}
          >
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
};
