import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';

import LottieView from 'lottie-react-native';
import animations from '../../base/styles/animations';
import { Box } from '../Box/Box';
import { theme } from '../../base/usereservappLegacy/theme';

export interface ModalBagProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  onModalHide?: () => void;
}

export function ModalBag({ isVisible, onBackdropPress, onModalHide }: ModalBagProps) {
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
        onModalHide={onModalHide}
        backdropColor={
          !animationFinished && isVisible ? theme.colors.preto : 'transparent'
        }
        animationInTiming={300}
        animationIn="fadeIn"
        animationOut="fadeIn"
        useNativeDriver
        useNativeDriverForBackdrop
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
            source={animations.bagLottie}
          />
        )}
      </Modal>
    </Box>
  );
}
