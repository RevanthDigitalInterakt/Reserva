import { Box, theme } from '@usereservaapp/reserva-ui';
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';

import LottieView from 'lottie-react-native';
import { animations } from '../../../assets';

export interface ModalBagProps {
  isVisible: boolean;
  onBackdropPress: () => void;
}

export const ModalBag = ({ isVisible, onBackdropPress }: ModalBagProps) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    if (animation && isVisible) {
      animation?.play();
    }
  }, [animation, isVisible]);

  return (
    <Box>
      <Modal
        isVisible={isVisible}
        testID="com.usereserva:id/modal_bag"
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
              setAnimationFinished(false);
              onBackdropPress();
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
