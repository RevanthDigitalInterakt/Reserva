import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './HomeModalGeolocation.styles';
import useModalGeolocationStore from '../../../../zustand/useModalGeolocationStore';
import IconClose from '../../../../../assets/icons/IconClose';
import IconGeolocation from '../../../../../assets/icons/IconGeolocation';
import { Picker } from '../../../../components/Picker/Picker';
import { useHomeStore } from '../../../../zustand/useHomeStore';
import useAsyncStorageProvider from '../../../../hooks/useAsyncStorageProvider';
import { COLORS } from '../../../../base/styles';
import EventProvider from '../../../../utils/EventProvider';

export default function HomeModalGeolocation() {
  const { showModalGeolocation, modalGeolocationController } = useModalGeolocationStore(['showModalGeolocation', 'modalGeolocationController']);
  const { onSelectStateGeolocation, selectedStateGeolocation } = useHomeStore(['onSelectStateGeolocation', 'selectedStateGeolocation']);
  const { setItem } = useAsyncStorageProvider();

  const [visiblePicker, setVisiblePicker] = useState(false);
  const [selectedState, setSelectedState] = useState('');

  const statesAcronym = [
    {
      text: 'AC',
      subText: '',
    },
    {
      text: 'AL',
      subText: '',
    },
    {
      text: 'AP',
      subText: '',
    },
    {
      text: 'AM',
      subText: '',
    },
    {
      text: 'BA',
      subText: '',
    },
    {
      text: 'CE',
      subText: '',
    },
    {
      text: 'DF',
      subText: '',
    },
    {
      text: 'ES',
      subText: '',
    },
    {
      text: 'GO',
      subText: '',
    },
    {
      text: 'MA',
      subText: '',
    },
    {
      text: 'MT',
      subText: '',
    },
    {
      text: 'MS',
      subText: '',
    },
    {
      text: 'MG',
      subText: '',
    },
    {
      text: 'PA',
      subText: '',
    },
    {
      text: 'PB',
      subText: '',
    },
    {
      text: 'PR',
      subText: '',
    },
    {
      text: 'PE',
      subText: '',
    },
    {
      text: 'PI',
      subText: '',
    },
    {
      text: 'RJ',
      subText: '',
    },
    {
      text: 'RN',
      subText: '',
    },
    {
      text: 'RS',
      subText: '',
    },
    {
      text: 'RO',
      subText: '',
    },
    {
      text: 'RR',
      subText: '',
    },
    {
      text: 'SC',
      subText: '',
    },
    {
      text: 'SP',
      subText: '',
    },
    {
      text: 'SE',
      subText: '',
    },
    {
      text: 'TO',
      subText: '',
    },
  ];

  const saveUserGeolocation = useCallback(async () => {
    await setItem('User:Geolocation', selectedState);
    onSelectStateGeolocation(selectedState);
    modalGeolocationController(false);
  }, [selectedState]);

  const onCloseModal = useCallback(() => {
    modalGeolocationController(false);
    EventProvider.logEvent('modal_geolocation_close');
  }, []);

  const onSelectGeolocation = useCallback((geoState: string) => {
    setSelectedState(geoState);
    EventProvider.logEvent('banner_location', { banner_location: geoState });
  }, []);

  useEffect(() => {
    setSelectedState(selectedStateGeolocation);
  }, [selectedStateGeolocation]);

  return (
    <Modal animationType="fade" transparent visible={showModalGeolocation}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onCloseModal}>
              <IconClose />
            </TouchableOpacity>
          </View>
          <IconGeolocation />
          <Text style={styles.modalTitle}>
            Qual a sua localização?
          </Text>
          <Text style={styles.modalParagraph}>
            Compartilhe com a gente de onde você acessa a
            Reserva e tenha acesso a promoções exclusivas,
            fretes mais baratos e entregas mais rápidas
            quando disponível na sua região!
          </Text>

          <View style={styles.modalPickerContainer}>
            <TouchableOpacity onPress={() => setVisiblePicker(true)}>
              <Text style={styles.modalPickerContent}>
                {selectedState}
              </Text>
            </TouchableOpacity>
          </View>
          <Picker
            isVisible={visiblePicker}
            swipeDirection={false}
            onBackDropPress={() => {}}
            onAndroidBackButtonPress={() => { }}
            onClose={() => setVisiblePicker(false)}
            onSelect={(selected) => onSelectGeolocation(selected.text)}
            title="Selecione o Estado"
            items={statesAcronym}
          />
          <TouchableOpacity
            disabled={selectedState === 'Clique aqui para selecionar seu estado...'}
            onPress={saveUserGeolocation}
            style={[styles.modalActionButton,
              { backgroundColor: selectedState === 'Clique aqui para selecionar seu estado...' ? COLORS.LIGHT_GRAY : COLORS.BLACK },
            ]}
          >
            <Text style={styles.modalActionButtonText}>
              Salvar minha localização
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
