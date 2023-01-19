import {
  Box,
  theme,
} from '@usereservaapp/reserva-ui';
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';

import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';

import DeviceInfo from 'react-native-device-info';

import { useNavigation } from '@react-navigation/native';
import { animations } from '../../../assets';

const haveNotch = DeviceInfo.hasNotch();

export interface ModalBagProps {
  isVisible: boolean;
  onBackdropPress: () => void;
}

export const ModalBag = ({ isVisible, onBackdropPress }: ModalBagProps) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [animation, setAnimation] = useState<AnimatedLottieView | null>(null);
  const [products, setProducts] = React.useState<any>([]);
  const [count, setCount] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    if (animation && isVisible) {
      animation?.play();
    }
  }, [animation, isVisible]);

  return (
    <Box>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setAnimationFinished(false);
          onBackdropPress();
        }}
        backdropColor={
          !animationFinished && isVisible ? theme.colors.preto : 'transparent'
        }
        animationInTiming={300}
        animationIn="fadeIn"
        animationOut="fadeIn"
      >
        {!animationFinished && (
          <LottieView
            style={{ flex: 1 }}
            onAnimationFinish={() => {
              setAnimationFinished(true);
            }}
            ref={(animation) => {
              setAnimation(animation);
            }}
            loop={false}
            source={animations.bag}
          />
        )}
      </Modal>
    </Box>
  );
};
