import React from 'react';
import {
  Animated, Pressable, Text,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import IconComponent from '../IconComponent/IconComponent';
import { scale } from '../../utils/scale';
import type { SearchButtonProps } from './types';
import styles from './styles';

const ICON_WIDTH = scale(13);
const ICON_HEIGHT = scale(14);

export function SearchButton({ onPress, placeholder, style }: SearchButtonProps) {
  return (
    <Animated.View style={style}>
      <DropShadow style={styles.container}>
        <Pressable style={styles.contentWrapper} testID="search_button" onPress={onPress}>
          <Text style={styles.text}>{placeholder}</Text>
          <IconComponent
            width={ICON_WIDTH}
            height={ICON_HEIGHT}
            icon="search"
          />
        </Pressable>
      </DropShadow>
    </Animated.View>
  );
}
