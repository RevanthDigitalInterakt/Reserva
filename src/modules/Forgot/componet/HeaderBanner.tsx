/* eslint-disable react/function-component-definition */
import React from 'react';
import ProgressBar from 'react-native-progress/Bar';
import ImageComponent from '../../../components/ImageComponent/ImageComponent';
import type { TSource } from '../../../components/IconComponent/IconComponent';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { theme } from '../../../base/usereservappLegacy/theme';
import { IconChevronLeftSmall } from '../../../components/IconLegacy/Svg';

const HeaderBanner: React.FC<{
  onClickGoBack?: () => void,
  imageHeader: TSource,
  loading?: boolean
  newIconGoBack?: boolean
}> = ({
  onClickGoBack,
  imageHeader,
  loading,
  newIconGoBack = false,
}) => (
  <Box>
    {!newIconGoBack
      ? (
        <Box position="absolute" top={10} left={10} zIndex={4} style={{ elevation: 3 }}>
          <Button onPress={onClickGoBack}>
            <IconLegacy name="ArrowBack" size={24} color="preto" />
          </Button>
        </Box>
      )
      : (
        <Box position="absolute" top={16} left={16} zIndex={4} style={{ elevation: 3 }}>
          <Button onPress={onClickGoBack}>
            <IconChevronLeftSmall color="#000" />
          </Button>
        </Box>
      )}
    <ImageComponent
      resizeMode="cover"
      source={imageHeader}
    />
    {loading
    && (
    <Box top={0} height={1} justifyContent="flex-end">
      <ProgressBar
        animated
        indeterminate
        color={theme.colors.vermelhoAlerta}
        height={2}
        borderWidth={0}
        width={null}
        borderRadius={0}
      />
    </Box>
    )}
  </Box>
);

export default HeaderBanner;
