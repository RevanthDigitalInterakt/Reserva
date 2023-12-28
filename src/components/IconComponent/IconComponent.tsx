import React, { memo } from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import icons, { type TIcons, svgs } from '../../base/styles/icons';

export interface TSource {
  uri: string;
}

interface IProps extends Omit<React.ComponentProps<typeof AutoHeightImage>, 'source' | 'width' | 'height'> {
  icon: TIcons,
  source?: TSource | number
  width?: number;
  height?: number;
}

const defaultIconSize = 60;

function IconComponent({ icon, ...rest }: IProps) {
  if (!icon) {
    throw new Error('Required icon name');
  }

  if (Object.keys(svgs).includes(icon)) {
    const ComponentSvg = icons[icon];
    return <ComponentSvg />;
  }

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

export default memo(IconComponent);
