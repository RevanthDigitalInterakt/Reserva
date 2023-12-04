import React from 'react';
import ReactNativeModal from 'react-native-modal';
import { Text, TouchableOpacity, View } from 'react-native';
import testProps from '../../utils/testProps';
import styles from './styles';
import IconComponent from '../IconComponent/IconComponent';

interface ModalProps {
  isVisible: boolean;
  handleClose: () => void;
  title: string;
  description: React.ReactNode;
}

export function Modal({
  isVisible, handleClose, title, description,
}: ModalProps) {
  return (
    <ReactNativeModal
      avoidKeyboard
      onBackdropPress={handleClose}
      isVisible={isVisible}
    >
      <View
        {...testProps('check_the_rules_container')}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text
            {...testProps('check_the_rules_title_modal')}
            style={styles.title}
          >
            {title || ''}
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <IconComponent
              icon="close"
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
        </View>
        {description}
      </View>
    </ReactNativeModal>
  );
}
