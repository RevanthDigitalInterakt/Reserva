import React from 'react';
import Modal from 'react-native-modal';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import testProps from '../../../../utils/testProps';
import IconComponent from '../../../../components/IconComponent/IconComponent';

interface IModalProps {
  isVisible: boolean;
  onBackdropPress: () => void;
}

export function ModalNewsletter({
  isVisible,
  onBackdropPress,
}: IModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationInTiming={300}
      animationIn="fadeIn"
      animationOut="fadeOut"
      {...testProps('modal_newsletter')}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.textContainer}>
          <IconComponent icon="checkedRounded" />
          <Text style={styles.text}>
            Inscrição concluída com sucesso!
          </Text>
        </View>

        <TouchableOpacity
          {...testProps('go_home_button')}
          onPress={onBackdropPress}
          style={styles.btnGoHome}
        >
          <Text style={styles.txtBtnGoHome}>voltar para home</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
