import React, { useRef, useState } from 'react';
import { type ColorProps } from 'styled-system';
import {
  ImageBackground,
  View,
  ScrollView,
  Animated,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';

import styles from './styles';
import type { theme } from '../../../../../../base/usereservappLegacy/theme';
import { Button } from '../../../../../../components/Button';
import IconComponent from '../../../../../../components/IconComponent/IconComponent';

interface ISelectColorsProps extends ColorProps<typeof theme> {
  listColors: { id: string, url: string }[];
  disabledColors: string[];
  selectedColors?: string | string[];
  onPress: (item: string) => void;
}

export function ColorsButtons({
  listColors,
  selectedColors,
  disabledColors,
  onPress,
}: ISelectColorsProps) {
  const [indexScroll, setIndexScroll] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScrollEvent = (
    scrollEvent: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const actualIndexScroll = Math.ceil(
      scrollEvent.nativeEvent.contentOffset.x / 25,
    );

    if (
      actualIndexScroll !== indexScroll
      && listColors
      && actualIndexScroll <= Math.ceil(listColors.length)
    ) {
      setIndexScroll(actualIndexScroll);
    }
  };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={styles(false).mainContainer}
      >
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            onScrollEvent(event);
          }}
          ref={scrollRef}
        >
          {listColors.map((item) => (
            <View
              style={
                styles(!!selectedColors?.includes(item.id)
                  || selectedColors === item.id).boxContainer
              }
              key={`option-${item.id}`}
            >
              <Button
                disabled={disabledColors.includes(item.id)}
                onPress={() => onPress(item.id)}
              >
                <View
                  style={styles(false).containerImage}
                >
                  <ImageBackground
                    resizeMode="cover"
                    style={styles(false).imageBackground}
                    source={{ uri: item.url }}
                  />
                </View>
              </Button>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
      {listColors.length > 5 && (
        <Animated.View
          style={{
            transform: [{ rotate: indexScroll < 6 ? '0deg' : '180deg' }],
            marginLeft: 4,
          }}
        >
          <IconComponent icon="chevronRight" />
        </Animated.View>
      )}
    </View>
  );
}
