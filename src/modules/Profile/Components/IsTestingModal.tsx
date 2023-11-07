import React, { type Dispatch, type SetStateAction } from 'react';
import Modal from 'react-native-modal';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../components/Typography/Typography';

interface IIsTestingModalProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}
function IsTestingModal({ isVisible, setIsVisible }: IIsTestingModalProps) {
  return (
    <Modal
      avoidKeyboard
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
    >
      <Box
        bg="white"
        minHeight={184}
        alignItems="center"
        justifyContent="center"
        px={34}
        py={45}
      >
        <Box position="absolute" top={16} right={20} zIndex={4}>
          <Button
            onPress={() => setIsVisible(false)}
            variant="icone"
            icon={<IconLegacy size={17} name="Close" />}
          />
        </Box>
        <Box mb="micro">
          <Typography
            textAlign="center"
            fontFamily="reservaSerifBold"
            fontSize={20}
          >
            Atenção!!
          </Typography>
        </Box>

        <Box>
          <Typography
            textAlign="center"
            fontFamily="reservaSansLight"
            fontSize={16}
          >
            Para que a mudança de ambiente seja aplicada, é necessário reiniciar
            o APP.
          </Typography>
        </Box>

        <Box width="100%" mt={38} mb={5}>
          <Button
            variant="primarioEstreito"
            width="80%"
            height={50}
            onPress={() => setIsVisible(false)}
          >
            <Typography
              color="white"
              fontFamily="nunitoExtraBold"
              fontSize={13}
            >
              OK
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default IsTestingModal;
