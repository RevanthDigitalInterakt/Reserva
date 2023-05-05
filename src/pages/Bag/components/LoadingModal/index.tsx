import Modal from 'react-native-modal';
import { Box } from '@usereservaapp/reserva-ui';
import LottieView from 'lottie-react-native';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';
import React from 'react';
import useBagStore from '../../../../zustand/useBagStore/useBagStore';

export default function LoadingModal() {
  const { showLoadingModal } = useBagStore();

  return (
    <Modal isVisible={showLoadingModal} testID="com.usereserva:id/loading-modal">
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
          style={{
            width: 60,
          }}
          autoPlay
          loop
        />
      </Box>
    </Modal>
  );
}
