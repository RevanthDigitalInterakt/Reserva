import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import { Text, TouchableOpacity, View } from 'react-native';
import testProps from '../../../../utils/testProps';
import type { HomeCountdownQuery } from '../../../../base/graphql/generated';
import styles from './styles';

interface INewCountDownBannerModal {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  data: HomeCountdownQuery['homeCountdown'];
  goToPromotion?: () => void;
}

export function NewCountDownBannerModal({
  data,
  isVisible,
  setIsVisible,
  goToPromotion,
}: INewCountDownBannerModal) {
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
          {...testProps('check_the_rules_button_promotion')}
          style={styles.button}
          onPress={goToPromotion}
        >
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
