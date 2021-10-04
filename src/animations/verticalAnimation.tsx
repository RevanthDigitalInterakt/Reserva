import {
  StackNavigationOptions,
  TransitionSpecs,
  HeaderStyleInterpolators,
  StackCardInterpolationProps,
} from '@react-navigation/stack';

const verticalAnimation: StackNavigationOptions = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
  cardStyleInterpolator: ({
    current,
    layouts,
  }: StackCardInterpolationProps) => ({
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
      ],
    },
  }),
};

export default verticalAnimation;
