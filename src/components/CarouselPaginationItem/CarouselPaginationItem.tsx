import React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface ICarouselPaginationItem {
  index: number
  backgroundColor: string
  length: number
  animValue: SharedValue<number>
}

function CarouselPaginationItem({
  index,
  backgroundColor,
  length,
  animValue,
}: ICarouselPaginationItem) {
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
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

  return (
    <View
      style={{
        backgroundColor: 'white',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [{ rotateZ: '0deg' }],
      }}
    >
      <Animated.View style={[{ borderRadius: 50, backgroundColor, flex: 1 }, animStyle]} />
    </View>
  );
}

export default CarouselPaginationItem;
