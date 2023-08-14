import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';

import styles from './ModalConfirmDelete.styles';

import type { IModalConfirmDelete } from './interface/IModalConfirmDelete';

import IconClose from '../../../../../../assets/icons/IconClose';
import testProps from '../../../../../utils/testProps';

export default function ModalConfirmDelete({
  showModal,
  onCloseModal,
  onDeleteAddress,
  addressID,
}: IModalConfirmDelete): JSX.Element {
  return (
    <Modal transparent visible={showModal} testID="com.usereserva:id/modal_delete">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalCloseButton}>
            <TouchableOpacity onPress={onCloseModal}>
              <IconClose />
            </TouchableOpacity>
          </View>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle}>Excluir endereço</Text>
            <Text style={styles.modalText}>Tem certeza que deseja excluir este endereço?</Text>
            <Text style={styles.modalText}>
              <Text style={styles.modalTextObs}>
                Observação:
              </Text>
              {' '}
              Essa ação não afetará pedidos que já estão
              pendentes ou em rota de entrega.
            </Text>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                {...testProps('com.usereserva:id/com.usereserva:id/delete_address_button')}
                style={styles.modalButton}
                onPress={() => onDeleteAddress(addressID)}
              >
                <Text style={styles.modalButtonText}>SIM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={onCloseModal}>
                <Text style={styles.modalButtonText}>NÃO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
