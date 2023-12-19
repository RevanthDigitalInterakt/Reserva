import React, { useCallback } from 'react';
import {
  View, Text, TouchableOpacity, Linking,
} from 'react-native';
import { Divider } from '../Divider/Divider';
import styles from './styles';

interface IFormLink {
  link: string;
}

function FormLink({ link }: IFormLink) {
  const handleButtonPress = useCallback(() => {
    Linking.openURL(link);
  }, [link]);
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
