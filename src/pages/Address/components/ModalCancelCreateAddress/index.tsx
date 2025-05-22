import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { styles } from './ModalCancelCreateAddress.styles';
import type { IModalCancelCreateAddress } from './interface/IModalCancelCreateAddress';

export default function ModalCancelCreateAddress({
  modalController,
  showModal,
}: IModalCancelCreateAddress): JSX.Element {
  return (
    <Modal animationType="fade" transparent visible={showModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text
            style={styles.modalTitle}
          >
            Cancelar cadastro de endereço
          </Text>
          <Text style={styles.modalSubtitle}>
            Tem certeza que deseja cancelar o cadastro do endereço ?
          </Text>
          <View style={styles.modalRow}>
            <TouchableOpacity style={styles.modalButtonCancel} onPress={() => modalController('cancel')}>
              <Text style={styles.modalTextButtonCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonClose} onPress={() => modalController()}>
              <Text style={styles.modalTextButtonClose}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
