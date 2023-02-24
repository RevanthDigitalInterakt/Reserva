import React from 'react';
import { Box, Typography } from '@usereservaapp/reserva-ui';
import {
  ImageBackground,
  ImageSourcePropType,
  TouchableHighlight,
  View,
} from 'react-native';
import configDeviceSizes from '../../../../../../utils/configDeviceSizes';

export interface ModalityCardProps {
  imageSource: ImageSourcePropType;
  title: string;
  description: string;
  onPress?: () => void;
}

export const ModalityCard: React.FC<ModalityCardProps> = ({
  imageSource,
  description,
  title,
  onPress,
}) => {
  const MARGIN = 20;
  const cardWidth = configDeviceSizes.DEVICE_WIDTH - 2 * MARGIN;
  const cardHeight = (cardWidth * 182) / 320;

  return (
    <View
      style={{
        marginBottom: MARGIN,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
          height: 4,
          width: 4,
        },
        shadowRadius: 8,
        elevation: 13,
      }}
    >
      <TouchableHighlight
        style={{ width: cardWidth, height: cardHeight, borderRadius: 20 }}
        onPress={onPress}
      >
        <ImageBackground
          style={{
            borderRadius: 20,
            width: cardWidth,
            height: cardHeight,
          }}
          source={imageSource}
        >
          <Box justifyContent="center" alignItems="center" flex={1}>
            <Typography
              fontFamily="reservaSerifBoldItalic"
              fontSize={44}
              color="white"
            >
              {title}
            </Typography>
            <Typography
              fontFamily="reservaSansLight"
              fontSize={16}
              color="white"
              textAlign="center"
              lineHeight="20"
            >
              {description}
            </Typography>
          </Box>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );
};
