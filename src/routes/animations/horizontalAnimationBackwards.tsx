import {
  HeaderStyleInterpolators,
  type StackCardInterpolationProps,
  type StackNavigationOptions,
  TransitionSpecs,
} from '@react-navigation/stack';

const horizontalAnimationBackwards: StackNavigationOptions = {
  gestureDirection: 'horizontal-inverted',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
  cardStyleInterpolator: ({
    current,
    layouts,
  }: StackCardInterpolationProps) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width * -1, 0],
          }),
        },
      ],
    },
  }),
};

export default horizontalAnimationBackwards;
