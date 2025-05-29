import React from 'react';
import {
  Modal, View, TouchableOpacity,
} from 'react-native';
import useAuthModalStore from '../../../../zustand/useAuthModalStore';
import testProps from '../../../../utils/testProps';

import { styles } from './ModalCheckUserConnection.styles';
import { Typography } from '../../../../components/Typography/Typography';

function ModalCheckUserConnection() {
  const { setModalCheckConnection, showModalCheckConnection } = useAuthModalStore(['setModalCheckConnection', 'showModalCheckConnection']);

  return (
    <Modal animationType="fade" transparent visible={showModalCheckConnection}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View>
            <Typography fontFamily="reservaSerifMedium" fontSize={20}>Falha na comunicação!</Typography>
          </View>

          <View style={styles.modalView}>
            <Typography fontFamily="nunitoRegular">
              Não foi possível continuar o cadastro devido a um problema de rede,
              {' '}
              verifique sua conexão ou tente novamente mais tarde
            </Typography>
          </View>

          <TouchableOpacity
            {...testProps('com.usereserva:id/modal_check_user_connection_button')}
            style={styles.modalActionButton}
            onPress={() => setModalCheckConnection(false)}
          >
            <Typography fontFamily="nunitoBold" fontSize={14} color="white">
              TENTAR NOVAMENTE
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ModalCheckUserConnection;
