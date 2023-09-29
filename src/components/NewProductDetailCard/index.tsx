import React, { useMemo } from 'react';
import LottieView from 'lottie-react-native';
import { Box } from '@usereservaapp/reserva-ui';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';

import { Text, TouchableOpacity, View } from 'react-native';
import { ImageSlider } from './components/ImageSlider';
import IconComponent from '../IconComponent/IconComponent';
import { FlagDiscount } from '../FlagDiscount/FlagDiscount';

import type { ProductDetailCardProps } from './types';
import { useIsTester } from '../../hooks/useIsTester';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { CarrouselMedias } from '../ProductDetailCardLegacy/components/CarrouselMedias';
import styles from './styles';

export const NewProductDetailCard = ({
  images,
  discountTag,
  saleOff,
  title,
  giftCardFirstPriceOption,
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
}: ProductDetailCardProps) => {
  const isTester = useIsTester();
  const { getBoolean } = useRemoteConfig();

  const videoActive = useMemo(
    () => getBoolean(isTester ? 'pdp_show_video_tester' : 'pdp_show_video'),
    [getBoolean, isTester],
  );

  const hasZoomButton = useMemo(() => (
    videoActive ? showZoomButton : true
  ), [videoActive, showZoomButton]);

  const isTheLastUnits = useMemo(() => avaibleUnits && avaibleUnits !== 0 && avaibleUnits <= 5,
    [avaibleUnits]);

  return (
    <View style={styles(!!discountTag).container}>
      <View>
        {!!discountTag && (
          <View style={styles(!!discountTag).flagWrapper}>
            <FlagDiscount
              discountTag={discountTag}
              isDetail
            />
          </View>
        )}
        {saleOff && (
          <View
            style={styles(!!discountTag).saleOffWrapper}
          >
            <IconComponent icon="saleOff" style={styles(!!discountTag).saleOffIcon} width={80} height={80} />
          </View>
        )}

        <View>
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

          <View style={styles(!!discountTag).cardCallToActionButtonsWrapper}>
            <Box style={styles(!!discountTag).cardCallToActionButtonsContentWrapper}>
              {loadingFavorite ? (
                <Box style={styles(!!discountTag).loaderWrapper}>
                  <LottieView
                    source={loadingSpinner}
                    style={styles(!!discountTag).lottieView}
                    autoPlay
                    loop
                  />
                </Box>
              ) : (
                <TouchableOpacity
                  style={styles(!!discountTag).favoriteButton}
                  testID={`${testID}_favorite`}
                  onPress={() => {
                    if (onClickFavorite) {
                      onClickFavorite(!isFavorited);
                    }
                  }}
                >
                  <IconComponent
                    icon={isFavorited ? 'filledHeart' : 'unfilledHeart'}
                    style={styles(!!discountTag).favoriteIcon}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles(!!discountTag).shareButton}
                testID={`${testID}_share`}
                onPress={onClickShare}
              >
                <IconComponent
                  icon="share"
                  style={styles(!!discountTag).shareIcon}
                />
              </TouchableOpacity>
            </Box>
          </View>
          {hasZoomButton && (
            <View style={styles(!!discountTag).zoomButtonWrapper}>
              <TouchableOpacity
                style={styles(!!discountTag).zoomButton}
                onPress={setModalZoom}
                testID={`${testID}_zoom`}
              >
                <IconComponent
                  icon="expand"
                  style={styles(!!discountTag).zoomIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {isTheLastUnits && (
        <View style={styles(!!discountTag).lastUnitsWrapper}>
          <Text style={styles(!!discountTag).lastUnitsText}>
            ÚLTIMAS UNIDADES
          </Text>
        </View>
      )}

      <View style={styles(!!discountTag).productInfoWrapper}>
        <View style={styles(!!discountTag).productInfoContentWrapper}>
          <Text style={styles(!!discountTag).productInfoTitle}>
            {title}
          </Text>
          <View style={styles(!!discountTag).productInfoSubtitleWrapper}>
            <Text style={styles(!!discountTag).productInfoSubtitle}>
              a partir de
            </Text>
            <Text style={styles(!!discountTag).productInfoSubtitleIntegerAmount}>
              {' '}
              {giftCardFirstPriceOption?.replace(/\s/, '')?.match(/(.*,)/)?.[0]}
            </Text>
            <Text style={styles(!!discountTag).productInfoSubtitleFloatAmount}>
              {giftCardFirstPriceOption?.replace(/\s/, '')?.match(/,(\d{2})/)?.[1]}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
