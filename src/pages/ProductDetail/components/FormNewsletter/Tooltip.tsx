import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import testProps from '../../../../utils/testProps';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';

interface ITooltip {
  tooltipText: string,
  isVisible: boolean,
  setIsVisible: (isVisible: boolean) => void
}

function Tooltip({ tooltipText, isVisible, setIsVisible }: ITooltip) {
  const toastOpacity = useRef(new Animated.Value(0)).current;

  const onShow = async () => {
    await Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => { });
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      onShow();
    }
  }, [isVisible, onShow]);

  return (
    <Animated.View
      {...testProps('com.usereserva:id/tooltip_product_details')}
      style={{
        opacity: toastOpacity,
        position: 'absolute',
        alignSelf: 'center',
        elevation: 10,
        zIndex: 10,
      }}
    >
      <Box
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0,
          shadowRadius: 2,
          elevation: 5,
        }}
        borderRadius="nano"
        backgroundColor="white"
        alignSelf="center"
        padding={4}
      >
        <Typography fontFamily="nunitoRegular" fontSize={13}>{tooltipText}</Typography>
      </Box>
    </Animated.View>
  );
}

export default Tooltip;
