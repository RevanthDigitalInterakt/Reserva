import React, { useEffect } from 'react';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import {
  Typography, Box, Button,
} from '@usereservaapp/reserva-ui';
import IconComponent from '../components/IconComponent/IconComponent';
import ModalCheckUserConnection from '../modules/Register/component/ModalCheckUserConnection';
import useAuthModalStore from '../zustand/useAuthModalStore';

interface IuseCheckConnection {
  refetch?: () => void
}

export const useCheckConnection = ({ refetch }: IuseCheckConnection) => {
  const { setModalCheckConnection } = useAuthModalStore(['setModalCheckConnection']);

  const [showScreen, setShowScreen] = React.useState<boolean>(false);
  const netInfo = useNetInfo();

  const checkConnectivity = () => {
    if (!netInfo.isConnected && netInfo.isConnected != null) {
      setShowScreen(true);
      setModalCheckConnection(true);
    } else {
      setShowScreen(false);
      if (refetch) refetch();
    }
  };

  const tryAgain = () => {
    NetInfo.fetch().then((state) => {
      if (!state.isConnected && state.isConnected != null) {
        setShowScreen(true);
        setModalCheckConnection(true);
      } else {
        setShowScreen(false);
        if (refetch) refetch();
      }
    });
  };

  useEffect(() => {
    checkConnectivity();
  }, [netInfo]);

  const ModalWithoutInternet = () => {
    if (!showScreen) {
      return (
        <></>
      );
    }

    return <ModalCheckUserConnection />;
  };

  const WithoutInternet = () => {
    if (!showScreen) {
      return (
        <></>
      );
    }
    return (
      <Box
        bg="white"
        height="100%"
        alignItems="center"
        justifyContent="center"
        testID="com.usereserva:id/without_internet_container"
      >
        <Box marginRight="micro">
          <IconComponent icon="withoutInternet" />
        </Box>
        <Box mt="xxxs" mb="nano">
          <Typography
            fontFamily="nunitoBold"
            fontSize={16}
          >
            Sem comunicação com a Internet
          </Typography>
        </Box>
        <Box>
          <Typography fontFamily="nunitoRegular" fontSize={13}>
            Por favor, verifique a sua conexão para continuar navegando.
          </Typography>
        </Box>
        <Box mt="md" width="100%">
          <Button
            onPress={() => tryAgain()}
            marginX="micro"
            inline
            title="TENTAR NOVAMENTE"
            variant="primarioEstreito"
          />
        </Box>
      </Box>
    );
  };

  return {
    showScreen,
    WithoutInternet,
    ModalWithoutInternet,
  };
};
