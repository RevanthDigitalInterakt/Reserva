import React from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import configDeviceSizes from '../../utils/configDeviceSizes';

export interface TSource {
  uri: string;
}

interface IProps extends Omit<React.ComponentProps<typeof AutoHeightImage>, 'source' | 'width'> {
  source: TSource | number
  width?: number;
}

export default function ImageComponent({ ...props }: IProps) {
  return (
    <AutoHeightImage
      resizeMode="contain"
      width={configDeviceSizes.DEVICE_WIDTH}
      {...props}
    />
  );
}
