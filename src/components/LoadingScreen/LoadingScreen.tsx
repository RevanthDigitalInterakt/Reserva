import LottieView from 'lottie-react-native';
import React from 'react';
import { loadingSpinner } from '../../../assets/animations';
import { Box } from '../Box/Box';

function LoadingScreen() {
  return (
    <Box alignItems="center" justifyContent="center" flex={1} mt="xxl">
      <LottieView
        source={loadingSpinner}
        style={{
          width: 60,
        }}
        autoPlay
        loop
      />
    </Box>
  );
}

export default LoadingScreen;
