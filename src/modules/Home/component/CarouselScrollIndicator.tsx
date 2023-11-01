import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, type LayoutChangeEvent } from 'react-native';
import testProps from '../../../utils/testProps';
import { Box } from '../../../components/Box/Box';
import { theme } from '../../../base/usereservappLegacy/theme';

interface CarrouselScrollIndicatorProps {
  carouselLength: number;
  actualPosition: number;
  slideDelay: number;
  onFinishAnimation: () => void;
}

function CarrouselScrollIndicator({
  carouselLength,
  actualPosition,
  slideDelay,
  onFinishAnimation,
}: CarrouselScrollIndicatorProps) {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-10000)).current;

  const animation = Animated.timing(animatedValue, {
    toValue: 0,
    duration: slideDelay,
    useNativeDriver: true,
    easing: Easing.linear,
  });

  const progressAnimation = () => {
    animatedValue.setValue(5 - layoutWidth);

    animation.start(({ finished }) => {
      if (finished) onFinishAnimation();
    });
  };

  useEffect(() => {
    progressAnimation();
  }, [actualPosition]);

  return (
    <Box
      position="absolute"
      zIndex={3}
      bottom={10}
      flexDirection="row"
      {...testProps('carrousel_scroll_indicator_container')}
    >
      {[...Array(carouselLength)].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`carousel-${index}`}>
          <Box
            style={{ overflow: 'hidden' }}
            flex={1}
            backgroundColor="neutroFrio2"
            height={2}
            marginRight="quarck"
            marginLeft={index === 0 ? 'quarck' : null}
            onLayout={(e: LayoutChangeEvent) => {
              const newLayoutWidth = e.nativeEvent.layout.width;
              setLayoutWidth(newLayoutWidth);
              progressAnimation();
            }}
          >
            {index === actualPosition && (
              <Animated.View
                {...testProps('carrousel_scroll_indicator_animated_view')}
                style={{
                  backgroundColor: theme.colors.neutroFrio1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  transform: [{ translateX: animatedValue || -10000 }],
                }}
              />
            )}
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
}

export default CarrouselScrollIndicator;
