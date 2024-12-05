import React, { useCallback, useEffect, useRef } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { COLORS } from '../../base/styles';
import { scale } from '../../utils/scale';

interface ICarouselPaginationItem {
  index: number;
  backgroundColor: string;
  borderColor?: string;
  length: number;
  animValue: SharedValue<number>;
  actualPosition: number;
  slideDelay: number;
  onFinishAnimation: () => void;
}

function CarouselPaginationItem({
  index,
  backgroundColor,
  borderColor,
  length,
  animValue,
  actualPosition,
  slideDelay,
  onFinishAnimation,
}: ICarouselPaginationItem) {
  const width = 9;

  const $timeout = useRef<NodeJS.Timer>();

  const onSetAutoplay = useCallback(() => {
    clearTimeout($timeout.current);

    $timeout.current = setTimeout(() => {
      onFinishAnimation();
    }, slideDelay);
  }, [$timeout, slideDelay]);

  useEffect(() => {
    onSetAutoplay();
  }, [actualPosition]);

  useEffect(() => () => {
    clearTimeout($timeout.current);
  }, []);

  const bulletStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  const bulletWrapperStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];

    if (index === 0 && animValue.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
    }

    return {
      width: interpolate(
        animValue.value,
        inputRange,
        actualPosition === index
          ? [width, width * 4.3, width]
          : [width, width * 4.3, width],
        Extrapolate.CLAMP,
      ),
      borderColor: interpolateColor(
        animValue.value,
        inputRange,
        actualPosition === index
          ? [borderColor ?? COLORS.WHITE, COLORS.WHITE, borderColor ?? COLORS.WHITE]
          : [borderColor ?? COLORS.WHITE, COLORS.WHITE, borderColor ?? COLORS.WHITE],
      ),
    };
  }, [animValue, index, length, actualPosition]);

  return (
    <Animated.View
      style={[
        {
          width: scale(width),
          height: scale(width - 2),
          borderRadius: 50,
          overflow: 'hidden',
          transform: [{ rotateZ: '0deg' }],
          borderWidth: 2,
          borderColor: borderColor ?? COLORS.WHITE,
        },
        bulletWrapperStyle,
      ]}
    >
      <Animated.View
        style={[{ borderRadius: 50, backgroundColor, flex: 1 }, bulletStyle]}
      />
    </Animated.View>
  );
}

export default CarouselPaginationItem;
