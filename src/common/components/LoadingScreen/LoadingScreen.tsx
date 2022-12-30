import React from "react";
import LottieView from 'lottie-react-native';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';
import { Box } from "@usereservaapp/reserva-ui";

const LoadingScreen = () => {
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
  )
};

export default LoadingScreen;
