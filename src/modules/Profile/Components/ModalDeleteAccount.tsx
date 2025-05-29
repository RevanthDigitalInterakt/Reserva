import React, { type Dispatch, type SetStateAction } from 'react';
import Modal from 'react-native-modal';

import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography/Typography';

interface IModalDeleteAccount {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  handleDeleteAccount: () => void;
}
function ModalDeleteAccount({
  isVisible,
  setIsVisible,
  handleDeleteAccount,
}: IModalDeleteAccount) {
  return (
    <Modal
      avoidKeyboard
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
      testID="com.usereserva:id/modaldeleteaccount_container"
    >
      <Box
        bg="white"
        borderRadius={8}
        minHeight={184}
        px={24}
        mx="3%"
      >
        <Box mt="xxxs" mb="quarck">
          <Typography
            color="preto"
            fontFamily="reservaSerifRegular"
            fontSize={22}
          >
            Tem certeza?
          </Typography>
        </Box>

        <Box>
          <Typography color="preto" fontFamily="nunitoRegular" fontSize={15}>
            Essa ação não pode ser desfeita. Confirme o código recebido para
            deletar sua conta permanentemente.
          </Typography>
        </Box>

        <Box width="100%" mt="xxxs">
          <Button
            bg="#D71921"
            width="100%"
            height={50}
            onPress={() => handleDeleteAccount()}
          >
            <Typography
              letterSpacing={2}
              color="white"
              fontFamily="nunitoRegular"
              fontSize={13}
            >
              DELETAR PERMANENTEMENTE
            </Typography>
          </Button>
        </Box>
        <Box width="100%" mt="xxxs" mb="xxs">
          <Button
            variant="primarioEstreitoOutline"
            width="100%"
            height={50}
            onPress={() => setIsVisible(false)}
          >
            <Typography
              letterSpacing={2}
              color="preto"
              fontFamily="nunitoRegular"
              fontSize={13}
            >
              VOLTAR
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalDeleteAccount;
