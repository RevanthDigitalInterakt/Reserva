import LottieView from 'lottie-react-native';
import React, { useMemo } from 'react';

import { loadingSpinner } from '../../../assets/animations';
import { useIsTester } from '../../hooks/useIsTester';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import IconComponent from '../IconComponent/IconComponent';
import { CarrouselMedias } from '../ProductDetailCardLegacy/components/CarrouselMedias';
import { DiscountLabel } from '../ProductVerticalListCard';
import { Typography } from '../Typography/Typography';
import { ImageSlider } from './components/ImageSlider';
import type { ProductDetailCardProps } from './types';
import { IconLegacy } from '../IconLegacy/IconLegacy';

export function ProductDetailCard({
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
  showZoomButton,
  videoThumbnail,
  testID,
}: ProductDetailCardProps) {
  const isTester = useIsTester();
  const { getBoolean } = useRemoteConfig();

  const videoActive = useMemo(
    () => getBoolean(isTester ? 'pdp_show_video_tester' : 'pdp_show_video'),
    [getBoolean, isTester],
  );

  const hasZoomButton = useMemo(() => (
    videoActive ? showZoomButton : true
  ), [videoActive, showZoomButton]);

  return (
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
          <Box
            style={{ elevation: 3 }}
            position="absolute"
            top={discountTag ? 80 : 0}
            left={0}
            zIndex={1}
          >
            <IconComponent icon="saleOff" width={80} height={80} />
          </Box>
        )}

        <Box>
          {videoActive ? (
            <CarrouselMedias
              images={images}
              width={imagesWidth}
              height={imagesHeight}
              videoThumbnail={videoThumbnail}
              imageIndexActual={imageIndexActual}
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
            />
          ) : (
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
          )}

          <Box position="absolute" top="2%" right="4%">
            <Box alignSelf="flex-start" paddingTop="quarck">
              {loadingFavorite ? (
                <Box width={20} height={20}>
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
              ) : (
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
                    <IconLegacy
                      name={isFavorited ? 'HeartRaised' : 'Heart'}
                      size={20}
                      color="preto"
                    />
                  )}
                />
              )}
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
                icon={<IconLegacy name="Share" size={16} color="preto" />}
              />
            </Box>
          </Box>
          {hasZoomButton && (
            <Box position="absolute" bottom="3%" right="4%">
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
                icon={<IconLegacy name="Expand" size={18} color="preto" />}
              />
            </Box>
          )}
        </Box>
      </Box>

      {avaibleUnits && avaibleUnits !== 0 && avaibleUnits <= 5 && (
        <Box
          width="100%"
          paddingY="quarck"
          bg="vermelhoAlerta"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            color="white"
            fontWeight="SemiBold"
            fontFamily="nunitoRegular"
          >
            ÚLTIMAS UNIDADES
          </Typography>
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
}
