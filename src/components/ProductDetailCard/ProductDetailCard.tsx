import { Box, Icon, Typography } from '@usereservaapp/reserva-ui';
import LottieView from 'lottie-react-native';
import React, {
  createRef, useRef, useState,
} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';
import Video from 'react-native-video';
import { DiscountLabel } from '../ProductVerticalListCard';
import { Button } from '../Button';
import configDeviceSizes from '../../utils/configDeviceSizes';

import IconComponent from '../IconComponent/IconComponent';

export interface ProductDetailCardProps {
  currency?: string
  images: string[]
  discountTag?: number
  saleOff?: string
  title: string
  installmentsNumber: number
  installmentsPrice: number
  price: number
  priceWithDiscount?: number
  imagesWidth?: number
  imagesHeight?: number
  isFavorited?: boolean
  loadingFavorite?: boolean
  onClickFavorite?: (favoriteState: boolean) => void
  onClickShare?: () => void
  onGoNextImage?: (next: { image: string; index: number }) => void
  onGoBackImage?: (back: { image: string; index: number }) => void
  setModalZoom?(isVisible: boolean): void
  imageIndexActual?: (indexImage: number) => number
  avaibleUnits?: number;
  testID?: string;
}

export interface ImageSliderProps {
  images: string[]
  onGoNext?: (next: { image: string; index: number }) => void
  onGoBack?: (back: { image: string; index: number }) => void
  width?: number
  height?: number
  imageIndexActual?: (indexImage: number) => number
}

const scrollref = createRef<ScrollView>();

export const ImageSlider = ({
  images,
  width,
  height,
  onGoBack,
  onGoNext,
  imageIndexActual,
}: ImageSliderProps) => {
  const [actualImage, setActualImage] = useState(0);
  if (!height) height = 374;

  imageIndexActual(actualImage);

  const midias = [
    ...images,
    'https://assets.mixkit.co/videos/preview/mixkit-close-view-of-denim-fabric-texture-34500-large.mp4',
  ];

  const onChangeImage = (
    scrollEvent: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    if (!width) width = 360;
    const actualItem = Math.ceil(
      scrollEvent.nativeEvent.contentOffset.x / (width + 12),
    );

    if (
      actualItem !== actualImage
      && midias
      && actualItem <= Math.ceil(midias.length)
    ) {
      setActualImage(actualItem);
    }
  };
  const goNext = () => {
    if (onGoNext) {
      onGoNext({ image: midias[actualImage + 1], index: actualImage + 1 });
    }

    if (!width) width = 360;
    scrollref.current?.scrollTo({ x: (actualImage + 1) * width });
  };
  const goBack = () => {
    if (onGoBack) {
      onGoBack({ image: midias[actualImage - 1], index: actualImage - 1 });
    }

    if (!width) width = 360;
    scrollref.current?.scrollTo({ x: (actualImage - 1) * width });
  };
  // instance of video
  const videoRef = useRef<Video>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);
  const [count, setCount] = useState(0);

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
      {actualImage < midias?.length - 1 && (
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
        {midias?.map((image, index) => (
          <TouchableWithoutFeedback
            // eslint-disable-next-line react/no-array-index-key
            key={`index${index}`}
            onPress={() => setIsPaused(!isPaused)}
          >
            <Video
              ref={videoRef}
              source={{
                uri: image,
              }}
              resizeMode="cover"
              paused={false}
              repeat
              style={{
                width: configDeviceSizes.DEVICE_WIDTH,
                height: configDeviceSizes.DEVICE_HEIGHT,
                backgroundColor: 'red',
              }}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </Box>
  );
};

export const ProductDetailCard = ({
  images,
  discountTag,
  saleOff,
  title,
  imagesHeight,
  imagesWidth,
  onClickShare,
  onGoBackImage,
  onGoNextImage,
  onClickFavorite,
  isFavorited,
  loadingFavorite,
  setModalZoom,
  imageIndexActual,
  avaibleUnits,
  testID,
}: ProductDetailCardProps) => (
  <Box alignItems="center" justifyContent="center">
    <Box>
      {!!discountTag && (
      <Box
        position="absolute"
        style={{ elevation: 3 }}
        zIndex={1}
        left={0}
        top={0}
      >
        <DiscountLabel
          discountTag={discountTag}
          width={80}
          height={80}
          isDetail
        />
      </Box>
      )}
      {saleOff && (
      <Box style={{ elevation: 3 }} position="absolute" top={discountTag ? 80 : 0} left={0} zIndex={1}>
        <IconComponent
          icon="saleOff"
          width={80}
          height={80}
        />
      </Box>
      )}
      <Box>
        <ImageSlider
          width={imagesWidth}
          height={imagesHeight}
          images={images}
          onGoBack={(back) => {
            if (onGoBackImage) {
              onGoBackImage(back);
            }
          }}
          onGoNext={(back) => {
            if (onGoNextImage) {
              onGoNextImage(back);
            }
          }}
          imageIndexActual={imageIndexActual}
        />

        <Box
          position="absolute"
          top="2%"
          right="4%"
        >
          <Box
            alignSelf="flex-start"
            paddingTop="quarck"
          >
            {
                loadingFavorite
                  ? (
                    <Box
                      width={20}
                      height={20}
                    >
                      <LottieView
                        source={loadingSpinner}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        autoPlay
                        loop
                      />
                    </Box>
                  )
                  : (
                    <Button
                      backgroundColor="rgba(255, 255, 255, 0.4)"
                      borderRadius={50}
                      alignItems="center"
                      justifyContent="center"
                      width={36}
                      height={36}
                      variant="icone"
                      testID={`${testID}_favorite`}
                      onPress={() => {
                        if (onClickFavorite) {
                          onClickFavorite(!isFavorited);
                        }
                      }}
                      icon={(
                        <Icon
                          name={isFavorited ? 'HeartRaised' : 'Heart'}
                          size={20}
                          color="preto"
                        />
                    )}
                    />
                  )
}
            <Button
              backgroundColor="rgba(255, 255, 255, 0.4)"
              borderRadius={50}
              alignItems="center"
              justifyContent="center"
              width={36}
              height={36}
              mt="nano"
              variant="icone"
              testID={`${testID}_share`}
              onPress={onClickShare}
              icon={<Icon name="Share" size={16} color="preto" />}
            />
          </Box>
        </Box>

        <Box
          position="absolute"
          bottom="3%"
          right="4%"
        >
          <Button
            backgroundColor="rgba(255, 255, 255, 0.4)"
            borderRadius={50}
            alignItems="center"
            justifyContent="center"
            width={36}
            height={36}
            variant="icone"
            onPress={setModalZoom}
            testID={`${testID}_zoom`}
            icon={<Icon name="Expand" size={18} color="preto" />}
          />
        </Box>
      </Box>
    </Box>

    {avaibleUnits && avaibleUnits !== 0 && avaibleUnits <= 5
        && (
        <Box width="100%" paddingY="quarck" bg="vermelhoAlerta" display="flex" justifyContent="center" alignItems="center">
          <Typography color="white" fontWeight="SemiBold" fontFamily="nunitoRegular">ÚLTIMAS UNIDADES</Typography>
        </Box>
        )}

    <Box width="100%" paddingX="xxxs" marginTop="xxxs">
      <Box
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
        mb="xxxs"
      >
        <Box flex={1}>
          <Typography
            fontFamily="reservaSerifRegular"
            fontSize={24}
            textAlign="left"
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);
