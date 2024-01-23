import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  ScrollView,
  Text,
} from 'react-native';

import styles from './styles';
import { Button } from '../../../../../../components/Button';

interface RadioButtonsProps {
  optionsList: string[] | number[];
  disabledOptions: string[];
  selectedItem?: string | number;
  onSelectedChange: (item: string | number) => void;
  testID?: string;
}

export function RadioButtons({
  selectedItem,
  optionsList,
  disabledOptions,
  onSelectedChange,
  testID,
}: RadioButtonsProps) {
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
      && optionsList
      && actualIndexScroll <= Math.ceil(optionsList.length)
    ) {
      setIndexScroll(actualIndexScroll);
    }
  };
  if (!optionsList || optionsList.length === 0) return null;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles(false).mainContainer}>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            onScrollEvent(event);
          }}
          ref={scrollRef}
        >
          {optionsList.map((item) => {
            const isSelected = selectedItem === item && !disabledOptions.includes(`${selectedItem}`);
            return (
              <View
                key={`option-${item}`}
                hitSlop={{
                  top: 15, bottom: 15, left: 15, right: 15,
                }}
                style={styles(isSelected).btnContainer}
              >
                <Button
                  hitSlop={{
                    top: 15, bottom: 15, left: 15, right: 15,
                  }}
                  disabled={disabledOptions.includes(`${item}`)}
                  onPress={() => {
                    onSelectedChange(item);
                  }}
                  testID={testID}
                  style={styles(false).btnSelectColor}
                >
                  <View style={styles(isSelected).btnContent}>
                    <Text style={styles(isSelected).btnText}>
                      {item}
                    </Text>
                  </View>
                </Button>
              </View>
            );
          })}

        </Animated.ScrollView>
      </View>
      {optionsList.length > 5 && (
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
