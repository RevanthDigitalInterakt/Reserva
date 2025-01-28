import React, { useCallback } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './HomeTooltipGeolocation.styles';
import { useHomeStore } from '../../../../zustand/useHomeStore';
import useModalGeolocationStore from '../../../../zustand/useModalGeolocationStore';
import EventProvider from '../../../../utils/EventProvider';

export default function HomeTooltipGeolocation() {
  const { checkIfFirstLaunch, firstTimeAppOpen } = useHomeStore(['firstTimeAppOpen', 'checkIfFirstLaunch']);
  const { modalGeolocationController } = useModalGeolocationStore(['modalGeolocationController']);

  const onPressModalActionButton = useCallback(() => {
    checkIfFirstLaunch(false);
    modalGeolocationController(true);
    EventProvider.logEvent('show_offers_tooltip_click');
  }, []);

  return (
    <Modal animationType="fade" transparent visible={firstTimeAppOpen}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            De onde você acessa a
            <Text style={styles.modalTitleBold}> Reserva</Text>
            ?
          </Text>
          <Text style={styles.modalParagraph}>
            Conta pra gente!
            Assim podemos personalizar sua experiência e oferecer ofertas exclusivas!
          </Text>

          <TouchableOpacity
            onPress={onPressModalActionButton}
            style={styles.modalActionButton}
          >
            <Text style={styles.modalActionButtonText}>
              Quero ver ofertas exclusivas
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
