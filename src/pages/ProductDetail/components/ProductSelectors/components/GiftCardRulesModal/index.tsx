import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import { Text, TouchableOpacity, View } from 'react-native';
import testProps from '../../../../../../utils/testProps';
import styles from './styles';

interface GiftCardRulesModalProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  data: { titleModal: string; descriptionModal: string };
  onPress?: () => void;
}

export function GiftCardRulesModal({
  data,
  isVisible,
  setIsVisible,
  onPress,
}: GiftCardRulesModalProps) {
  if (!data) return null;
  const handleCloseModal = () => setIsVisible(false);
  return (
    <Modal
      avoidKeyboard
      onBackdropPress={handleCloseModal}
      isVisible={isVisible}
    >
      <View
        {...testProps('check_the_rules_container')}
        style={styles.container}
      >
        <Text
          {...testProps('check_the_rules_title_modal')}
          style={styles.title}
        >
          {data.titleModal || ''}
        </Text>
        <Text
          {...testProps('check_the_rules_description_modal')}
          style={styles.rules}
        >
          {data.descriptionModal || ''}
        </Text>
        <TouchableOpacity
          {...testProps('check_the_rules_button_continue')}
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
