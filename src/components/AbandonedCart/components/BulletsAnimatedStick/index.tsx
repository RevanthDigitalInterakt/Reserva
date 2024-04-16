import React from 'react';
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  Extrapolation,
} from 'react-native-reanimated';
import { scale } from '../../../../utils/scale';
import { COLORS } from '../../../../base/styles';

interface IBulletsAnimatedStickItem {
  index: number;
  backgroundColor: string;
  length: number;
  animValue: SharedValue<number>;
  actualPosition: number;
}

function BulletsAnimatedStick({
  index,
  backgroundColor,
  length,
  animValue,
  actualPosition,
}: IBulletsAnimatedStickItem) {
  const width = 8;

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
            Extrapolation.CLAMP,
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
        Extrapolation.CLAMP,
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
          borderWidth: 1,
          borderColor: COLORS.GRAY62,
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

export default BulletsAnimatedStick;
