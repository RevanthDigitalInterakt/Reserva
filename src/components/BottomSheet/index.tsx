import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import type { BottomSheetProps } from './types';
import styles from './styles';

export function BottomSheet({ children, isOpen = false, onBackdropPress } : BottomSheetProps) {
  return (
    <View>
      <Modal
        isVisible={isOpen}
        style={styles.modal}
        customBackdrop={(
          <TouchableWithoutFeedback onPress={onBackdropPress}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          )}
      >
        <View style={styles.contentWrapper}>
          {children}
        </View>
      </Modal>
    </View>
  );
}
