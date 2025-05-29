import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View, Animated, Text } from 'react-native';
import styles from './progressBar.styles';

interface RangeProps {
  value: number;
  max: number;
  barHeight: number;
  label?: string;
  showPercent: boolean;
}

export function ProgressBar({
  label,
  value,
  max,
  barHeight = 3,
  showPercent = false,
}: RangeProps) {
  const nextPercent = (value * 100) / max;
  const [percent, setPercent] = useState(0);

  const fadeAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    fadeAnim.addListener((fadeAnimValue) => {
      setPercent(fadeAnimValue.value);
    });
  }, [fadeAnim]);

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: nextPercent,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, nextPercent]);

  useEffect(() => {
    if (nextPercent) {
      fadeIn();
    }
  }, [nextPercent, fadeIn]);

  return (
    <View>
      <View style={styles.container}>
        {label !== undefined && (
          <Text style={styles.text}>
            {label}
          </Text>
        )}

        {showPercent === true && (
          <Text style={styles.text}>
            {nextPercent.toFixed(0)}
            %
          </Text>
        )}
      </View>
      <View style={[styles.emptyBar, { height: barHeight }]} />
      <View style={[styles.greenBar, { height: barHeight, width: `${Math.min(percent, 100)}%`, marginTop: -barHeight }]} />
    </View>
  );
}
