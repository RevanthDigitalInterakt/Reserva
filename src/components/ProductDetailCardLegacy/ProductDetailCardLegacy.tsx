import React, { useEffect, useMemo, useState } from 'react';
import LottieView from 'lottie-react-native';
import DeviceInfo, { PowerState } from 'react-native-device-info';
import { Box, Icon, Typography } from '@usereservaapp/reserva-ui';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';

import { Button } from '../Button';
import { ImageSlider } from './components/ImageSlider';
import { DiscountLabel } from '../ProductVerticalListCard';
import IconComponent from '../IconComponent/IconComponent';

import { useIsTester } from '../../hooks/useIsTester';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { decimalPart, integerPart } from '../../utils/numberUtils';

import type { ProductDetailCardLegacyProps } from './types';
import { CarrouselMedias } from './components/CarrouselMedias';

export const ProductDetailCardLegacy = ({
  currency,
  images,
  discountTag,
  saleOff,
  title,
  installmentsNumber,
  installmentsPrice,
  imagesHeight,
  imagesWidth,
  price,
  priceWithDiscount,
  onClickShare,
  onGoBackImage,
  showZoomButton,
  onGoNextImage,
  videoThumbnail,
  onClickFavorite,
  isFavorited,
  loadingFavorite,
  setModalZoom,
  imageIndexActual,
  avaibleUnits,
  mktplaceNameComponent = null,
  testID,
}: ProductDetailCardLegacyProps) => {
  const isTester = useIsTester();
  const { getBoolean } = useRemoteConfig();

  const [statePhone, setStatePhone] = useState <Partial<PowerState> | null >(null);

  useEffect(() => {
    const checkBatterySaverStatus = async () => {
      try {
        const batterySaverEnabled = await DeviceInfo.getPowerState();
        setStatePhone(batterySaverEnabled);
      } catch (error) {
        console.error('Error checking battery saver status:', error);
      }
    };

    checkBatterySaverStatus();
  }, []);

  const videoActive = useMemo(() => (
    getBoolean(isTester ? 'pdp_show_video_tester' : 'pdp_show_video')
  ), [getBoolean, isTester]);

  const showVideoInCard = videoActive || !statePhone?.lowPowerMode;

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
          {showVideoInCard ? (
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
                    <Icon
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
                icon={<Icon name="Share" size={16} color="preto" />}
              />
            </Box>
          </Box>

          {showZoomButton && (
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
                icon={<Icon name="Expand" size={18} color="preto" />}
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
        <Box paddingBottom={16} paddingTop={6}>
          {mktplaceNameComponent}
        </Box>
        {!!discountTag && (
        <Box flexDirection="row">
          <Typography
            fontSize={15}
            fontFamily="reservaSansRegular"
            color="preto"
          >
            {`De ${currency || 'R$'} `}
          </Typography>
          <Typography
            fontFamily="reservaSansRegular"
            color="preto"
            fontSize={15}
            style={{
              textDecorationLine: 'line-through',
            }}
          >
            {`${integerPart(price)},`}
          </Typography>
          <Typography
            fontFamily="reservaSansRegular"
            color="preto"
            fontSize="10px"
            style={{
              textDecorationLine: 'line-through',
            }}
          >
            {`${decimalPart(price)}`}
          </Typography>
        </Box>
        )}

        <Box marginTop="quarck" flexDirection="row" alignItems="center">
          <Box>
            <Box flexDirection="row">
              {!!priceWithDiscount && (
              <Box flexDirection="row">
                <Typography
                  fontFamily="reservaSansRegular"
                  fontSize={24}
                  color="neutroFrio2"
                >
                  {`${currency || 'R$'} ${integerPart(priceWithDiscount)},`}
                </Typography>
                <Typography
                  fontFamily="reservaSansRegular"
                  fontSize="10px"
                  color="neutroFrio2"
                >
                  {`${decimalPart(priceWithDiscount)}`}
                </Typography>
              </Box>
              )}
            </Box>
          </Box>
          <Box
            bg="neutroFrio2"
            width="1px"
            height={discountTag ? '30px' : '20px'}
            marginX="micro"
          />
          {installmentsNumber > 0 && (
          <>
            <Box flexDirection="row">
              <Box flexDirection="row" alignItems="baseline">
                <Typography
                  fontFamily="reservaSansRegular"
                  fontSize={18}
                  color={discountTag ? 'vermelhoRSV' : 'preto'}
                >
                  {installmentsNumber}
                  x
                </Typography>
                <Typography
                  fontFamily="reservaSansBold"
                  fontSize={24}
                  color={discountTag ? 'vermelhoRSV' : 'preto'}
                >
                  {` ${currency || 'R$'} ${integerPart(installmentsPrice)},`}
                </Typography>
              </Box>
              <Typography
                fontFamily="reservaSansBold"
                fontSize="11px"
                color={discountTag ? 'vermelhoRSV' : 'preto'}
              >
                {`${decimalPart(installmentsPrice)}`}
              </Typography>
            </Box>
          </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
