import React from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import icons from '../../base/styles/icons';

export interface TSource {
  uri: string;
}

interface IProps extends Omit<React.ComponentProps<typeof AutoHeightImage>, 'source' | 'width' | 'height'> {
  icon: keyof typeof icons;
  source?: TSource | number
  width?: number;
  height?: number;
}

const defaultIconSize = 60;

export default function IconComponent({ icon, ...rest }: IProps) {
  return (
    <AutoHeightImage
      resizeMode="contain"
      source={icons[icon]}
      width={defaultIconSize}
      height={defaultIconSize}
      {...rest}
    />
  );
}
