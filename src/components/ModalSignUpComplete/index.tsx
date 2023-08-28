import { Typography } from '@usereservaapp/reserva-ui';
import React from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import useAuthModalStore from '../../zustand/useAuthModalStore';
import testProps from '../../utils/testProps';

import { styles } from './ModalSignUpComplete.styles';

function ModalSignUpComplete() {
  const { showModalSignUpComplete, setModalSignUpComplete } = useAuthModalStore(['showModalSignUpComplete', 'setModalSignUpComplete']);

  return (
    <Modal animationType="fade" transparent visible={showModalSignUpComplete}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View>
            <Typography fontFamily="reservaSerifMedium" fontSize={20}>Cadastro feito com sucesso!</Typography>
          </View>

          <View style={styles.modalView}>
            <Typography fontFamily="nunitoRegular">
              Seu cadastro foi feito com sucesso, agora é só partir para as compras!
            </Typography>
          </View>

          <TouchableOpacity
            {...testProps('com.usereserva:id/modal_signup_complete_button')}
            style={styles.modalActionButton}
            onPress={() => setModalSignUpComplete(false)}
          >
            <Typography fontFamily="nunitoBold" fontSize={14} color="white">
              CONTINUAR PARA A LOJA
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ModalSignUpComplete;
