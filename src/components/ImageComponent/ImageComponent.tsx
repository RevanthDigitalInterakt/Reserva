import React, { memo } from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import configDeviceSizes from '../../utils/configDeviceSizes';

export interface TSource {
  uri: string;
}

interface IProps extends Omit<React.ComponentProps<typeof AutoHeightImage>, 'source' | 'width'> {
  source: TSource | number
  width?: number;
}

function ImageComponent({ ...props }: IProps) {
  return (
    <AutoHeightImage
      resizeMode="contain"
      width={configDeviceSizes.DEVICE_WIDTH}
      {...props}
    />
  );
}

export default memo(ImageComponent);
