import React from 'react';
import { Text, View } from 'react-native';

import configDeviceSizes from '../../utils/configDeviceSizes';
import { Button } from '../Button';
import ImageComponent from '../ImageComponent/ImageComponent';
import IconComponent from '../IconComponent/IconComponent';
import styles from './styles';

export interface ProductVerticalListCardProps {
  imageSource: string
  productTitle: string
  onClickImage?: () => void
  testID?: string;
}

export function ProductKitLookVerticalListCard({
  imageSource,
  onClickImage,
  productTitle,
  testID,
}: ProductVerticalListCardProps) {
  return (
    <View
      style={styles.mainContainer}
    >
      <Button
        onPress={() => {
          if (onClickImage) {
            onClickImage();
          }
        }}
        testID={testID}
      >
        <ImageComponent
          source={{ uri: imageSource }}
          width={configDeviceSizes.DEVICE_WIDTH * 0.45}
          height={240}
        />
      </Button>

      <View
        style={styles.childContainer}
      >
        <View
          style={styles.textContainer}
        >
          <Text
            style={styles.textTitle}
          >
            {productTitle}
          </Text>
        </View>

        <IconComponent icon="arrowBack" />

      </View>
    </View>
  );
}
