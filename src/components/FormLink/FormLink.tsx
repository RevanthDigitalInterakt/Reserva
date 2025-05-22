import React, { useCallback, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, Linking,
} from 'react-native';
import { Divider } from '../Divider/Divider';
import styles from './styles';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import EventProvider from '../../utils/EventProvider';

function FormLink() {
  const { getString } = useRemoteConfig();

  const showForm = useMemo(() => getString('show_user_feedback_form'), []);

  const handleButtonPress = useCallback(() => {
    EventProvider.logEvent(showForm === 'menu' ? 'click_form_menu' : 'click_form_profile', {});
    Linking.openURL(showForm === 'menu' ? 'https://forms.gle/bfA1UXHteCs36HjRA' : 'https://forms.gle/rpPP8aStXcGA63UdA');
  }, [showForm]);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>O que você tá achando do app?</Text>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>CONTA AÍ</Text>
        </TouchableOpacity>
      </View>
      <Divider variant="fullWidth" marginBottom="nano" marginTop="nano" marginX="micro" />

    </>
  );
}

export default FormLink;
