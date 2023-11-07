import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import {
  ScrollView,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import Video from 'react-native-video';

import { Button } from '../../../Button';
import ImageComponent from '../../../ImageComponent/ImageComponent';

import { Box } from '../../../Box/Box';
import { IconLegacy } from '../../../IconLegacy/IconLegacy';
import type { IParamsCarrouselMedias } from './types';

export function CarrouselMedias({
  images,
  onGoBack,
  onGoNext,
  width = 360,
  height = 374,
  videoThumbnail,
  imageIndexActual,
}: IParamsCarrouselMedias) {
  const [actualImage, setActualImage] = useState(0);

  const videoRef = useRef<Video>(null);
  const scrollRef = useRef<ScrollView>(null);

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
      {actualImage < (medias?.length || 0) - 1 && (
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
      </ScrollView>
    </Box>
  );
}
