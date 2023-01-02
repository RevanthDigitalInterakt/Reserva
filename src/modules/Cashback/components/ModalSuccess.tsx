import React, { Dispatch, SetStateAction } from 'react';

import Modal from 'react-native-modal';
import {
  Box, Button, Typography, Icon,
} from '@usereservaapp/reserva-ui';

interface IModalSucess {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export const ModalSuccess = ({ isVisible, setIsVisible }: IModalSucess) => (
  <Modal
    avoidKeyboard
    onBackdropPress={() => setIsVisible(false)}
    isVisible={isVisible}
  >
    <Box
      bg="white"
      height={184}
      alignItems="center"
      justifyContent="center"
      px="xxxs"
      py="xxxs"
    >
      <Box position="absolute" top={16} right={20} zIndex={4}>
        <Button
          onPress={() => setIsVisible(false)}
          variant="icone"
          icon={<Icon size={12} name="Close" />}
        />
      </Box>
      <Box mt="xxxs">
        <Typography fontFamily="reservaSerifBold" fontSize={24}>
          Parabéns!
        </Typography>
      </Box>
      <Box mt="xxxs">
        <Typography fontFamily="reservaSerifRegular" fontSize={24}>
          Você ganhou cashback.
        </Typography>
      </Box>
      <Box width="100%" mt="micro">
        <Button
          bg="verdeSucesso"
          width="100%"
          height={50}
          onPress={() => setIsVisible(false)}
        >
          <Typography color="white" fontFamily="nunitoSemiBold" fontSize={13}>
            OPA, VALEU!
          </Typography>
        </Button>
      </Box>
    </Box>
  </Modal>
);
