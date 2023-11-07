import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import React from 'react';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import { Box } from '../../../../components/Box/Box';
import { loadingSpinner } from '../../../../../assets/animations';

export default function LoadingModal() {
  const { loadingModal } = useBagStore(['loadingModal']);

  return (
    <Modal isVisible={loadingModal} testID="com.usereserva:id/loading-modal">
      <Box
        zIndex={5}
        height="100%"
        width="100%"
        opacity={0.65}
        position="absolute"
        justifyContent="center"
        alignItems="center"
      >
        <LottieView
          testID="com.usereserva:id/lottie-view"
          source={loadingSpinner}
          style={{ width: 60 }}
          autoPlay
          loop
        />
      </Box>
    </Modal>
  );
}
