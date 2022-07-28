import { Box, Button, Typography } from '@danilomsou/reserva-ui';
import AsyncStorage from '@react-native-community/async-storage';
import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';

interface IModalDataCollect {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}
const ModalDataCollect = ({ isVisible, setIsVisible }: IModalDataCollect) => {
  const handleAcceptDataCollect = async (accept: boolean) => {
    if (accept === true) {
      console.log('TESTE SIM');
      await AsyncStorage.setItem('@user:accepted', 'true');
    } else {
      console.log('TESTE NÃO');
      await AsyncStorage.setItem('@user:accepted', 'false');
    }
    setIsVisible(false);
  };
  return (
    <Modal
      avoidKeyboard
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
    >
      <Box bg="white" borderRadius={8} minHeight={184} px={24} mx="3%">
        <Box mt="xxxs" mb="quarck">
          <Typography
            color="preto"
            fontFamily="reservaSerifRegular"
            fontSize={22}
          >
            Atividades e informações
          </Typography>
        </Box>

        <Box>
          <Typography color="preto" fontFamily="nunitoRegular" fontSize={15}>
            Permita o acesso a suas atividades e informações.
          </Typography>
        </Box>

        <Box width="100%" mt="xxxs">
          <Button
            bg="verdeSucesso"
            width="100%"
            height={50}
            onPress={() => handleAcceptDataCollect(true)}
          >
            <Typography
              letterSpacing={2}
              color="white"
              fontFamily="nunitoRegular"
              fontSize={13}
            >
              PERMITIR
            </Typography>
          </Button>
        </Box>
        <Box width="100%" mt="xxxs" mb="xxs">
          <Button
            variant="primarioEstreitoOutline"
            width="100%"
            height={50}
            onPress={() => handleAcceptDataCollect(false)}
          >
            <Typography
              letterSpacing={2}
              color="preto"
              fontFamily="nunitoRegular"
              fontSize={13}
            >
              NEGAR
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDataCollect;
