import React, { useMemo } from 'react';
import LottieView from 'lottie-react-native';

import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { IKitLookDetailCardProps } from './types';
import styles from './styles';
import { useIsTester } from '../../../../../../hooks/useIsTester';
import { useRemoteConfig } from '../../../../../../hooks/useRemoteConfig';
import { CarrouselMedias } from '../../../../../../components/ProductDetailCardLegacy/components/CarrouselMedias';
import { ImageSlider } from '../../../../../../components/NewProductDetailCard/components/ImageSlider';
import { Box } from '../../../../../../components/Box/Box';
import IconComponent from '../../../../../../components/IconComponent/IconComponent';
import { loadingSpinner } from '../../../../../../../assets/animations';

function KitLookDetailCard({
  images,
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
  showZoomButton,
  videoThumbnail,
  testID,
}: IKitLookDetailCardProps) {
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
    <View style={styles.container}>
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

        <View style={styles.cardCallToActionButtonsWrapper}>
          <Box style={styles.cardCallToActionButtonsContentWrapper}>
            {loadingFavorite ? (
              <Box style={styles.loaderWrapper}>
                <LottieView
                  source={loadingSpinner}
                  style={styles.lottieView}
                  autoPlay
                  loop
                />
              </Box>
            ) : (
              <TouchableOpacity
                style={styles.favoriteButton}
                testID={`${testID}_favorite`}
                onPress={() => {
                  if (onClickFavorite) {
                    onClickFavorite(!isFavorited);
                  }
                }}
              >
                <IconComponent
                  icon={isFavorited ? 'filledHeart' : 'unfilledHeart'}
                  style={styles.favoriteIcon}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.shareButton}
              testID={`${testID}_share`}
              onPress={onClickShare}
            >
              <IconComponent
                icon="share"
                style={styles.shareIcon}
              />
            </TouchableOpacity>
          </Box>
        </View>

        {hasZoomButton && (
          <View style={styles.zoomButtonWrapper}>
            <TouchableOpacity
              style={styles.zoomButton}
              onPress={setModalZoom}
              testID={`${testID}_zoom`}
            >
              <IconComponent
                icon="expand"
                style={styles.zoomIcon}
              />
            </TouchableOpacity>
          </View>
        )}

      </View>
      <View style={styles.productInfoContentWrapper}>
        <Text style={styles.productInfoTitle}>
          {title}
        </Text>
      </View>
    </View>
  );
}

export default KitLookDetailCard;
