import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { COLORS } from "../../base/styles";
import { scale } from "../../utils/scale";

interface ICarouselPaginationItem {
  index: number;
  backgroundColor: string;
  length: number;
  animValue: SharedValue<number>;
  actualPosition: number;
}

function CarouselPaginationItem({
  index,
  backgroundColor,
  length,
  animValue,
  actualPosition,
}: ICarouselPaginationItem) {
  const width = 9;

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
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  const bulletWrapperStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      width: interpolate(
        animValue.value,
        inputRange,
        actualPosition === index
          ? [width, width * 4.3, width]
          : [width, width * 4.3, width],
        Extrapolate.CLAMP
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
          overflow: "hidden",
          transform: [{ rotateZ: "0deg" }],
          borderWidth: 2,
          borderColor: COLORS.WHITE,
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
