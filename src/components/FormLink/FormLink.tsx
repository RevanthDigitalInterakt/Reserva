import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Linking,
} from 'react-native';
import { FONTS } from '../../base/styles';

function FormLink() {
  const handleButtonPress = () => {
    const externalLink = 'https://google.com';
    Linking.openURL(externalLink);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>O que você tá achando do app?</Text>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>CONTA AÍ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 16,
  },
  button: {
    width: 94,
    height: 28,
    backgroundColor: 'white',
    borderRadius: 16,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 16,
  },
});

export default FormLink;
