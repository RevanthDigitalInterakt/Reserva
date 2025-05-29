import { useRef } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const OUT_OF_SCREEN = -50;
const INSIDE_SCREEN = 0;
const WITHOUT_OPACITY = 0;
const WITH_OPACITY = 1;
const WITHOUT_TRANSLATE = 1;
const WITH_TRANSLATE = 0;

export default function useHomeHeader() {
  let currentOffset = 0;
  const headerWithSearchOpacityAnimatedValue = useRef(new Animated.Value(0)).current;
  const headerWithSearchOpacityAnimatedValueRef = useRef(new Animated.Value(0)).current;
  const transparentHeaderAnimatedValueRef = useRef(new Animated.Value(0)).current;
  const whiteHeaderOpacityAnimatedValueRef = useRef(new Animated.Value(0)).current;
  const whiteHeaderTranslateAnimatedValueRef = useRef(new Animated.Value(0)).current;

  const handleAnimationUnderOrEqual20Y = () => {
    Animated.timing(whiteHeaderOpacityAnimatedValueRef, {
      toValue: WITHOUT_OPACITY,
      duration: 90,
      useNativeDriver: true,
    }).start();
    Animated.timing(transparentHeaderAnimatedValueRef, {
      toValue: WITH_TRANSLATE,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleAnimationOver420Y = () => {
    Animated.timing(whiteHeaderOpacityAnimatedValueRef, {
      toValue: WITH_OPACITY,
      duration: 20,
      useNativeDriver: true,
    }).start();

    Animated.timing(whiteHeaderTranslateAnimatedValueRef, {
      toValue: WITH_TRANSLATE,
      duration: 20,
      useNativeDriver: true,
    }).start();

    Animated.timing(transparentHeaderAnimatedValueRef, {
      toValue: WITHOUT_TRANSLATE,
      duration: 20,
      useNativeDriver: true,
    }).start();
  };

  const handleAnimationBetween20And50Y = () => {
    Animated.timing(whiteHeaderOpacityAnimatedValueRef, {
      toValue: WITH_OPACITY,
      duration: 20,
      useNativeDriver: true,
    }).start();

    Animated.timing(whiteHeaderTranslateAnimatedValueRef, {
      toValue: WITHOUT_TRANSLATE,
      duration: 20,
      useNativeDriver: true,
    }).start();
  };

  const handleAnimationBetween50And420Y = () => {
    Animated.timing(whiteHeaderOpacityAnimatedValueRef, {
      toValue: WITH_OPACITY,
      duration: 20,
      useNativeDriver: true,
    }).start();

    Animated.timing(whiteHeaderTranslateAnimatedValueRef, {
      toValue: WITHOUT_TRANSLATE,
      duration: 20,
      useNativeDriver: true,
    }).start();
  };

  const handleAnimationUnderOrEqual420Y = () => Animated
    .timing(headerWithSearchOpacityAnimatedValueRef, {
      toValue: WITHOUT_OPACITY,
      duration: 20,
      useNativeDriver: true,
    }).start();

  const handleScrollHeaderWithSearch = (direction: string) => {
    if (direction === 'up') {
      Animated.timing(headerWithSearchOpacityAnimatedValueRef, {
        toValue: WITH_OPACITY,
        duration: 20,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(headerWithSearchOpacityAnimatedValueRef, {
        toValue: WITHOUT_OPACITY,
        duration: 20,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleScrollByY = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = event.nativeEvent.contentOffset;
    if (y >= 50 && y <= 420) handleAnimationBetween50And420Y();
    if (y >= 420) handleAnimationOver420Y();
    if (y <= 420) handleAnimationUnderOrEqual420Y();
    if (y <= 20) handleAnimationUnderOrEqual20Y();
    if (y >= 20 && y <= 50) handleAnimationBetween20And50Y();
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const direction = e.nativeEvent.contentOffset.y > currentOffset ? 'down' : 'up';
    currentOffset = e.nativeEvent.contentOffset.y;
    handleScrollHeaderWithSearch(direction);
    handleScrollByY(e);
  };

  const topBarDefaultAnimated = {
    opacity: headerWithSearchOpacityAnimatedValueRef.interpolate({
      inputRange: [0, 1],
      outputRange: [WITHOUT_OPACITY, WITH_OPACITY],
    }),
  };

  const transparentTopBarAnimated = {
    transform: [
      {
        translateY: transparentHeaderAnimatedValueRef.interpolate({
          inputRange: [0, 1],
          outputRange: [INSIDE_SCREEN, OUT_OF_SCREEN],
        }),
      },
    ],
  };

  const whiteTopBarAnimated = {
    opacity: whiteHeaderOpacityAnimatedValueRef.interpolate({
      inputRange: [0, 1],
      outputRange: [WITHOUT_OPACITY, WITH_OPACITY],
    }),
    transform: [
      {
        translateY: whiteHeaderTranslateAnimatedValueRef.interpolate({
          inputRange: [0, 1],
          outputRange: [OUT_OF_SCREEN, INSIDE_SCREEN],
        }),
      },
    ],
  };

  return {
    topBarDefaultAnimated,
    transparentTopBarAnimated,
    whiteTopBarAnimated,
    handleScroll,
    headerWithSearchOpacityAnimatedValue,
  };
}
