import React from 'react';

import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../components/Typography/Typography';
import { loadingSpinner } from '../../../../assets/animations';

interface IModal {
  isVisible: boolean;
  loading: boolean;
  setIsVisible: () => void;
  setTermAndConditions: () => void;
  isAccepted: boolean;
}

export function ModalTermsAndConditions({
  isVisible,
  setIsVisible,
  setTermAndConditions,
  isAccepted,
  loading,
}: IModal) {
  return (
    <Modal avoidKeyboard onBackdropPress={setIsVisible} isVisible={isVisible}>
      <Box bg="white" marginY="xxl" justifyContent="center" px="xxxs" py="xxxs">
        <Box position="absolute" top={16} right={20} zIndex={4}>
          <Button
            onPress={setIsVisible}
            variant="icone"
            icon={<IconLegacy size={12} name="Close" />}
          />
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="reservaSerifRegular" fontSize={20}>
            Termos e condições
          </Typography>
        </Box>
        <ScrollView>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
              in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought to have scrambled parts of Cicero’s De Finibus Bonorum et
              Malorum for use in a type specimen book. It usually begins with. The
              passage experienced a surge in popularity during the 1960s when
              Letraset used it on their dry-transfer sheets, and again during the
              90s as desktop publishers bundled the text with their software.
              Today it’s seen all around the web; on templates, websites, and
              stock designs. Use our generator to get your own, or read on for the
              authoritative history of lorem ipsum.
            </Typography>
          </Box>
        </ScrollView>
        <Box width="100%" mt="micro">
          <Button
            bg="verdeSucesso"
            width="100%"
            height={50}
            disabled={isAccepted}
            onPress={setTermAndConditions}
          >
            {loading ? (
              <LottieView
                source={loadingSpinner}
                style={{
                  width: 30,
                }}
                autoPlay
                loop
              />
            ) : (
              <Typography color="white" fontFamily="nunitoSemiBold" fontSize={13}>
                {isAccepted ? 'ACEITO' : 'ACEITAR'}
              </Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
