import React from 'react';
import { Image, View } from 'react-native';
import configDeviceSizes from '../../../../../../utils/configDeviceSizes';
import styles from './styles';
import type { BodyImagesCollectionOutput, Maybe } from '../../../../../../base/graphql/generated';

interface IImageProps {
  data: Maybe<BodyImagesCollectionOutput>;
}

export default function ImageComponent({ data }: IImageProps) {
  if (!data?.items) return null;

  const images = data?.items[0]?.helpCenterImagesCollection;

  return (
    <View>
      {images && (
        <View
          style={styles.containerImage}
        >
          {images?.items?.map((image) => (
            <Image
              key={`image-helpCenter-${image?.url}`}
              source={{ uri: image?.url }}
              style={{
                height: configDeviceSizes.DEVICE_WIDTH * 0.5,
              }}
              resizeMode="contain"
            />
          ))}
        </View>
      )}
    </View>
  );
}
