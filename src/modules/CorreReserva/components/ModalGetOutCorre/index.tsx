import React from 'react';

import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Box, Button, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import configDeviceSizes from '../../../../utils/configDeviceSizes';

export interface ModalGetOutCorreProps {
  isVisible: boolean;
  onClickBackdrop: () => void;
  onConfirmButtonPress: () => void;
  onCancelButtonPress: () => void;
  onCloseButtonPress: () => void;
}

export const ModalGetOutCorre: React.FC<ModalGetOutCorreProps> = ({
  isVisible,
  onClickBackdrop,
  onConfirmButtonPress,
  onCancelButtonPress,
  onCloseButtonPress,
}) => (
  <Modal visible={isVisible} transparent>
    <TouchableWithoutFeedback onPress={onClickBackdrop}>
      <Box
        opacity={0.85}
        backgroundColor="fullBlack"
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          backgroundColor="white"
          width={configDeviceSizes.DEVICE_WIDTH * 0.72}
          padding={17}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          >
            <Button
              onPress={onCloseButtonPress}
              variant="icone"
              icon={<Icon color="fullBlack" size={13} name="Close" />}
            />
          </Box>
          <Typography
            style={{ marginTop: 15 }}
            fontFamily="reservaSerifBold"
            fontSize={26}
            textAlign="center"
          >
            Tem certeza?
          </Typography>
          <Typography
            style={{ marginTop: 3.8 }}
            fontFamily="reservaSansBold"
            fontSize={16}
            textAlign="center"
          >
            Você deseja sair do CORRE®?
          </Typography>
          <Typography fontFamily="reservaSansLight" fontSize={16}>
            Seus dados não serão salvos!
          </Typography>
          <Box width="100%">
            <TouchableOpacity onPress={onCancelButtonPress}>
              <Typography
                fontFamily="reservaSansBold"
                fontSize={14}
                textAlign="center"
                style={{ textDecorationLine: 'underline', paddingVertical: 15 }}
              >
                Sim, quero sair.
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirmButtonPress}>
              <Box backgroundColor="fullBlack" paddingY={14}>
                <Typography
                  fontFamily="nunitoBold"
                  fontSize={11}
                  textAlign="center"
                  color="white"
                  style={{ textTransform: 'uppercase' }}
                >
                  continuar na corrida
                </Typography>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  </Modal>
);
