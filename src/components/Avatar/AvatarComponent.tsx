import React from 'react';
import type { ImageStyle, StyleProp } from 'react-native';
import { Button } from '../Button';
import ImageComponent, { type TSource } from '../ImageComponent/ImageComponent';
import { Box } from '../Box/Box';
import { IconLegacy } from '../IconLegacy/IconLegacy';

interface AvatarProps {
  imageSource?: TSource
  sizeImage?: number;
  sizeButton?: number;
  buttonEdit?: boolean;
  position?: {
    top?: number;
    right?: number;
    left?: number;
  }
  onPress: () => void;
  imageStyle: StyleProp<ImageStyle>
}

export function Avatar({
  imageSource,
  sizeImage = 60,
  sizeButton = 25,
  buttonEdit,
  position = {
    top: 0,
    right: 0,
    left: 44,
  },
  onPress,
  imageStyle,
}: AvatarProps) {
  return (
    <Box
      height={sizeImage}
      width={sizeImage}
      borderRadius="infinity"
      bg="neutroFrio1"
      alignItems="center"
      justifyContent="center"
    >
      {
        imageSource
          ? (
            <ImageComponent
              source={imageSource}
              width={sizeImage}
              height={sizeImage}
              resizeMode="cover"
              style={imageStyle}
            />
          )
          : (
            <Box
              height={sizeImage}
              width={sizeImage}
              borderRadius="infinity"
              bg="white"
              alignItems="center"
              justifyContent="center"
            >
              <IconLegacy name="User" color="neutroFrio1" size={sizeImage} />
            </Box>
          )
      }
      {buttonEdit
        && (
        <Box
          position="absolute"
          top={position.top}
          right={position.right}
          left={position.left}
          height={sizeButton}
          width={sizeButton}
        >
          <Button
            onPress={onPress}
            height={sizeButton}
            width={sizeButton}
            bg="neutroFrio2"
            borderRadius="infinity"
            alignItems="center"
            justifyContent="center"
          >
            <IconLegacy name="Edit" color="white" size={sizeButton * 0.7} />
          </Button>
        </Box>
        )}
    </Box>
  );
}
